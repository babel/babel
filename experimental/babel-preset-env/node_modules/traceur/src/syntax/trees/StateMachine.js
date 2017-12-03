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

import {ParseTree} from './ParseTree.js';
import {STATE_MACHINE} from './ParseTreeType.js';
import {State} from '../../codegeneration/generator/State.js';
import {TryState} from '../../codegeneration/generator/TryState.js';

/**
 * @param {TryState.Kind} kind
 * @param {Object} enclosingMap map of state IDs to FinallyState.
 * @param {Array.<TryState>} tryStates
 */
function addCatchOrFinallyStates(kind, enclosingMap, tryStates) {
  for (let i = 0; i < tryStates.length; i++) {
    let tryState = tryStates[i];
    if (tryState.kind === kind) {
      for (let j = 0; j < tryState.tryStates.length; j++) {
        let id = tryState.tryStates[j];
        enclosingMap[id] = tryState;
      }
    }
    addCatchOrFinallyStates(kind, enclosingMap, tryState.nestedTrys);
  }
}

/**
 * @param {Array.<TryState>} tryStates
 * @param {Array.<CatchState>} catches
 */
function addAllCatchStates(tryStates, catches) {
  for (let i = 0; i < tryStates.length; i++) {
    let tryState = tryStates[i];
    if (tryState.kind === TryState.Kind.CATCH) {
      catches.push(tryState);
    }
    addAllCatchStates(tryState.nestedTrys, catches);
  }
}

/**
 * A state machine tree is the result of transforming a set of statements that
 * contain a yield, either directly or indirectly. StateMachine's break many of
 * the design invariants in the compiler around parse trees. They are only valid
 * only as temporary entities during the generator transform pass. They are not
 * convertible (directly) to javascript code.
 *
 * State machine trees include a set of states identified by an integer id. A
 * State represents some executable statements, plus some set of possible
 * transitions to other states.
 *
 * The exceptionBlocks member stores a tree representing the dispatch portion of
 * all try/catch/finally blocks from the original source code. The bodies of the
 * try, catch and finally blocks are transformed to States and added to the main
 * states list.
 *
 * States and StateMachineTrees are created by a bottom up traversal of the
 * original source. When a control transfer statement (if, switch, while, for,
 * try) contains a state machine, the nested statements are converted to
 * StateMachines, then a new machine is created which knits together the states
 * from the nested machines.
 *
 * States and StateMachineTrees are immutable.
 */
export class StateMachine extends ParseTree {
  /**
   * @param {number} startState
   * @param {number} fallThroughState
   * @param {Array.<State>} states
   * @param {Array.<TryState>} exceptionBlocks
   */
  constructor(startState, fallThroughState, states, exceptionBlocks) {
    super(null);

    this.startState = startState;
    this.fallThroughState = fallThroughState;
    this.states = states;
    this.exceptionBlocks = exceptionBlocks;
  }

  /**
   * @type {ParseTreeType}
   */
  get type() {
    return STATE_MACHINE;
  }

  transform(transformer) {
    return transformer.transformStateMachine(this);
  }

  visit(visitor) {
    visitor.visitStateMachine(this);
  }

  /**
   * Returns all the state ids of states in the machine. Note that the
   * fallThroughState is typically not a state in the machine.
   * @return {Array.<number>}
   */
  getAllStateIDs() {
    let result = [];
    for (let i = 0; i < this.states.length; i++) {
      result.push(this.states[i].id);
    }
    return result;
  }

  /**
   * Return a map from the states in the machine to their nearest enclosing
   * finally.
   * @return {Object} map of state IDs to FinallyState.
   */
  getEnclosingFinallyMap() {
    let enclosingMap = Object.create(null);
    addCatchOrFinallyStates(TryState.Kind.FINALLY, enclosingMap,
                            this.exceptionBlocks);
    return enclosingMap;
  }

  allCatchStates() {
    let catches = [];
    addAllCatchStates(this.exceptionBlocks, catches);
    return catches;
  }

  replaceStateId(oldState, newState) {
    return new StateMachine(
        State.replaceStateId(this.startState, oldState, newState),
        State.replaceStateId(this.fallThroughState, oldState, newState),
        State.replaceAllStates(this.states, oldState, newState),
        State.replaceAllStates(this.exceptionBlocks, oldState, newState));
  }

  replaceStartState(newState) {
    return this.replaceStateId(this.startState, newState);
  }

  replaceFallThroughState(newState) {
    return this.replaceStateId(this.fallThroughState, newState);
  }

  /**
   * Returns a new state machine which will run this machine first, then run
   * the next machine.
   * @param {StateMachine} nextMachine
   * @return {StateMachine}
   */
  append(nextMachine) {
    let states = [...this.states];
    for (let i = 0; i < nextMachine.states.length; i++) {
      let otherState = nextMachine.states[i];
      states.push(
          otherState.replaceState(nextMachine.startState, this.fallThroughState));
    }

    let exceptionBlocks = [...this.exceptionBlocks];
    for (let i = 0; i < nextMachine.exceptionBlocks.length; i++) {
      let tryState = nextMachine.exceptionBlocks[i];
      exceptionBlocks.push(
          tryState.replaceState(nextMachine.startState, this.fallThroughState));
    }

    return new StateMachine(this.startState, nextMachine.fallThroughState,
                            states, exceptionBlocks);
  }
}
