// Copyright 2012 Traceur Authors.
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

import {FindVisitor} from './FindVisitor.js';

/**
 * This is used to find something in a tree. Extend this class and override
 * the desired visit functions to find what you are looking for. When the tree
 * you are looking for is found set |this.found| to true. This will abort the
 * search of the remaining sub trees.
 *
 * Does not search into nested functions.
 */
export class FindInFunctionScope extends FindVisitor {
  // don't visit function children or bodies
  visitFunctionDeclaration(tree) {
    this.visitList(tree.annotations);
  }
  visitFunctionExpression(tree) {
    this.visitList(tree.annotations);
  }
  visitSetAccessor(tree) {
    this.visitAny(tree.name);
    this.visitList(tree.annotations);
  }
  visitGetAccessor(tree) {
    this.visitAny(tree.name);
    this.visitList(tree.annotations);
  }
  visitMethod(tree) {
    this.visitAny(tree.name);
    this.visitList(tree.annotations);
  }
}
