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

import {AwaitState} from './AwaitState.js';
import {
  BinaryExpression,
  ExpressionStatement
} from '../../syntax/trees/ParseTrees.js';
import {CPSTransformer} from './CPSTransformer.js';
import {EndState} from './EndState.js';
import {FallThroughState} from './FallThroughState.js';
import ImportRuntimeTrait from '../ImportRuntimeTrait.js';
import {
  AWAIT_EXPRESSION,
  BINARY_EXPRESSION,
  STATE_MACHINE
} from '../../syntax/trees/ParseTreeType.js';
import {
  parseExpression,
  parseStatement,
  parseStatements
} from '../PlaceholderParser.js';
import {StateMachine} from '../../syntax/trees/StateMachine.js';
import {FindInFunctionScope} from '../FindInFunctionScope.js'
import {createUndefinedExpression} from '../ParseTreeFactory.js';

/**
 * @param {ParseTree} tree Expression tree
 * @return {boolean}
 */
function isAwaitAssign(tree) {
  return tree.type === BINARY_EXPRESSION &&
      tree.operator.isAssignmentOperator() &&
      tree.right.type === AWAIT_EXPRESSION &&
      tree.left.isLeftHandSideExpression();
}

class AwaitFinder extends FindInFunctionScope {
  visitAwaitExpression(tree) {
    this.found = true;
  }
}

function scopeContainsAwait(tree) {
  let visitor = new AwaitFinder();
  visitor.visitAny(tree);
  return visitor.found;
}

/**
 * Desugars async function bodies. Async function bodies contain 'async' statements.
 *
 * At the top level the state machine is translated into this source code:
 *
 * {
 *   machine variables
 *   return $traceurRuntime.asyncWrap(machineFunction);
 * }
 */
export class AsyncTransformer extends ImportRuntimeTrait(CPSTransformer) {

  expressionNeedsStateMachine(tree) {
    if (tree === null)
      return false;
    return scopeContainsAwait(tree);
  }

  transformExpressionStatement(tree) {
    let expression = tree.expression;
    if (expression.type === AWAIT_EXPRESSION)
      return this.transformAwaitExpression_(expression);

    if (isAwaitAssign(expression))
      return this.transformAwaitAssign_(expression);

    if (this.expressionNeedsStateMachine(expression)) {
       return this.expressionToStateMachine(expression).machine;
    }

    return super.transformExpressionStatement(tree);
  }

  transformAwaitExpression(tree) {
    throw new Error('Internal error');
  }

  transformAwaitExpression_(tree) {
    return this.transformAwait_(tree, tree.expression, null, null);
  }

  transformAwaitAssign_(tree) {
    return this.transformAwait_(tree, tree.right.expression, tree.left,
                                tree.operator);
  }

  transformAwait_(tree, inExpression, left, operator) {
    let expression, machine;
    if (this.expressionNeedsStateMachine(inExpression)) {
      ({expression, machine} = this.expressionToStateMachine(inExpression));
    } else {
      expression = this.transformAny(inExpression);
    }

    let createTaskState = this.allocateState();
    let fallThroughState = this.allocateState();
    let callbackState = left ? this.allocateState() : fallThroughState;

    let states = [];
    //  case createTaskState:
    states.push(new AwaitState(createTaskState, callbackState, expression));

    //  case callbackState:
    //    identifier = $ctx.value;
    //    $ctx.state = fallThroughState;
    //    break;
    if (left) {
      let statement = new ExpressionStatement(
          tree.location,
          new BinaryExpression(
              tree.location,
              left,
              operator,
              parseExpression `$ctx.value`));
      states.push(new FallThroughState(callbackState, fallThroughState,
                                       [statement]));
    }

    let awaitMachine =
        new StateMachine(createTaskState, fallThroughState, states, []);

    if (machine) {
      awaitMachine = machine.append(awaitMachine);
    }

    return awaitMachine;
  }

  /**
   * @param {Finally} tree
   * @return {ParseTree}
   */
  transformFinally(tree) {
    let result = super.transformFinally(tree);
    if (result.block.type !== STATE_MACHINE) {
      return result;
    }
    // TODO: is this a reasonable restriction?
    this.reporter.reportError(tree.location,
        'await not permitted within a finally block.');
    return result;
  }

  /**
   * @param {ReturnStatement} tree
   * @return {ParseTree}
   */
  transformReturnStatement(tree) {
    let expression, machine;
    if (this.expressionNeedsStateMachine(tree.expression)) {
      ({expression, machine} = this.expressionToStateMachine(tree.expression));
    } else {
      expression = tree.expression || createUndefinedExpression();
    }

    let startState = this.allocateState();
    let endState = this.allocateState();
    let completeState = new FallThroughState(startState, endState,
        parseStatements `$ctx.returnValue = ${expression}`);
    let end = new EndState(endState);
    let returnMachine = new StateMachine(
        startState,
        // TODO: this should not be required, but removing requires making consumers resilient
        // TODO: to INVALID fallThroughState
        this.allocateState(),
        [completeState, end],
        []);

    if (machine)
      returnMachine = machine.append(returnMachine);
    return returnMachine;
  }

  /**
   * @param {ParseTree} tree
   * @return {ParseTree}
   */
  createCompleteTask_(result) {
    return parseStatement `$ctx.resolve(${result})`;
  }

  /**
   * Transform an async function body - removing async statements.
   * The transformation is in two stages. First the statements are converted into a single
   * state machine by merging state machines via a bottom up traversal.
   *
   * Then the final state machine is converted into the following code:
   *
   * {
   *   machine variables
   *   return $traceurRuntime.asyncWrap(machineFunction);
   * }
   * @param {FunctionBody} tree
   * @return {FunctionBody}
   */
  transformAsyncBody(tree) {
    let asyncWrap = this.getRuntimeExpression('asyncWrap');
    return this.transformCpsFunctionBody(tree, asyncWrap);
  }

  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   * @param {Block} body
   * @return {Block}
   */
  static transformAsyncBody(identifierGenerator, reporter, options, body) {
    return new AsyncTransformer(identifierGenerator, reporter, options).
        transformAsyncBody(body);
  }
};
