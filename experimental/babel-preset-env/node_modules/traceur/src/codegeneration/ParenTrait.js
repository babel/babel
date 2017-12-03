// Copyright 2015 Traceur Authors.
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
  ArgumentList,
  ArrayLiteral,
  BinaryExpression,
  ConditionalExpression,
  ExpressionStatement,
  NewExpression,
  ParenExpression,
  PropertyNameAssignment,
  VariableDeclaration,
} from '../syntax/trees/ParseTrees.js';
import {
  CALL_EXPRESSION,
  COMMA_EXPRESSION,
  FUNCTION_EXPRESSION,
  OBJECT_LITERAL,
  OBJECT_PATTERN,
  TEMPLATE_LITERAL_EXPRESSION,
  YIELD_EXPRESSION
} from '../syntax/trees/ParseTreeType.js';

function wrap(tree) {
  return new ParenExpression(tree.location, tree);
}

/**
 * This function is used as trait to generate a class that that adds parens
 * around trees as needed.
 *
 * Usage:
 *
 *  class MyTransformer extends ParenTrait(ParseTreeTransformer) {
 *    ...
 *  }
 *
 * @param {Function} ParseTreeTransformerClass A class that extends
 *     ParseTreeTransformer.
 * @return {Function}
 */
export function ParenTrait(ParseTreeTransformerClass) {
  return class extends ParseTreeTransformerClass {
    transformVariableDeclaration(tree) {
      let lvalue = this.transformAny(tree.lvalue);
      let typeAnnotation = this.transformAny(tree.typeAnnotation);
      let initializer = this.transformAny(tree.initializer);
      if (initializer !== null && initializer.type === COMMA_EXPRESSION) {
        initializer = wrap(initializer);
      } else if (tree.lvalue === lvalue &&
          tree.typeAnnotation === typeAnnotation &&
          tree.initializer === initializer) {
        return tree;
      }
      return new VariableDeclaration(tree.location, lvalue, typeAnnotation,
                                     initializer);
    }

    transformExpressionStatement(tree) {
      let expression = this.transformAny(tree.expression);
      switch (expression.type) {
        case OBJECT_LITERAL:
        case OBJECT_PATTERN:
        case FUNCTION_EXPRESSION:
          expression = wrap(expression);
          break;
      }
      if (tree.expression === expression) {
        return tree;
      }
      return new ExpressionStatement(tree.location, expression);
    }

    transformNewExpression(tree) {
      let operand = this.transformAny(tree.operand);
      let args = this.transformAny(tree.args);
      switch (operand.type) {
        case CALL_EXPRESSION:
        case TEMPLATE_LITERAL_EXPRESSION:
          operand = wrap(operand);
      }
      if (operand === tree.operand && args === tree.args) {
        return tree;
      }
      return new NewExpression(tree.location, operand, args);
    }

    transformExpressionList_(list) {
      let expressions = this.transformList(list);
      let newList = null;
      for (let i = 0; i < list.length; i++) {
        let expression = expressions[i];
        if (expression !== null && expression.type === COMMA_EXPRESSION) {
          expression = wrap(expression);
          if (newList === null) {
            newList = expressions.slice(0, i);
          }
          newList.push(expression);
        } else if (newList !== null) {
          newList.push(expression);
        }
      }
      if (newList !== null) {
        return newList;
      }
      return expressions;
    }

    transformArgumentList(tree) {
      let args = this.transformExpressionList_(tree.args);
      if (tree.args === args) {
        return tree;
      }
      return new ArgumentList(tree.location, args);
    }

    transformArrayLiteral(tree) {
      let elements = this.transformExpressionList_(tree.elements);
      if (tree.elements === elements) {
        return tree;
      }
      return new ArrayLiteral(tree.location, elements);
    }

    transformPropertyNameAssignment(tree) {
      let name = this.transformAny(tree.name);
      let value = this.transformAny(tree.value);
      if (value.type === COMMA_EXPRESSION) {
        value = wrap(value);
      } else if (name === tree.name && value === tree.value) {
        return tree;
      }
      return new PropertyNameAssignment(tree.location, name, value);
    }

    transformBinaryExpression(tree) {
      let left = this.transformAny(tree.left);
      let right = this.transformAny(tree.right);
      if (commaOrYield(left.type)) {
        left = wrap(left);
      }
      if (commaOrYield(right.type)) {
        right = wrap(right);
      }
      if (left === tree.left && right === tree.right) {
        return tree;
      }
      return new BinaryExpression(tree.location, left, tree.operator, right);
    }

    transformConditionalExpression(tree) {
      let condition = this.transformAny(tree.condition);
      let left = this.transformAny(tree.left);
      let right = this.transformAny(tree.right);
      if (commaOrYield(condition.type)) {
        condition = wrap(condition);
      }
      if (left.type == COMMA_EXPRESSION) {
        left = wrap(left);
      }
      if (right.type == COMMA_EXPRESSION) {
        right = wrap(right);
      }
      if (condition === tree.condition &&
          left === tree.left &&
          right === tree.right) {
        return tree;
      }
      return new ConditionalExpression(tree.location, condition, left, right);
    }
  };
}

function commaOrYield(type) {
  return type === COMMA_EXPRESSION || type == YIELD_EXPRESSION;
}
