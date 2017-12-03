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
import {
  createBlock,
  createIfStatement
} from '../ParseTreeFactory.js';
import {parseStatements} from '../PlaceholderParser.js';

export class ConditionalState extends State {
  /**
   * @param {number} id
   * @param {number} ifState
   * @param {number} elseState
   * @param {ParseTree} condition
   */
  constructor(id, ifState, elseState, condition) {
    super(id);
    this.ifState = ifState;
    this.elseState = elseState;
    this.condition = condition;
  }

  /**
   * Represents the dispatch portion of an if/else block.
   * ConditionalStates are immutable.
   *
   * @param {number} oldState
   * @param {number} newState
   * @return {ConditionalState}
   */
  replaceState(oldState, newState) {
    return new ConditionalState(
        State.replaceStateId(this.id, oldState, newState),
        State.replaceStateId(this.ifState, oldState, newState),
        State.replaceStateId(this.elseState, oldState, newState),
        this.condition);
  }

  /**
   * @param {FinallyState} enclosingFinally
   * @param {number} machineEndState
   * @param {ErrorReporter} reporter
   * @return {Array.<ParseTree>}
   */
  transform(enclosingFinally, machineEndState, reporter) {
    // In case the jump goes through a finally we need to also ensure that we
    // set $ctx.finallyFallThrough which requires us to use an if statement.
    if (State.isFinallyExit(enclosingFinally, this.ifState) ||
        State.isFinallyExit(enclosingFinally, this.elseState)) {
      return [
        createIfStatement(this.condition,
            createBlock(State.generateJump(enclosingFinally, this.ifState)),
            createBlock(State.generateJump(enclosingFinally, this.elseState)))
      ];
    }

    // For the simpler and more common case we just use a conditional
    // expression.
    return parseStatements
        `$ctx.state = (${this.condition}) ? ${this.ifState} : ${this.elseState};
        break`;
  }
}
