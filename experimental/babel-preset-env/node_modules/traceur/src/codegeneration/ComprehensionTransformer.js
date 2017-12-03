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

import alphaRenameThisAndArguments from './alphaRenameThisAndArguments.js';
import {FunctionExpression} from '../syntax/trees/ParseTrees.js';
import {TempVarTransformer} from './TempVarTransformer.js';
import {
  LET,
  STAR,
  VAR
} from '../syntax/TokenType.js';
import {
  COMPREHENSION_FOR,
  COMPREHENSION_IF
} from '../syntax/trees/ParseTreeType.js';
import {Token} from '../syntax/Token.js';
import {
  createCallExpression,
  createEmptyParameterList,
  createForOfStatement,
  createFunctionBody,
  createIfStatement,
  createParenExpression,
  createVariableDeclarationList
} from './ParseTreeFactory.js';

/**
 * Base class for GeneratorComprehensionTransformer and
 * ArrayComprehensionTransformer.
 *
 * See subclasses for details on desugaring.
 */
export class ComprehensionTransformer extends TempVarTransformer {
  /**
   * transformArrayComprehension and transformGeneratorComprehension calls
   * this
   * @param {ArrayComprehension|GeneratorComprehension} tree
   * @param {ParseTree} statement The statement that goes inside the innermost
   *     loop (and if if present).
   * @param {boolean} isGenerator
   * @param {ParseTree=} prefix
   * @param {ParseTree=} suffix
   * @return {ParseTree}
   */
  transformComprehension(tree, statement, isGenerator,
      prefix = undefined, suffix = undefined) {

    // This should really be a let but we don't support let in generators.
    // https://code.google.com/p/traceur-compiler/issues/detail?id=6
    let bindingKind = isGenerator || !this.options.blockBinding ? VAR : LET;

    let statements = prefix ? [prefix] : [];

    for (let i = tree.comprehensionList.length - 1; i >= 0; i--) {
      let item = tree.comprehensionList[i];
      switch (item.type) {
        case COMPREHENSION_IF: {
          let expression = this.transformAny(item.expression);
          statement = createIfStatement(expression, statement);
          break;
        }
        case COMPREHENSION_FOR: {
          let left = this.transformAny(item.left);
          let iterator = this.transformAny(item.iterator);
          let initializer = createVariableDeclarationList(bindingKind,
                                                          left, null);
          statement = createForOfStatement(initializer, iterator, statement);
          break;
        }
        default:
          throw new Error('Unreachable.');
      }
    }

    statement = alphaRenameThisAndArguments(this, statement);

    statements.push(statement);
    if (suffix)
      statements.push(suffix);

    let functionKind = isGenerator ? new Token(STAR, null) : null;

    let func = new FunctionExpression(null, null, functionKind,
                                      createEmptyParameterList(), null, [],
                                      createFunctionBody(statements));

    return createParenExpression(createCallExpression(func));
  }
}
