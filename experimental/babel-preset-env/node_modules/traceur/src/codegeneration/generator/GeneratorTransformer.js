// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {CPSTransformer} from './CPSTransformer.js';
import {
  BINARY_EXPRESSION,
  YIELD_EXPRESSION
} from '../../syntax/trees/ParseTreeType.js';
import {
  BinaryExpression,
  ExpressionStatement
} from '../../syntax/trees/ParseTrees.js'
import {FindInFunctionScope} from '../FindInFunctionScope.js'
import {ReturnState} from './ReturnState.js';
import ImportRuntimeTrait from '../ImportRuntimeTrait.js';
import {YieldState} from './YieldState.js';
import {
  createIdentifierExpression as id,
  createMemberExpression,
  createUndefinedExpression,
} from '../ParseTreeFactory.js';
import {
  parseExpression,
  parseStatement,
  parseStatements
} from '../PlaceholderParser.js';

/**
 * @param {ParseTree} tree Expression tree
 * @return {boolean}
 */
function isYieldAssign(tree) {
  return tree.type === BINARY_EXPRESSION &&
      tree.operator.isAssignmentOperator() &&
      tree.right.type === YIELD_EXPRESSION &&
      tree.left.isLeftHandSideExpression();
}

class YieldFinder extends FindInFunctionScope {
  visitYieldExpression(tree) {
    this.found = true;
  }
}

function scopeContainsYield(tree) {
  let finder = new YieldFinder();
  finder.visitAny(tree);
  return finder.found;
}

/**
 * Desugars generator function bodies. Generator function bodies contain
 * 'yield' statements.
 *
 * At the top level the state machine is translated into this source code:
 *
 * {
 *   machine variables
 *   return $traceurRuntime.createGeneratorInstance(machineFunction);
 * }
 */
export class GeneratorTransformer extends ImportRuntimeTrait(CPSTransformer) {

  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator, reporter, options);
    this.shouldAppendThrowCloseState_ = true;
  }

  expressionNeedsStateMachine(tree) {
    if (tree === null)
      return false;
    return scopeContainsYield(tree);
  }


  /**
   * Simple form yield expressions (direct children of an ExpressionStatement)
   * are translated into a state machine with a single state.
   * @param {YieldExpression} tree
   * @return {ParseTree}
   * @private
   */
  transformYieldExpression_(tree) {
    let expression, machine;
    if (this.expressionNeedsStateMachine(tree.expression)) {
      ({expression, machine} = this.expressionToStateMachine(tree.expression));
    } else {
      expression = this.transformAny(tree.expression);
    }

    if (tree.isYieldFor)
      return this.transformYieldForExpression_(expression, machine);

    let startState = this.allocateState();
    let fallThroughState = this.allocateState();
    let yieldMachine = this.stateToStateMachine_(
        new YieldState(startState, fallThroughState, expression),
        fallThroughState);

    if (machine)
      yieldMachine = machine.append(yieldMachine);

    // The yield expression we generated for the yield-for expression should not
    // be followed by the ThrowCloseState since the inner iterator need to
    // handle the throw case.
    if (this.shouldAppendThrowCloseState_)
      yieldMachine = yieldMachine.append(this.createThrowCloseState_());

    return yieldMachine;
  }

  transformYieldForExpression_(expression, machine = undefined) {
    let gName = this.getTempIdentifier();
    this.addMachineVariable(gName);
    let g = id(gName);

    let nextName = this.getTempIdentifier();
    this.addMachineVariable(nextName);
    let next = id(nextName);

    // http://wiki.ecmascript.org/doku.php?id=harmony:generators
    // Updated on es-discuss
    //
    // The expression yield* <<expr>> is equivalent to:
    //
    // let (g = EXPR) {
    //   let received = void 0, send = true;
    //   for (;;) {
    //     let next = send ? g.next(received) : g.throw(received);
    //     if (next.done)
    //       break;
    //     try {
    //       received = yield next.value;  // ***
    //       send = true;
    //     } catch (e) {
    //       received = e;
    //       send = false;
    //     }
    //   }
    //   next.value;
    // }

    let statements = parseStatements `
        ${g} = $ctx.wrapYieldStar(${expression}[Symbol.iterator]());
        // received = void 0;
        $ctx.sent = void 0;
        // send = true; // roughly equivalent
        $ctx.action = 'next';

        for (;;) {
          ${next} = ${g}[$ctx.action]($ctx.sentIgnoreThrow);
          if (${next}.done) {
            $ctx.sent = ${next}.value;
            break;
          }
          yield ${next}.value;
        }`;

    // The yield above should not be treated the same way as a normal yield.
    // See comment in transformYieldExpression_.
    let shouldAppendThrowCloseState = this.shouldAppendThrowCloseState_;
    this.shouldAppendThrowCloseState_ = false;
    statements = this.transformList(statements);
    let yieldMachine = this.transformStatementList_(statements);
    this.shouldAppendThrowCloseState_ = shouldAppendThrowCloseState;

    if (machine)
      yieldMachine = machine.append(yieldMachine);

    // TODO(arv): Another option is to build up the statemachine for this here
    // instead of builing the code and transforming the code into a state
    // machine.

    return yieldMachine;
  }

  /**
   * @param {YieldExpression} tree
   * @return {ParseTree}
   */
  transformYieldExpression(tree) {
    this.reporter.reportError(tree.location,
        'Only \'a = yield b\' and \'var a = yield b\' currently supported.');
    return tree;
  }

  /**
   * @param {BinaryExpression} tree
   */
  transformYieldAssign_(tree) {
    let shouldAppendThrowCloseState = this.shouldAppendThrowCloseState_;
    this.shouldAppendThrowCloseState_ = false;
    let machine = this.transformYieldExpression_(tree.right);
    let left = this.transformAny(tree.left);
    let sentExpression = tree.right.isYieldFor ?
        parseExpression `$ctx.sentIgnoreThrow` :
        parseExpression `$ctx.sent`;
    let statement = new ExpressionStatement(
        tree.location,
        new BinaryExpression(
            tree.location,
            left,
            tree.operator,
            sentExpression));
    let assignMachine = this.statementToStateMachine_(statement);
    this.shouldAppendThrowCloseState_ = shouldAppendThrowCloseState;
    return machine.append(assignMachine);
  }

  createThrowCloseState_() {
    return this.statementToStateMachine_(parseStatement `$ctx.maybeThrow()`);
  }

  /**
   * @param {ExpressionStatement} tree
   * @return {ParseTree}
   */
  transformExpressionStatement(tree) {
    let expression = tree.expression;
    if (expression.type === YIELD_EXPRESSION)
      return this.transformYieldExpression_(expression);

    if (isYieldAssign(expression))
      return this.transformYieldAssign_(expression);

    if (this.expressionNeedsStateMachine(expression)) {
       return this.expressionToStateMachine(expression).machine;
    }

    return super.transformExpressionStatement(tree);
  }

  /**
   * @param {AwaitStatement} tree
   * @return {ParseTree}
   */
  transformAwaitStatement(tree) {
    // TODO(arv): This should be handled in the parser... change to throw.
    this.reporter.reportError(tree.location,
        'Generator function may not have an await statement.');
    return tree;
  }

  /**
   * @param {ReturnStatement} tree
   * @return {ParseTree}
   */
  transformReturnStatement(tree) {
    let expression, machine;

    if (this.expressionNeedsStateMachine(tree.expression))
      ({expression, machine} = this.expressionToStateMachine(tree.expression));
    else
      expression = tree.expression;

    let startState = this.allocateState();
    let fallThroughState = this.allocateState();
    let returnMachine = this.stateToStateMachine_(
        new ReturnState(
            startState,
            fallThroughState,
            this.transformAny(expression)),
        fallThroughState);

    if (machine)
      return machine.append(returnMachine);
    return returnMachine
  }

  /**
   * Transform a generator function body - removing yield statements.
   * The transformation is in two stages. First the statements are converted
   * into a single state machine by merging state machines via a bottom up
   * traversal.
   *
   * Then the final state machine is converted into the following code:
   *
   * {
   *   machine variables
   *   return $traceurRuntime.createGeneratorInstance(machineFunction);
   * }
   *
   * @param {FunctionBody} tree
   * @param {IdentifierExpression} name
   * @return {FunctionBody}
   */
  transformGeneratorBody(tree, name) {
    let createGeneratorInstance =
        this.getRuntimeExpression('createGeneratorInstance');
    return this.transformCpsFunctionBody(tree, createGeneratorInstance, name);
  }

  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   * @param {Block} body
   * @param {IdentifierExpression} name
   * @return {Block}
   */
  static transformGeneratorBody(identifierGenerator, reporter, options, body,
                                name) {
    return new GeneratorTransformer(identifierGenerator, reporter, options).
        transformGeneratorBody(body, name);
  }
};
