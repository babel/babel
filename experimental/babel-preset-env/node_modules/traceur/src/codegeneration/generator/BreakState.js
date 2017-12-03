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

import {FallThroughState} from './FallThroughState.js';
import {State} from './State.js';

export class BreakState extends State {
  /**
   * @param {number} id
   * @param {string} label
   */
  constructor(id, label) {
    super(id);
    this.label = label;
  }

  /**
   * @param {number} oldState
   * @param {number} newState
   * @return {BreakState}
   */
  replaceState(oldState, newState) {
    return new BreakState(
        State.replaceStateId(this.id, oldState, newState), this.label);
  }

  /**
   * @param {FinallyState} enclosingFinally
   * @param {number} machineEndState
   * @param {ErrorReporter} reporter
   * @return {Array.<ParseTree>}
   */
  transform(enclosingFinally, machineEndState, reporter) {
    throw new Error('These should be removed before the transform step');
  }

  /**
   * @param {StringMap} labelSet
   * @param {number=} breakState
   * @return {State}
   */
  transformBreak(labelSet, breakState = undefined) {
    if (this.label === null)
      return new FallThroughState(this.id, breakState, []);

    if (labelSet.has(this.label)) {
      return new FallThroughState(this.id,
          labelSet.get(this.label).fallThroughState, []);
    }

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
    return this.transformBreak(labelSet, breakState);
  }
}
