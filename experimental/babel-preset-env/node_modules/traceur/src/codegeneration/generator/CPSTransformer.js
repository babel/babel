// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {AlphaRenamer} from '../AlphaRenamer.js';
import {BreakContinueTransformer} from './BreakContinueTransformer.js';
import {
  BLOCK,
  CASE_CLAUSE,
  CONDITIONAL_EXPRESSION,
  EXPRESSION_STATEMENT,
  PAREN_EXPRESSION,
  STATE_MACHINE
} from '../../syntax/trees/ParseTreeType.js';
import {
  AnonBlock,
  Block,
  CaseClause,
  IfStatement,
  SwitchStatement
} from '../../syntax/trees/ParseTrees.js';
import {CatchState} from './CatchState.js';
import {ConditionalState} from './ConditionalState.js';
import {ExplodeExpressionTransformer} from '../ExplodeExpressionTransformer.js';
import {FallThroughState} from './FallThroughState.js';
import {FinallyFallThroughState} from './FinallyFallThroughState.js';
import {FinallyState} from './FinallyState.js';
import {FindInFunctionScope} from '../FindInFunctionScope.js';
import {ParseTreeTransformer} from '../ParseTreeTransformer.js';
import {StringMap} from '../../util/StringMap.js';
import {TempVarTransformer} from '../TempVarTransformer.js';
import {assert} from '../../util/assert.js';
import {
  parseExpression,
  parseStatement,
  parseStatements
} from '../PlaceholderParser.js';
import {State} from './State.js';
import {StateAllocator} from './StateAllocator.js';
import {StateMachine} from '../../syntax/trees/StateMachine.js';
import {
  SwitchClause,
  SwitchState
} from './SwitchState.js';
import {TryState} from './TryState.js';
import {
  createAssignStateStatement,
  createBreakStatement,
  createCaseClause,
  createDefaultClause,
  createExpressionStatement,
  createFunctionBody,
  createIdentifierExpression as id,
  createMemberExpression,
  createNumberLiteral,
  createSwitchStatement,
} from '../ParseTreeFactory.js';
import HoistVariablesTransformer from '../HoistVariablesTransformer.js';

class LabelState {
  constructor(name, continueState, fallThroughState) {
    this.name = name;
    this.continueState = continueState;
    this.fallThroughState = fallThroughState;
  }
}

class NeedsStateMachine extends FindInFunctionScope {
  visitBreakStatement(tree) {
    this.found = true;
  }
  visitContinueStatement(tree) {
    this.found = true;
  }
  visitStateMachine(tree) {
    this.found = true;
  }
  visitYieldExpression(tee) {
    this.found = true;
  }
}

function needsStateMachine(tree) {
  let visitor = new NeedsStateMachine();
  visitor.visitAny(tree);
  return visitor.found;
}

class HoistVariables extends HoistVariablesTransformer {
  constructor() {
    super(true);  // Hoist functions.
  }

  /**
   * Override to not inject the hoisted variables. We will manually inject them
   * later.
   */
  prependVariables(statements) {
    return statements;
  }

  prependFunctions(statements) {
    return statements;
  }
}

/**
 * Performs a CPS transformation on a method body.
 *
 * The conversion transformation proceeds bottom up. At the bottom Yield
 * statements are converted to a state machine, then when a transformed child
 * statement is a state machine, the parent statement is converted into a state
 * machine.
 *
 * At the top level the state machine is translated into this method:
 *
 *      function() {
 *       while (true) {
 *         try {
 *           switch ($ctx.state) {
 *           ... converted states ...
 *           case rethrow:
 *             throw $ctx.storedException;
 *           }
 *         } catch ($caughtException) {
 *           $ctx.storedException = $caughtException;
 *           switch ($ctx.state) {
 *           case enclosing_finally:
 *             $ctx.state = finally.startState;
 *             $fallThrough = rethrow;
 *             break;
 *           case enclosing_catch:
 *             $ctx.state = catch.startState;
 *             break;
 *           case enclosing_catch_around_finally:
 *             $ctx.state = finally.startState;
 *             $fallThrough = catch.startState;
 *             break;
 *           default:
 *             throw $ctx.storedException;
 *           }
 *         }
 *       }
 *     }
 *
 * Each state in a state machine is identified by an integer which is unique
 * across the entire function body. The state machine merge process may need to
 * perform state id substitution on states of the merged state machines.
 */
export class CPSTransformer extends TempVarTransformer {
  /**
   * @param {ErrorReporter} reporter
   */
  constructor(identifierGenerator, reporter, options) {
    super(identifierGenerator,reporter, options);
    this.stateAllocator_ = new StateAllocator();

    // This is currently a Map<string, LabelState> where the key is the
    // label.name. We should probably change this to Set<LabelState> but that
    // requires us depending on a real Set which might be too slow as long as
    // we depend on the Set polyfill. Consider refactoring this once the
    // polyfill has been phased out.
    this.labelSet_ = new StringMap();

    this.currentLabel_ = null;
    this.hoistVariablesTransformer_ = new HoistVariables();
  }

  expressionNeedsStateMachine(tree) {
    // TODO(arv): Implement this for the async transformer.
    return false;
  }

  /** @return {number} */
  allocateState() {
    return this.stateAllocator_.allocateState();
  }

  /**
   * If a block contains a statement which has been transformed into a state
   * machine, then all statements are forcibly transformed into a state
   * machine, then the machines are knitted together.
   * @param {Block} tree
   * @return {ParseTree}
   */
  transformBlock(tree) {
    let labels = this.getLabels_();
    let label = this.clearCurrentLabel_();

    // NOTE: tree may contain state machines already ...
    let transformedTree = super.transformBlock(tree);
    let machine = this.transformStatementList_(transformedTree.statements);

    if (machine === null)
      return transformedTree;

    if (label) {
      let states = [];
      for (let i = 0; i < machine.states.length; i++) {
        let state = machine.states[i];
        states.push(state.transformBreakOrContinue(labels));
      }
      machine = new StateMachine(machine.startState, machine.fallThroughState,
                                 states, machine.exceptionBlocks);
    }

    return machine;
  }

  transformFunctionBody(tree) {
    this.pushTempScope();

    // NOTE: tree may contain state machines already ...
    let oldLabels = this.clearLabels_();

    let transformedTree = super.transformFunctionBody(tree);
    let machine = this.transformStatementList_(transformedTree.statements);

    this.restoreLabels_(oldLabels);

    this.popTempScope();
    return machine === null ? transformedTree : machine;
  }

  /**
   * @param {Array.<ParseTree>} trees This may already contain StateMachine
   *     trees.
   * @return {StateMachine}
   */
  transformStatementList_(trees) {
    // If we need one or more machines, we want to aggregate the machines andany
    // free statements into one state machine.

    let groups = [];
    let newMachine;
    for (let i = 0; i < trees.length; i++) {
      if (trees[i].type === STATE_MACHINE) {
        groups.push(trees[i]);
      } else if (needsStateMachine(trees[i])) {
        newMachine = this.ensureTransformed_(trees[i]);
        groups.push(newMachine);
      } else {
        // Accumulate trees.
        let last = groups[groups.length - 1];
        if (!(last instanceof Array))
          groups.push(last = []);
        last.push(trees[i])
      }
    }

    if (groups.length === 1 && groups[0] instanceof Array)
      return null;

    let machine = null;

    for (let i = 0; i < groups.length; i++) {
      if (groups[i] instanceof Array) {
        newMachine = this.statementsToStateMachine_(groups[i]);
      } else {
        newMachine = groups[i];
      }
      if (i === 0)
        machine = newMachine;
      else
        machine = machine.append(newMachine);
    }

    return machine;
  }

  /**
   * @param {Array.<ParseTree>|SwitchStatement} statements
   * @return {boolean}
   */
  needsStateMachine_(statements) {
    if (statements instanceof Array) {
      for (let i = 0; i < statements.length; i++) {
        if (needsStateMachine(statements[i]))
          return true;
      }
      return false;
    }

    assert(statements instanceof SwitchStatement);
    return needsStateMachine(statements);
  }

  /**
   * @param {CaseClause} tree
   * @return {ParseTree}
   */
  transformCaseClause(tree) {
    let result = super.transformCaseClause(tree);
    let machine = this.transformStatementList_(result.statements);
    return machine === null ?
        result :
        new CaseClause(null, result.expression, [machine]);
  }

  /**
   * @param {DoWhileStatement} tree
   * @return {ParseTree}
   */
  transformDoWhileStatement(tree) {
    let labels = this.getLabels_();
    let label = this.clearCurrentLabel_();

    let machine, condition, body;
    if (this.expressionNeedsStateMachine(tree.condition)) {
      ({machine, expression: condition} =
          this.expressionToStateMachine(tree.condition));
      body = this.transformAny(tree.body);
    } else {
      let result = super.transformDoWhileStatement(tree);
      ({condition, body} = result);
      if (body.type !== STATE_MACHINE)
        return result;
    }

    // a yield within a do/while loop
    let loopBodyMachine = this.ensureTransformed_(body);
    let startState = loopBodyMachine.startState;
    let conditionState = loopBodyMachine.fallThroughState;
    let fallThroughState = this.allocateState();

    let states = [];

    this.addLoopBodyStates_(loopBodyMachine, conditionState, fallThroughState,
                            labels, states);

    if (machine) {
      machine = machine.replaceStartState(conditionState);
      conditionState = machine.fallThroughState;
      states.push(...machine.states);
    }

    states.push(
        new ConditionalState(
            conditionState,
            startState,
            fallThroughState,
            condition));

    machine = new StateMachine(startState, fallThroughState, states,
                               loopBodyMachine.exceptionBlocks);

    if (label)
      machine = machine.replaceStateId(conditionState, label.continueState);

    return machine;
  }

  /**
   * @param {StateMachine} loopBodyMachine
   * @param {number} continueState
   * @param {number} breakState
   * @param {StringMap} labels
   * @param {Array.<State>} states
   */
  addLoopBodyStates_(loopBodyMachine, continueState, breakState,
                     labels, states) {
    for (let i = 0; i < loopBodyMachine.states.length; i++) {
      let state = loopBodyMachine.states[i];
      states.push(
          state.transformBreakOrContinue(labels, breakState, continueState));
    }
  }

  /**
   * @param {ForStatement} tree
   * @return {ParseTree}
   */
  transformForStatement(tree) {
    let labels = this.getLabels_();
    let label = this.clearCurrentLabel_();
    let tmp;

    let initializer = null, initializerMachine;
    if (tree.initializer) {
      if (this.expressionNeedsStateMachine(tree.initializer)) {
        tmp = this.expressionToStateMachine(tree.initializer);
        initializer = tmp.expression;
        initializerMachine = tmp.machine;
      } else {
        initializer = this.transformAny(tree.initializer);
      }
    }

    let condition = null, conditionMachine;
    if (tree.condition) {
      if (this.expressionNeedsStateMachine(tree.condition)) {
        tmp = this.expressionToStateMachine(tree.condition);
        condition = tmp.expression;
        conditionMachine = tmp.machine;
      } else {
        condition = this.transformAny(tree.condition);
      }
    }

    let increment = null, incrementMachine;
    if (tree.increment) {
      if (this.expressionNeedsStateMachine(tree.increment)) {
        tmp = this.expressionToStateMachine(tree.increment);
        increment = tmp.expression;
        incrementMachine = tmp.machine;
      } else {
        increment = this.transformAny(tree.increment);
      }
    }

    let body = this.transformAny(tree.body);

    if (initializer === tree.initializer && condition === tree.condition &&
        increment === tree.increment && body === tree.body) {
      return tree;
    }

    if (!initializerMachine && !conditionMachine && !incrementMachine &&
        body.type !== STATE_MACHINE) {
      return new ForStatement(tree.location, initializer, condition,
          increment, body);
    }

    // a yield within the body of a 'for' statement
    let loopBodyMachine = this.ensureTransformed_(body);
    let bodyFallThroughId = loopBodyMachine.fallThroughState;
    let fallThroughId = this.allocateState();

    let startId;
    let initializerStartId =
        initializer ? this.allocateState() : State.INVALID_STATE;
    let conditionStartId =
        increment ? this.allocateState() : bodyFallThroughId;
    let loopStartId = loopBodyMachine.startState;
    let incrementStartId = bodyFallThroughId;

    let states = [];

    if (initializer) {
      startId = initializerStartId;
      let initialiserFallThroughId;
      if (condition)
        initialiserFallThroughId = conditionStartId;
      else
        initialiserFallThroughId = loopStartId;

     let tmpId = initializerStartId;

      if (initializerMachine) {
        initializerMachine =
            initializerMachine.replaceStartState(initializerStartId);
        tmpId = initializerMachine.fallThroughState;
        states.push(...initializerMachine.states);
      }

      states.push(
          new FallThroughState(
              tmpId,
              initialiserFallThroughId,
              [createExpressionStatement(initializer)]));
    }

    if (condition) {
      if (!initializer)
        startId = conditionStartId;

      let tmpId = conditionStartId;

      if (conditionMachine) {
        conditionMachine =
            conditionMachine.replaceStartState(conditionStartId);
        tmpId = conditionMachine.fallThroughState;
        states.push(...conditionMachine.states);
      }

      states.push(
        new ConditionalState(
              tmpId,
              loopStartId,
              fallThroughId,
              condition));
    }

    if (increment) {
      let incrementFallThroughId;
      if (condition)
        incrementFallThroughId = conditionStartId;
      else
        incrementFallThroughId = loopStartId;

      let tmpId = incrementStartId;

      if (incrementMachine) {
        incrementMachine =
            incrementMachine.replaceStartState(incrementStartId);
        tmpId = incrementMachine.fallThroughState;
        states.push(...incrementMachine.states);
      }

      states.push(
          new FallThroughState(
              tmpId,
              incrementFallThroughId,
              [createExpressionStatement(increment)]));
    }

    // loop body
    if (!initializer && !condition)
      startId = loopStartId;

    let continueId;
    if (increment)
      continueId = incrementStartId;
    else if (condition)
      continueId = conditionStartId;
    else
      continueId = loopStartId;

    if (!increment && !condition) {
      // If we had either increment or condition, that would take the loop
      // body's fall through ID as its ID. If we have neither we need to change
      // the loop body's fall through ID to loop back to the loop body's start
      // ID.
      loopBodyMachine =
          loopBodyMachine.replaceFallThroughState(loopBodyMachine.startState);
    }

    this.addLoopBodyStates_(loopBodyMachine, continueId, fallThroughId,
                            labels, states);

    let machine = new StateMachine(startId, fallThroughId, states,
                                   loopBodyMachine.exceptionBlocks);

    if (label)
      machine = machine.replaceStateId(continueId, label.continueState);

    return machine;
  }

  /**
   * @param {ForInStatement} tree
   * @return {ParseTree}
   */
  transformForInStatement(tree) {
    // The only for in statement left is from the ForInTransformPass. Just pass
    // it through.
    return tree;
  }

  /**
   * @param {ForOfStatement} tree
   * @return {ParseTree}
   */
  transformForOfStatement(tree) {
    throw new Error(
        'for of statements should be transformed before this pass');
  }

  /**
   * @param {IfStatement} tree
   * @return {ParseTree}
   */
  transformIfStatement(tree) {
    let machine, condition, ifClause, elseClause;

    if (this.expressionNeedsStateMachine(tree.condition)) {
      ({machine, expression: condition} =
          this.expressionToStateMachine(tree.condition));
      ifClause = this.transformAny(tree.ifClause);
      elseClause = this.transformAny(tree.elseClause);
    } else {
      let result = super.transformIfStatement(tree);
      ({condition, ifClause, elseClause} = result);
      if (ifClause.type !== STATE_MACHINE &&
          (elseClause === null || elseClause.type !== STATE_MACHINE)) {
        return result;
      }
    }

    ifClause = this.ensureTransformed_(ifClause);
    elseClause = this.ensureTransformed_(elseClause);

    let startState = this.allocateState();
    let fallThroughState = ifClause.fallThroughState;
    let ifState = ifClause.startState;
    let elseState =
        elseClause === null ?
            fallThroughState :
            elseClause.startState;

    let states = [];
    let exceptionBlocks = [];

    states.push(
        new ConditionalState(
            startState,
            ifState,
            elseState,
            condition));
    states.push(...ifClause.states);
    exceptionBlocks.push(...ifClause.exceptionBlocks);
    if (elseClause !== null) {
      this.replaceAndAddStates_(
          elseClause.states,
          elseClause.fallThroughState,
          fallThroughState,
          states);
      exceptionBlocks.push(
          ...State.replaceAllStates(elseClause.exceptionBlocks,
                                    elseClause.fallThroughState,
                                    fallThroughState));
    }

    let ifMachine = new StateMachine(startState, fallThroughState, states,
                                     exceptionBlocks);
    if (machine)
      ifMachine = machine.append(ifMachine);
    return ifMachine;
  }

  /**
   * @param {Array.<State>} oldStates
   * @return {Array.<State>} An array with empty states removed.
   */
  removeEmptyStates(oldStates) {
    let emptyStates = [], newStates = [];
    // Remove empty FallThroughState states.
    for (let i = 0; i < oldStates.length; i++) {
      if (oldStates[i] instanceof FallThroughState &&
          oldStates[i].statements.length === 0) {
        emptyStates.push(oldStates[i]);
      } else {
        newStates.push(oldStates[i]);
      }
    }
    // Fix up dangling state transitions.
    for (let i = 0; i < newStates.length; i++) {
      newStates[i] = emptyStates.reduce((state, {id, fallThroughState}) => {
        return state.replaceState(id, fallThroughState);
      }, newStates[i]);
    }
    return newStates;
  }

  /**
   * @param {Array.<State>} oldStates
   * @param {number} oldState
   * @param {number} newState
   * @param {Array.<State>} newStates
   */
  replaceAndAddStates_(oldStates, oldState, newState, newStates) {
    for (let i = 0; i < oldStates.length; i++) {
      newStates.push(oldStates[i].replaceState(oldState, newState));
    }
  }

  /**
   * @param {LabelledStatement} tree
   * @return {ParseTree}
   */
  transformLabelledStatement(tree) {
    // Any statement can be preceeded by a label. Labels have lexical scope so
    // we keep track of the opened labels and their states.

    // We create an object to hold the state of the currrent label. This is then
    // used directly inside the statement if it is a loop and the loop machines
    // state IDs are updated to use the allocated states below.
    let startState = this.allocateState();
    let continueState = this.allocateState();
    let fallThroughState = this.allocateState();

    let label = new LabelState(tree.name.value, continueState, fallThroughState);
    let oldLabels = this.addLabel_(label);
    this.currentLabel_ = label;

    let result = this.transformAny(tree.statement);
    if (result === tree.statement) {
      result = tree;
    } else if (result.type === STATE_MACHINE) {
      result = result.replaceStartState(startState);
      result = result.replaceFallThroughState(fallThroughState);
    }

    this.restoreLabels_(oldLabels);

    return result;
  }

  getLabels_() {
    return this.labelSet_;
  }

  restoreLabels_(oldLabels) {
    this.labelSet_ = oldLabels;
  }

  /**
   * Adds a label to the current label set. Returns the OLD label set.
   * @param {LabelState} label
   * @return {Object}
   */
  addLabel_(label) {
    let oldLabels = this.labelSet_;

    let labelSet = new StringMap();
    this.labelSet_.forEach((k) => labelSet[k] = this.labelSet_[k]);
    labelSet.set(label.name, label);
    this.labelSet_ = labelSet;

    return oldLabels;
  }

  clearLabels_() {
    let result = this.labelSet_;
    this.labelSet_ = new StringMap()
    return result;
  }

  clearCurrentLabel_() {
    let result = this.currentLabel_;
    this.currentLabel_ = null;
    return result;
  }

  /**
   * @param {SwitchStatement} tree
   * @return {ParseTree}
   */
  transformSwitchStatement(tree) {
    let labels = this.getLabels_();

    let expression, machine, caseClauses;
    if (this.expressionNeedsStateMachine(tree.expression)) {
      ({expression, machine} = this.expressionToStateMachine(tree.expression));
      caseClauses = this.transformList(tree.caseClauses);
    } else {
      let result = super.transformSwitchStatement(tree);
      if (!needsStateMachine(result))
        return result;
      ({expression, caseClauses} = result);
    }

    // a yield within a switch statement
    let startState = this.allocateState();
    let fallThroughState = this.allocateState();
    let nextState = fallThroughState;
    let states = [];
    let clauses = [];
    let tryStates = [];
    let hasDefault = false;

    for (let index = caseClauses.length - 1; index >= 0; index--) {
      let clause = caseClauses[index];
      if (clause.type === CASE_CLAUSE) {
        let caseClause = clause;
        nextState =
            this.addSwitchClauseStates_(nextState, fallThroughState, labels,
                                        caseClause.statements, states,
                                        tryStates);
        clauses.push(new SwitchClause(caseClause.expression, nextState));
      } else {
        hasDefault = true;
        let defaultClause = clause;
        nextState =
            this.addSwitchClauseStates_(nextState, fallThroughState, labels,
                                        defaultClause.statements, states,
                                        tryStates);
        clauses.push(new SwitchClause(null, nextState));
      }
    }
    if (!hasDefault) {
      clauses.push(new SwitchClause(null, fallThroughState));
    }
    states.push(
        new SwitchState(startState, expression, clauses.reverse()));

    let switchMachine = new StateMachine(startState, fallThroughState,
        states.reverse(), tryStates);
    if (machine)
      switchMachine = machine.append(switchMachine);
    return switchMachine;
  }

  /**
   * @param {number} nextState
   * @param {number} fallThroughState
   * @param {StringMap} labels
   * @param {Array.<ParseTree>} statements
   * @param {Array.<ParseTree>} states
   * @param {Array.<TryState>} tryStates
   * @return {number}
   */
  addSwitchClauseStates_(nextState, fallThroughState, labels,
                         statements, states, tryStates) {
    let machine = this.ensureTransformedList_(statements);
    for (let i = 0; i < machine.states.length; i++) {
      let state = machine.states[i];
      let transformedState = state.transformBreak(labels, fallThroughState);
      states.push(
          transformedState.replaceState(machine.fallThroughState, nextState));
    }
    tryStates.push(...machine.exceptionBlocks);
    return machine.startState;
  }

  /**
   * @param {TryStatement} tree
   * @return {ParseTree}
   */
  transformTryStatement(tree) {
    let result = super.transformTryStatement(tree);
    let {body, catchBlock, finallyBlock} = result;
    if (body.type !== STATE_MACHINE &&
        (catchBlock === null || catchBlock.catchBody.type !== STATE_MACHINE) &&
        (finallyBlock === null || finallyBlock.block.type !== STATE_MACHINE)) {
      return result;
    }

    // We inject a pushTry at the beginning of the try block and popTry at the
    // end as well as popTry at the beginning of catch and finally.
    //
    // We end up with something like this:
    //
    // try {
    //   pushTry(catchState, finallyState);
    //   ...
    //   popTry()
    // } catch (ex) {
    //   popTry();
    //   ...
    // } finally {
    //   popTry();
    //   ...
    // }
    let outerCatchState = this.allocateState();
    let outerFinallyState = this.allocateState();

    let pushTryState = this.statementToStateMachine_(
        parseStatement `$ctx.pushTry(
            ${catchBlock && outerCatchState},
            ${finallyBlock && outerFinallyState});`);

    let tryMachine = this.ensureTransformed_(body);
    tryMachine = pushTryState.append(tryMachine);

    if (catchBlock !== null) {
      let popTry = this.statementToStateMachine_(
          parseStatement `$ctx.popTry();`);
      tryMachine = tryMachine.append(popTry);

      let exceptionName = catchBlock.binding.identifierToken.value;
      let catchMachine = this.ensureTransformed_(catchBlock.catchBody);
      let catchStart = this.allocateState();

      this.addMachineVariable(exceptionName);

      let states = [
        ...tryMachine.states,
        new FallThroughState(
            catchStart,
            catchMachine.startState,
            parseStatements `
              $ctx.popTry();
              $ctx.maybeUncatchable(); // see RETURN_SENTINEL in runtime
              ${id(exceptionName)} = $ctx.storedException;`)
      ];
      this.replaceAndAddStates_(
          catchMachine.states,
          catchMachine.fallThroughState,
          tryMachine.fallThroughState,
          states);

      tryMachine = new StateMachine(
          tryMachine.startState,
          tryMachine.fallThroughState,
          states,
          [new CatchState(
              exceptionName,
              catchStart,
              tryMachine.fallThroughState,
              tryMachine.getAllStateIDs(),
              tryMachine.exceptionBlocks)]);

      tryMachine = tryMachine.replaceStateId(catchStart, outerCatchState);
    }

    if (finallyBlock !== null) {
      let finallyMachine = this.ensureTransformed_(finallyBlock.block);

      let popTry = this.statementToStateMachine_(
          parseStatement `$ctx.popTry();`);
      finallyMachine = popTry.append(finallyMachine);

      let states = [
        ...tryMachine.states,
        ...finallyMachine.states,
        new FinallyFallThroughState(finallyMachine.fallThroughState)
      ];

      // NOTE: finallyMachine.fallThroughState === FinallyState.fallThroughState
      // is code generated in addFinallyFallThroughDispatches
      tryMachine = new StateMachine(
          tryMachine.startState,
          tryMachine.fallThroughState,
          states,
          [new FinallyState(
              finallyMachine.startState,
              finallyMachine.fallThroughState,
              tryMachine.getAllStateIDs(),
              tryMachine.exceptionBlocks)]);

      tryMachine = tryMachine.replaceStateId(finallyMachine.startState,
                                             outerFinallyState);
    }

    return tryMachine;
  }

  /**
   * @param {WhileStatement} tree
   * @return {ParseTree}
   */
  transformWhileStatement(tree) {
    let labels = this.getLabels_();
    let label = this.clearCurrentLabel_();

    let condition, machine, body;
    if (this.expressionNeedsStateMachine(tree.condition)) {
      ({machine, expression: condition} =
          this.expressionToStateMachine(tree.condition));
      body = this.transformAny(tree.body);
    } else {
      let result = super.transformWhileStatement(tree);
      ({condition,body} = result);
      if (body.type !== STATE_MACHINE)
        return result;
    }


    // a yield within a while loop
    let loopBodyMachine = this.ensureTransformed_(body);
    let startState = loopBodyMachine.fallThroughState;
    let fallThroughState = this.allocateState();

    let states = [];
    let conditionStart = startState;
    if (machine) {
      machine = machine.replaceStartState(startState);
      conditionStart = machine.fallThroughState;

      // An expression cannot generate exceptionBlocks.
      states.push(...machine.states);
    }

    states.push(
        new ConditionalState(
            conditionStart,
            loopBodyMachine.startState,
            fallThroughState,
            condition));

    this.addLoopBodyStates_(loopBodyMachine, startState, fallThroughState,
                            labels, states);

    machine = new StateMachine(startState, fallThroughState, states,
                               loopBodyMachine.exceptionBlocks);

    if (label)
      machine = machine.replaceStateId(startState, label.continueState);

    return machine;
  }

  /**
   * @param {WithStatement} tree
   * @return {ParseTree}
   */
  transformWithStatement(tree) {
    let result = super.transformWithStatement(tree);
    if (result.body.type !== STATE_MACHINE) {
      return result;
    }
    throw new Error(
        'Unreachable - with statement not allowed in strict mode/harmony');
  }

  generateMachineInnerFunction(machine) {
    let enclosingFinallyState = machine.getEnclosingFinallyMap();

    let SwitchStatement = createSwitchStatement(
        createMemberExpression('$ctx', 'state'),
        this.transformMachineStates(
            machine,
            State.END_STATE,
            State.RETHROW_STATE,
            enclosingFinallyState));

    return parseExpression `function($ctx) {
      while (true) ${SwitchStatement}
    }`;
  }

  addTempVar() {
    let name = this.getTempIdentifier();
    this.addMachineVariable(name);
    return name;
  }

  addMachineVariable(name) {
    this.hoistVariablesTransformer_.addVariable(name);
  }

  transformCpsFunctionBody(tree, runtimeMethod, functionRef = undefined) {
    let alphaRenamedTree = AlphaRenamer.rename(tree, 'arguments', '$arguments');
    let hasArguments = alphaRenamedTree !== tree;

    // We hoist all the variables. They are not even inserted at the top in this
    // call but added later, since we use the same set of variable names for the
    // machine generated variables.
    let hoistedTree =
        this.hoistVariablesTransformer_.transformAny(alphaRenamedTree);

    // transform to a state machine
    let maybeMachine = this.transformAny(hoistedTree);
    if (this.reporter.hadError())
      return tree;

    // If the FunctionBody has no yield or return, no state machine got created
    // in the above transformation. We therefore convert it below.
    let machine;
    if (maybeMachine.type !== STATE_MACHINE) {
      machine = this.statementsToStateMachine_(maybeMachine.statements);
    } else {
      // Remove possibly empty states.
      machine = new StateMachine(maybeMachine.startState,
                                 maybeMachine.fallThroughState,
                                 this.removeEmptyStates(maybeMachine.states),
                                 maybeMachine.exceptionBlocks);
    }

    // Clean up start and end states.
    machine = machine.
        replaceFallThroughState(State.END_STATE).
        replaceStartState(State.START_STATE);

    let statements = [];
    if (this.hoistVariablesTransformer_.hasFunctions())
      statements.push(...this.hoistVariablesTransformer_.getFunctions());
    if (this.hoistVariablesTransformer_.hasVariables())
      statements.push(this.hoistVariablesTransformer_.getVariableStatement());
    if (hasArguments)
      statements.push(parseStatement `var $arguments = arguments;`);
    if (functionRef) {
      statements.push(parseStatement
          `return ${runtimeMethod}(
              ${this.generateMachineInnerFunction(machine)},
              ${functionRef}, this);`);
    } else {
      statements.push(parseStatement
          `return ${runtimeMethod}(
              ${this.generateMachineInnerFunction(machine)}, this);`);
    }

    // TODO(arv): The result should be an instance of Generator.
    // https://code.google.com/p/traceur-compiler/issues/detail?id=109

    return createFunctionBody(statements);
  }

  /**
   * @param {FunctionDeclaration} tree
   * @return {ParseTree}
   */
  transformFunctionDeclaration(tree) {
    // nested functions have already been transformed
    return tree;
  }

  /**
   * @param {FunctionExpression} tree
   * @return {ParseTree}
   */
  transformFunctionExpression(tree) {
    // nested functions have already been transformed
    return tree;
  }

  /**
   * @param {GetAccessor} tree
   * @return {ParseTree}
   */
  transformGetAccessor(tree) {
    // nested functions have already been transformed
    return tree;
  }

  /**
   * @param {SetAccessor} tree
   * @return {ParseTree}
   */
  transformSetAccessor(tree) {
    // nested functions have already been transformed
    return tree;
  }

  transformArrowFunction(tree) {
    return tree;
  }

  /**
   * @param {StateMachine} tree
   * @return {ParseTree}
   */
  transformStateMachine(tree) {
    return tree;
  }

  /**
   * Converts a statement into a state machine. The statement may not contain a
   * yield statement directly or indirectly.
   * @param {ParseTree} statements
   * @return {StateMachine}
   */
  statementToStateMachine_(statement) {
    let statements;
    if (statement.type === BLOCK)
      statements = statement.statements;
    else
      statements = [statement];
    return this.statementsToStateMachine_(statements);
  }

  /**
   * Converts a list of statements into a state machine. The statements may not
   * contain a yield statement directly or indirectly.
   * @param {Array.<ParseTree>} statements
   * @return {StateMachine}
   */
  statementsToStateMachine_(statements) {
    let startState = this.allocateState();
    let fallThroughState = this.allocateState();
    return this.stateToStateMachine_(
        new FallThroughState(
            startState,
            fallThroughState,
            statements),
        fallThroughState);
  }

  /**
   * @param {State} newState
   * @param {number} fallThroughState
   * @return {StateMachibneTree}
   */
  stateToStateMachine_(newState, fallThroughState) {
    return new StateMachine(newState.id, fallThroughState, [newState], []);
  }

  /**
   * Transforms all the machine states into a list of case clauses. Adds a
   * rethrow clause if the machine has any try blocks. Also adds a 'default'
   * clause which indicates a compiler bug in the state machine generation.
   * @param {StateMachine} machine
   * @param {number} machineEndState
   * @param {number} rethrowState
   * @param {Object} enclosingFinallyState
   * @return {Array.<ParseTree>}
   */
  transformMachineStates(machine, machineEndState, rethrowState,
                         enclosingFinallyState) {

    let cases = [];

    for (let i = 0; i < machine.states.length; i++) {
      let state = machine.states[i];
      let stateCase = state.transformMachineState(
          enclosingFinallyState[state.id],
          machineEndState, this.reporter);
      if (stateCase !== null) {
        cases.push(stateCase);
      }
    }

    // add finally fallthrough dispatch states
    this.addFinallyFallThroughDispatches(null, machine.exceptionBlocks, cases);

    cases.push(createDefaultClause(parseStatements `return $ctx.end()`));

    return cases;
  }

  /**
   * @param {FinallyState} enclosingFinallyState
   * @param {Array.<TryState>} tryStates
   * @param {Array.<ParseTree>} cases
   */
  addFinallyFallThroughDispatches(enclosingFinallyState, tryStates, cases) {
    for (let i = 0; i < tryStates.length; i++) {
      let tryState = tryStates[i];
      if (tryState.kind === TryState.Kind.FINALLY) {
        let finallyState = tryState;

        if (enclosingFinallyState !== null) {
          let caseClauses = [];
          let index = 0;
          // CONSIDER: the actual list is much less than
          // enclosingFinallyState.tryStates
          // CONSIDER: it is actually only jump destinations plus catch starts
          for (let j = 0; j < enclosingFinallyState.tryStates.length; j++) {
            let destination = enclosingFinallyState.tryStates[j];
            index++;
            let statements;
            // all but the last case fallthrough to the last case clause
            if (index < enclosingFinallyState.tryStates.length) {
              statements = [];
            } else {
              statements = parseStatements `
                  $ctx.state = $ctx.finallyFallThrough;
                  $ctx.finallyFallThrough = ${State.INVALID_STATE};
                  break;`
            }
            caseClauses.push(
                createCaseClause(createNumberLiteral(destination), statements));
          }
          caseClauses.push(
              createDefaultClause([
                // $ctx.state = enclosingFinallyState.startState;
                createAssignStateStatement(
                    enclosingFinallyState.finallyState),
                // break;
                createBreakStatement()
              ]));

          // case finally.fallThroughState:
          //   switch ($fallThrough) {
          //   case enclosingFinally.tryStates:
          //   ...
          //     $ctx.state = $fallThrough;
          //     $fallThrough = INVALID_STATE;
          //     break;
          //   default:
          //     $ctx.state = enclosingFinallyBlock.startState;
          //     break;
          //   }
          //   break;
          cases.push(
              createCaseClause(
                  createNumberLiteral(finallyState.fallThroughState),
                  [
                    createSwitchStatement(
                        createMemberExpression('$ctx', 'finallyFallThrough'),
                        caseClauses),
                    createBreakStatement()
                  ]));
        } else {
          // case finally.fallThroughState:
          //   $ctx.state = $fallThrough;
          //   break;
          cases.push(
              createCaseClause(
                  createNumberLiteral(finallyState.fallThroughState),
                  parseStatements `
                      $ctx.state = $ctx.finallyFallThrough;
                      break;`));
        }
        this.addFinallyFallThroughDispatches(finallyState,
                                             finallyState.nestedTrys,
                                             cases);
      } else {
        this.addFinallyFallThroughDispatches(enclosingFinallyState,
                                             tryState.nestedTrys,
                                             cases);
      }
    }
  }

  transformVariableDeclarationList(tree) {
    // The only declarations left are const/let.
    this.reporter.reportError(
        tree.location,
        'Traceur: const/let declarations in a block containing a yield are ' +
        'not yet implemented');
    return tree;
  }

  /**
   * transforms break/continue statements and their parents to state machines
   * @param {ParseTree} maybeTransformedStatement
   * @return {ParseTree}
   */
  maybeTransformStatement_(maybeTransformedStatement) {
    // transform break/continue statements and their parents to state machines
    let breakContinueTransformed =
        new BreakContinueTransformer(this.stateAllocator_).
            transformAny(maybeTransformedStatement);
    if (breakContinueTransformed !== maybeTransformedStatement) {
      breakContinueTransformed = this.transformAny(breakContinueTransformed);
    }
    return breakContinueTransformed;
  }

  /**
   * Ensure that a statement has been transformed into a state machine.
   * @param {ParseTree} statement
   * @return {StateMachine}
   */
  ensureTransformed_(statement) {
    if (statement === null) {
      return null;
    }
    let maybeTransformed = this.maybeTransformStatement_(statement);
    return maybeTransformed.type === STATE_MACHINE ?
        maybeTransformed :
        this.statementToStateMachine_(maybeTransformed);
  }

  /**
   * Ensure that a statement has been transformed into a state machine.
   * @param {Array.<ParseTree>} statements
   * @return {StateMachine}
   */
  ensureTransformedList_(statements) {
    let maybeTransformedStatements = [];
    let foundMachine = false;
    for (let i = 0; i < statements.length; i++) {
      let statement = statements[i];
      let maybeTransformedStatement = this.maybeTransformStatement_(statement);
      maybeTransformedStatements.push(maybeTransformedStatement);
      if (maybeTransformedStatement.type === STATE_MACHINE) {
        foundMachine = true;
      }
    }
    if (!foundMachine) {
      return this.statementsToStateMachine_(statements);
    }

    return this.transformStatementList_(maybeTransformedStatements);
  }

  expressionToStateMachine(tree) {
    let commaExpression = new ExplodeExpressionTransformer(this).
        transformAny(tree);
    let {statements} = new NormalizeCommaExpressionToStatementTransformer().
        transformAny(commaExpression);

    let lastStatement = statements.pop();
    assert(lastStatement.type === EXPRESSION_STATEMENT);
    let expression = lastStatement.expression;

    statements = super.transformList(statements);
    let machine = this.transformStatementList_(statements);

    return {expression, machine};
  }
}

/**
 * Transformer for transforming a normalized comma expression as returned by the
 * ExplodeExpressionTransformer into a set of expression statements and if
 * statements.
 */
class NormalizeCommaExpressionToStatementTransformer extends
    ParseTreeTransformer {

  transformCommaExpression(tree) {
    let statements = tree.expressions.map((expr) => {
      if (expr.type === CONDITIONAL_EXPRESSION)
        return this.transformAny(expr);
      return createExpressionStatement(expr);
    });
    return new AnonBlock(tree.location, statements);
  }

  transformConditionalExpression(tree) {
    // a ? b : c
    // =>
    // $0 = a, $0 ? ($1 = b, $2 = $1) : ($3 = c, $2 = $3), $2
    // =>
    // $0 = a;
    // if ($0) {
    //   $1 = b;
    //   $2 = $1;
    // } else {
    //  $3 = c;
    //  $2 = $3;
    // }
    // $2
    let ifBlock = this.transformAny(tree.left);
    let elseBlock = this.transformAny(tree.right);
    return new IfStatement(tree.location, tree.condition,
        anonBlockToBlock(ifBlock), anonBlockToBlock(elseBlock));
  }
}

function anonBlockToBlock(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return anonBlockToBlock(tree.expression);
  return new Block(tree.location, tree.statements);
}
