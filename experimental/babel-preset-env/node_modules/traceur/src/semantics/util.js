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
  IDENTIFIER_EXPRESSION,
  LITERAL_EXPRESSION,
  PAREN_EXPRESSION,
  UNARY_EXPRESSION
} from '../syntax/trees/ParseTreeType.js';
import {
  UNDEFINED
} from '../syntax/PredefinedName.js';
import {
  VOID
} from '../syntax/TokenType.js';

/**
 * @param {Array.<ParseTree>} list
 * @return {boolean}
 */
export function hasUseStrict(list) {
  for (let i = 0; i < list.length; i++) {
    if (!list[i].isDirectivePrologue())
      return false;
    if (list[i].isUseStrictDirective())
      return true;
  }
  return false;
}

/**
 * @param {ParseTree} tree
 * @return {boolean}
 */
export function isUndefined(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return isUndefined(tree.expression);

  return tree.type === IDENTIFIER_EXPRESSION &&
      tree.identifierToken.value === UNDEFINED;
}

/**
 * @param {ParseTree} tree
 * @return {boolean}
 */
export function isVoidExpression(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return isVoidExpression(tree.expression);
  // Any void expression without side effects can be dropped. Maybe expand
  // this as needed?
  return tree.type === UNARY_EXPRESSION && tree.operator.type === VOID &&
      isLiteralExpression(tree.operand);
}

/**
 * @param {ParseTree} tree
 * @return {boolean}
 */
export function isLiteralExpression(tree) {
  if (tree.type === PAREN_EXPRESSION)
    return isLiteralExpression(tree.expression);
  return tree.type === LITERAL_EXPRESSION;
}
