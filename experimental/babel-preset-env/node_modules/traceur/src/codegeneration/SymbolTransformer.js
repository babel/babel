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

import {
  BinaryExpression,
  UnaryExpression
} from '../syntax/trees/ParseTrees.js';
import {
  IDENTIFIER_EXPRESSION,
  LITERAL_EXPRESSION,
  UNARY_EXPRESSION,
} from '../syntax/trees/ParseTreeType.js';
import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import ImportRuntimeTrait from './ImportRuntimeTrait.js';
import {
  EQUAL_EQUAL,
  EQUAL_EQUAL_EQUAL,
  NOT_EQUAL,
  NOT_EQUAL_EQUAL,
  TYPEOF
} from '../syntax/TokenType.js';
import { parseExpression} from './PlaceholderParser.js';

function isEqualityExpression(tree) {
  switch (tree.operator.type) {
    case EQUAL_EQUAL:
    case EQUAL_EQUAL_EQUAL:
    case NOT_EQUAL:
    case NOT_EQUAL_EQUAL:
      return true;
  }
  return false;
}

function isTypeof(tree) {
  return tree.type === UNARY_EXPRESSION && tree.operator.type === TYPEOF;
}

function isSafeTypeofString(tree) {
  if (tree.type !== LITERAL_EXPRESSION)
    return false;
  let value = tree.literalToken.processedValue;
  switch (value) {
    case 'symbol':
    case 'object':
      return false;
  }
  return true;
}


/**
 * This transformer transforms typeof expressions to return 'symbol' when
 * symbols have been shimmed.
 */
export class SymbolTransformer extends
    ImportRuntimeTrait(ParseTreeTransformer) {
  /**
   * @param {UniqueIdentifierGenerator} identifierGenerator
   * @param {ErrorReporter} reporter
   * @param {Options} options
   */
  constructor(identifierGenerator, reporter, options) {
    super();
    this.identifierGenerator = identifierGenerator;
    this.reporter = reporter;
    this.options = options;
  }

  /**
   * Helper for the case where we only want to transform the operand of
   * the typeof expression.
   */
  transformTypeofOperand_(tree) {
    let operand = this.transformAny(tree.operand);
    return new UnaryExpression(tree.location, tree.operator, operand);
  }

  transformBinaryExpression(tree) {
    // typeof expr === 'object'
    // Since symbols are implemented as objects typeof returns 'object'.
    // However, if the expression is comparing to 'undefined' etc we can just
    // use the built in typeof.
    if (isEqualityExpression(tree)) {
      if (isTypeof(tree.left) && isSafeTypeofString(tree.right)) {
        let left = this.transformTypeofOperand_(tree.left);
        let right = tree.right;
        return new BinaryExpression(tree.location, left, tree.operator, right);
      }

      if (isTypeof(tree.right) && isSafeTypeofString(tree.left)) {
        let left = tree.left;
        let right = this.transformTypeofOperand_(tree.right);
        return new BinaryExpression(tree.location, left, tree.operator, right);
      }
    }

    return super.transformBinaryExpression(tree);
  }

  transformUnaryExpression(tree) {
    if (tree.operator.type !== TYPEOF)
      return super.transformUnaryExpression(tree);

    let operand = this.transformAny(tree.operand);
    let expression = this.getRuntimeTypeof(operand);

    if (operand.type === IDENTIFIER_EXPRESSION) {
      // For ident we cannot just call the function since the ident might not
      // be bound to an identifier. This is important if the free variable
      // pass is not turned on.
      return parseExpression `(typeof ${operand} === 'undefined' ?
          'undefined' : ${expression})`;
    }

    return expression;
  }

  getRuntimeTypeof(operand) {
    let typeOf = this.getRuntimeExpression('typeof');
    return parseExpression `${typeOf}(${operand})`;
  }
}
