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

import {BreakState} from './BreakState.js';
import {ContinueState} from './ContinueState.js';
import {ParseTreeTransformer} from '../ParseTreeTransformer.js';
import {StateMachine} from '../../syntax/trees/StateMachine.js';

/**
 * @param {BreakStatement|ContinueStatement} tree
 * @return {string}
 */
function safeGetLabel(tree) {
  return tree.name ? tree.name.value : null;
}

/**
 * Converts statements which do not contain a yield, to a state machine. Always
 * called from a context where the containing block contains a yield. Normally
 * this just wraps the statement into a single state StateMachine. However, if
 * the statement contains a break or continue which exits the statement, then
 * the non-local break/continue must be converted into state machines.
 *
 * Note that parents of non-local break/continue statements are themselves
 * translated into state machines by the caller.
 */
export class BreakContinueTransformer extends ParseTreeTransformer {
  /**
   * @param {StateAllocator} stateAllocator
   */
  constructor(stateAllocator) {
    super();
    this.transformBreaks_ = true;
    this.stateAllocator_ = stateAllocator;
  }

  /** @return {number} */
  allocateState_() {
    return this.stateAllocator_.allocateState();
  }

  /**
   * @param {State} newState
   * @return {StateMachineTree}
   */
  stateToStateMachine_(newState) {
    // TODO: this shouldn't be required, but removing it requires making
    // consumers resilient
    // TODO: to a machine with INVALID fallThroughState
    let fallThroughState = this.allocateState_();
    return new StateMachine(newState.id, fallThroughState, [newState], []);
  }

  /**
   * @param {BreakStatement} tree
   * @return {ParseTree}
   */
  transformBreakStatement(tree) {
    return this.transformBreaks_ || tree.name ?
        this.stateToStateMachine_(
            new BreakState(this.allocateState_(), safeGetLabel(tree))) :
        tree;
  }

  /**
   * @param {ContinueStatement} tree
   * @return {ParseTree}
   */
  transformContinueStatement(tree) {
    return this.stateToStateMachine_(
        new ContinueState(this.allocateState_(), safeGetLabel(tree)));
  }

  /**
   * @param {DoWhileStatement} tree
   * @return {ParseTree}
   */
  transformDoWhileStatement(tree) {
    return tree;
  }

  /**
   * @param {ForOfStatement} tree
   * @return {ParseTree}
   */
  transformForOfStatement(tree) {
    return tree;
  }

  /**
   * @param {ForOnStatement} tree
   * @return {ParseTree}
   */
  transformForOnStatement(tree) {
    return tree;
  }

  /**
   * @param {ForStatement} tree
   * @return {ParseTree}
   */
  transformForStatement(tree) {
    return tree;
  }

  /**
   * @param {FunctionDeclaration} tree
   * @return {ParseTree}
   */
  transformFunctionDeclaration(tree) {
    return tree;
  }

  /**
   * @param {FunctionExpression} tree
   * @return {ParseTree}
   */
  transformFunctionExpression(tree) {
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
   * @param {SwitchStatement} tree
   * @return {ParseTree}
   */
  transformSwitchStatement(tree) {
    let oldState = this.transformBreaks_;
    this.transformBreaks_ = false;
    let result = super.transformSwitchStatement(tree);
    this.transformBreaks_ = oldState;
    return result;
  }

  /**
   * @param {WhileStatement} tree
   * @return {ParseTree}
   */
  transformWhileStatement(tree) {
    return tree;
  }
}
