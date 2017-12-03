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
  CaseClause,
  DefaultClause,
  SwitchStatement
} from '../../syntax/trees/ParseTrees.js';
import {State} from './State.js';
import {
  createBreakStatement
} from '../ParseTreeFactory.js';

/**
 * Represents a pair of ParseTree and integer.
 * Immutable.
 *
 * TODO: this came from Pair. Better member names?
 */
export class SwitchClause {
  /**
   * @param {ParseTree} first
   * @param {number} second
   */
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }
}

/**
 * Represents the dispatch portion of a switch statement that has been added
 * to a StateMachine.
 *
 * SwitchStates are immutable.
 */
export class SwitchState extends State {
  /**
   * @param {number} id
   * @param {ParseTree} expression
   * @param {Array.<SwitchClause>} clauses
   */
  constructor(id, expression, clauses) {
    super(id);
    this.expression = expression;
    this.clauses = clauses;
  }

  /**
   * Represents the dispatch portion of an if/else block.
   * ConditionalStates are immutable.
   *
   * @param {number} oldState
   * @param {number} newState
   * @return {SwitchState}
   */
  replaceState(oldState, newState) {
    let clauses = this.clauses.map((clause) => {
      return new SwitchClause(clause.first,
          State.replaceStateId(clause.second, oldState, newState));
    });
    return new SwitchState(
        State.replaceStateId(this.id, oldState, newState),
        this.expression,
        clauses);
  }

  /**
   * @param {FinallyState} enclosingFinally
   * @param {number} machineEndState
   * @param {ErrorReporter} reporter
   * @return {Array.<ParseTree>}
   */
  transform(enclosingFinally, machineEndState, reporter) {
    let clauses = [];
    for (let i = 0; i < this.clauses.length; i++) {
      let clause = this.clauses[i];
      if (clause.first === null) {
        clauses.push(new DefaultClause(null,
            State.generateJump(enclosingFinally, clause.second)));
      } else {
        clauses.push(new CaseClause(null, clause.first,
            State.generateJump(enclosingFinally, clause.second)));
      }
    }
    return [
      new SwitchStatement(null, this.expression, clauses),
      createBreakStatement()
    ];
  }
}
