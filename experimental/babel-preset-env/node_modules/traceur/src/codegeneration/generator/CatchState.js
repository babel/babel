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
import {TryState} from './TryState.js';

/**
 * Represents the dispatch portion of a try/catch block in a state machine.
 */
export class CatchState extends TryState {
  /**
   * @param {string} identifier The name of the exception variable in the
   *     catch.
   * @param {number} catchState The start of the catch portion of the
   *     'try/catch'.
   * @param {number} fallThroughState The fall through state of the catch
   *     portion of the 'try/catch'.
   * @param {Array.<number>} allStates
   * @param {TryState} nestedTrys
   */
  constructor(identifier, catchState, fallThroughState, allStates, nestedTrys) {
    super(TryState.Kind.CATCH, allStates, nestedTrys);
    this.identifier = identifier;
    this.catchState = catchState;
    this.fallThroughState = fallThroughState;
  }

  /**
   * @param {number} oldState
   * @param {number} newState
   * @return {CatchState}
   */
  replaceState(oldState, newState) {
    return new CatchState(
        this.identifier,
        State.replaceStateId(this.catchState, oldState, newState),
        State.replaceStateId(this.fallThroughState, oldState, newState),
        this.replaceAllStates(oldState, newState),
        this.replaceNestedTrys(oldState, newState));
  }
}
