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

import {ScopeTransformer} from './ScopeTransformer.js';
import {
  FunctionDeclaration,
  FunctionExpression
} from '../syntax/trees/ParseTrees.js';
import {
  THIS
} from '../syntax/PredefinedName.js';
import {
  createIdentifierExpression
} from './ParseTreeFactory.js';

/**
 * Replaces one identifier with another identifier (alpha
 * renaming). This transformation is safe to use for renaming a
 * declared variable ({@code var}, {@code const} or {@code let}) or
 * formal parameter, if the variable's scope isn't dynamically limited
 * using the {@code with} statement, nor its name observed with
 * {@code eval} or in a property binding, and so on.
 *
 * Creates an {@code AlphaRenamer} that will replace uses of the
 * identifier {@code varName} with {@code newName}.
 */
export class AlphaRenamer extends ScopeTransformer {
  /**
   * @param {string} varName
   * @param {string} newName
   */
  constructor(varName, newName) {
    super(varName);
    this.newName_ = newName;
  }

  /**
   * @param {IdentifierExpression} tree
   * @return {ParseTree}
   */
  transformIdentifierExpression(tree) {
    if (this.varName_ === tree.identifierToken.value) {
      return createIdentifierExpression(this.newName_);
    } else {
      return tree;
    }
  }

  transformThisExpression(tree) {
    if (this.varName_ !== THIS)
      return tree;
    return createIdentifierExpression(this.newName_);
  }

  /**
   * @param {FunctionDeclaration} tree
   * @return {ParseTree}
   */
  transformFunctionDeclaration(tree) {
    if (this.varName_ === tree.name) {
      // it is the function that is being renamed
      tree = new FunctionDeclaration(tree.location, this.newName_,
          tree.functionKind, tree.parameterList, tree.typeAnnotation,
          tree.annotations, tree.body);
    }
    return super.transformFunctionDeclaration(tree);
  }

  /**
   * @param {FunctionExpression} tree
   * @return {ParseTree}
   */
  transformFunctionExpression(tree) {
    if (this.varName_ === tree.name) {
      // it is the function that is being renamed
      tree = new FunctionExpression(tree.location, this.newName_,
          tree.functionKind, tree.parameterList, tree.typeAnnotation,
          tree.annotations, tree.body);
    }
    return super.transformFunctionExpression(tree);
  }

  /**
   * Alpha-renames {@code varName} to {@code newName} in {@code tree}
   * and returns the new {@code ParseTree}.
   *
   * <p>Renaming is applied throughout the lexical scope of the
   * variable. If the var name is freshly bound alpha-renaming doesn't
   * propagate there; for example, renaming {@code "a"} to {@code "b"}
   * in the following program:
   *
   * <pre>
   * function a(a) {
   *   ...
   * }
   * </pre>
   * Will produce:
   * <pre>
   * function b(a) {
   *   ...
   * }
   * </pre>
   *
   * @param {ParseTree} tree the tree to substitute names in.
   * @param {string} varName the identifier to be replaced.
   * @param {string} newName the identifier that will appear instead of |varName|.
   * @return {ParseTree} a copy of {@code tree} with replacements.
   */
  static rename(tree, varName, newName) {
    return new AlphaRenamer(varName, newName).transformAny(tree);
  }
}
