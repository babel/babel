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

import {State} from './State.js';

const Kind = {
  CATCH: 'catch',
  FINALLY: 'finally'
};

/**
 * TryStates represent try catch/finally blocks which contain a yield. They
 * are stored as a forest of trees hung off of the StateMachine.
 *
 * TryStates are immutable.
 */
export class TryState {
  /**
   * @param {Kind} kind
   * @param {Array.<number>} tryStates
   * @param {TryState} nestedTrys
   */
  constructor(kind, tryStates, nestedTrys) {
    this.kind = kind;
    this.tryStates = tryStates;
    this.nestedTrys = nestedTrys;
  }

  /**
   * Helper for replaceState.
   * @param {number} oldState
   * @param {number} newState
   * @return {Array.<number>}
   */
  replaceAllStates(oldState, newState) {
    return State.replaceStateList(this.tryStates, oldState, newState);
  }

  /**
   * Helper for replaceState.
   * @param {number} oldState
   * @param {number} newState
   * @return {Array.<TryState>}
   */
  replaceNestedTrys(oldState, newState) {
    let states = [];
    for (let i = 0; i < this.nestedTrys.length; i++) {
      states.push(this.nestedTrys[i].replaceState(oldState, newState));
    }
    return states;
  }
}

TryState.Kind = Kind;
