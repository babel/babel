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

import {
  createAssignStateStatement,
  createBreakStatement,
  createCaseClause,
  createNumberLiteral
} from '../ParseTreeFactory.js';
import {parseStatement} from '../PlaceholderParser.js';

/**
 * A State in the generator state machine.
 *
 * The id in the state is unique across all machines in the function body.
 *
 * States are immutable.
 *
 * When knitting StateMachines together the states in one machine may need
 * renumbering in the new machine. replaceState() is used to create an
 * equivalent state with different state ids.
 */
export class State {
  /**
   * @param {number} id
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * Transforms a state into a case clause during the final code generation pass
   * @param {FinallyState} enclosingFinally
   * @param {number} machineEndState
   * @param {ErrorReporter} reporter
   * @return {CaseClause}
   */
  transformMachineState(enclosingFinally, machineEndState, reporter) {
    return createCaseClause(createNumberLiteral(this.id),
        this.transform(enclosingFinally, machineEndState, reporter));
  }

  /**
   * @param {StringMap} labelSet
   * @param {number} breakState
   * @return {State}
   */
  transformBreak(labelSet, breakState) {
    return this;
  }

  /**
   * @param {StringMap} labelSet
   * @param {number=} breakState
   * @param {number=} continueState
   * @return {State}
   */
  transformBreakOrContinue(labelSet, breakState = undefined,
                           continueState = undefined) {
    return this;
  }
}

State.START_STATE = 0;
State.INVALID_STATE = -1;
State.END_STATE = -2;
State.RETHROW_STATE = -3;

/**
 * Returns a list of statements which jumps to a given destination state. If
 * transfering control to the destination state requires exiting a try of a
 * try/finally then the finally block must be executed along the way.
 *
 * @param {FinallyState} enclosingFinally
 * @param {number} fallThroughState
 * @return {Array.<ParseTree>}
 */
State.generateJump = function(enclosingFinally, fallThroughState) {
  return [
    ...State.generateAssignState(enclosingFinally, fallThroughState),
    createBreakStatement()
  ];
};


/**
 * @param {FinallyState} enclosingFinally
 * @param {number} fallThroughState
 * @return {Array.<ParseTree>}
 */
State.generateAssignState = function(enclosingFinally, fallThroughState) {
  let assignState;
  if (State.isFinallyExit(enclosingFinally, fallThroughState)) {
    assignState = generateAssignStateOutOfFinally(
        enclosingFinally,
        fallThroughState);
  } else {
    assignState = [createAssignStateStatement(fallThroughState)];
  }
  return assignState;
};

/**
 * @param {FinallyState} enclosingFinally
 * @param {number} fallThroughState
 * @return {boolean}
 */
State.isFinallyExit = function(enclosingFinally, destination) {
  // TODO(arv): Track down who calls this with undefined.
  return !!enclosingFinally &&
      enclosingFinally.tryStates.indexOf(destination) < 0;
};

/**
 * Generate code for a jump out of a finally block.
 * @param {FinallyState} enclosingFinally
 * @param {number} destination
 * @return {Array.<ParseTree>}
 */
function generateAssignStateOutOfFinally(enclosingFinally, destination) {
  let finallyState = enclosingFinally.finallyState;
  // $ctx.state = finallyState;
  // $fallThrough = destination;
  return [
    createAssignStateStatement(finallyState),
    parseStatement `$ctx.finallyFallThrough = ${destination}`
  ];
}

/**
 * Helper for replaceState.
 * @param {Array.<number>} oldStates
 * @param {number} oldState
 * @param {number} newState
 */
State.replaceStateList = function(oldStates, oldState,  newState) {
  let states = [];
  for (let i = 0; i < oldStates.length; i++) {
    states.push(State.replaceStateId(oldStates[i], oldState, newState));
  }
  return states;
};

/**
 * Helper for replaceState.
 * @param {number} current
 * @param {number} oldState
 * @param {number} newState
 */
State.replaceStateId = function(current, oldState, newState) {
  return current === oldState ? newState : current;
};

/**
 * Helper for replaceState.
 * @param {Array.<TryState>} exceptionBlocks
 * @param {number} oldState
 * @param {number} newState
 * @return {Array.<TryState>}
 */
State.replaceAllStates = function(exceptionBlocks, oldState, newState) {
  let result = [];
  for (let i = 0; i < exceptionBlocks.length; i++) {
    result.push(exceptionBlocks[i].replaceState(oldState, newState));
  }
  return result;
};
