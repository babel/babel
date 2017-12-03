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

/**
 * These are a placeholder for the fallthrough off the end of a finally block.
 *
 * They are added so that enclosing try blocks know that jumping to them does
 * not exit their block.
 *
 * The code for them is generated in addFinallyFallThroughDispatches.
 */
export class FinallyFallThroughState extends State {

  /**
   * @param {number} oldState
   * @param {number} newState
   * @return {FinallyFallThroughState}
   */
  replaceState(oldState, newState) {
    return new FinallyFallThroughState(
        State.replaceStateId(this.id, oldState, newState));
  }

  /**
   * Transforms a state into a case clause during the final code generation pass
   * @param {FinallyState} enclosingFinally
   * @param {number} machineEndState
   * @param {ErrorReporter} reporter
   * @return {CaseClause}
   */
  transformMachineState(enclosingFinally, machineEndState, reporter) {
    return null;
  }

  /**
   * @param {FinallyState} enclosingFinally
   * @param {number} machineEndState
   * @param {ErrorReporter} reporter
   * @return {Array.<ParseTree>}
   */
  transform(enclosingFinally, machineEndState, reporter) {
    throw new Error('these are generated in addFinallyFallThroughDispatches');
  }
}
