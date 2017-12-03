// Copyright 2014 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ScopeVisitor} from '../semantics/ScopeVisitor.js';

/**
 * FindIdentifiers class traverses a tree searching for identifier
 * expressions till it finds one that passes the filter function. The logic of
 * the filter function is provided by the caller of the class.
 *
 * This is used by FindBlockBindingInLoop to check if a function in a loop uses
 * any block variables that are declared in the surrounding loop.
 *
 * This class wants to both be a ScopeVisitor and a FindVisitor,
 * so FindVisitor's methods were copied and slightly modified here.
 */
export class FindIdentifiers extends ScopeVisitor {
  constructor(tree, filterFunction) {
    super();
    this.filterFunction_ = filterFunction;
    this.found_ = false;
    this.visitAny(tree);
  }

  visitIdentifierExpression(tree) {
    if (this.filterFunction_(tree.identifierToken.value, this.scope.tree)) {
      this.found = true;
    }
  }

  /**
   * Whether the searched for tree was found. Setting this to true aborts the
   * search.
   * @type {boolean}
   */
  get found() {
    return this.found_;
  }

  set found(v) {
    if (v) {
      this.found_ = true;
    }
  }

  visitAny(tree) {
    !this.found_ && tree && tree.visit(this);
  }

  visitList(list) {
    if (list) {
      for (let i = 0; !this.found_ && i < list.length; i++) {
        this.visitAny(list[i]);
      }
    }
  }
}
