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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  ArgumentList,
  BinaryExpression,
  CallExpression,
  ConditionalExpression,
  MemberExpression,
  MemberLookupExpression
} from '../syntax/trees/ParseTrees.js';
import {
  createArrayLiteral,
  createAssignmentExpression,
  createCommaExpression,
  createMemberExpression,
  createIdentifierExpression as id,
  createNullLiteral,
  createParenExpression,
} from './ParseTreeFactory.js';
import {
  COMMA_EXPRESSION,
  MEMBER_EXPRESSION,
  MEMBER_LOOKUP_EXPRESSION,
  IDENTIFIER_EXPRESSION,
  PAREN_EXPRESSION,
  THIS_EXPRESSION
} from '../syntax/trees/ParseTreeType.js';
import {
  AND,
  OR
} from '../syntax/TokenType.js';

function createCall(tree, operand, thisArg, importRuntimeTransformer) {
  let argList = tree.args; // can be null
  let argArray = argList ? argList.args : [];
  argArray = argArray.map(arg => {
    if (arg.type === COMMA_EXPRESSION) {
      return createParenExpression(arg.type);
    }
    return arg;
  });
  const continuation =
      importRuntimeTransformer.getRuntimeExpression('continuation');
  return new CallExpression(tree.location,
      continuation,
      new ArgumentList(argList ? argList.location : null, [operand, thisArg,
          createArrayLiteral(argArray)]));
}

export class RewriteTailExpressionsTransformer extends ParseTreeTransformer {
  // TODO(mnieper): template literals in tail position

  constructor(bodyTransformer) {
    super();
    this.bodyTransformer_ = bodyTransformer;
  }

  transformBinaryExpression(tree) {
    let operator = tree.operator;
    if (operator.type !== AND && operator.type !== OR) {
      return tree;
    }
    let right = this.transformAny(tree.right);
    if (right !== tree.right) {
      return new BinaryExpression(tree.location, tree.left, operator, right);
    }
    return tree;
  }

  transformCallExpression(tree) {
    let operand = tree.operand;
    while (operand.type === PAREN_EXPRESSION) {
      operand = operand.expression;
      // TODO(mnieper): Readd parens to the resulting call.
    }
    switch (operand.type) {
      case IDENTIFIER_EXPRESSION:
        return createCall(tree, operand, createNullLiteral(),
            this.bodyTransformer_);
      case MEMBER_EXPRESSION:
      case MEMBER_LOOKUP_EXPRESSION:
        return this.transformMemberExpressionCall_(tree, operand)
    }
    return tree;
  }

  transformMemberExpressionCall_(tree, operand) {
    let object = operand.operand;
    let thisArg;
    let assignment;
    if (object.type === IDENTIFIER_EXPRESSION ||
        object.type === THIS_EXPRESSION) {
        // If we wanted to be strict, we would have to leave out identifier
        // expressions here. When referring to getters on the global object,
        // they could have side effects.
      thisArg = object;
    } else {
      thisArg = id(this.bodyTransformer_.addTempVar());
      assignment = createAssignmentExpression(thisArg, operand.operand);
    }
    if (operand.type === MEMBER_EXPRESSION) {
      operand = new MemberExpression(operand.location, thisArg, operand.memberName);
    } else {
      operand = new MemberLookupExpression(operand.location, thisArg, operand.memberExpression);
    }
    if (assignment) {
      return createParenExpression(createCommaExpression([assignment,
          createCall(tree, operand, thisArg, this.bodyTransformer_)]));
    } else {
      return createCall(tree, operand, thisArg, this.bodyTransformer_);
    }
  }

  transformCommaExpression(tree) {
    let expressions = tree.expressions;
    let expression = expressions[expressions.length - 1];
    let transformedExpression = this.transformAny(expression);
    if (expression !== transformedExpression) {
      expressions = expressions.slice(0, -1);
      expressions.push(transformedExpression);
      return new CommaExpression(tree.location, expressions);
    }
    return tree;
  }

  transformConditionalExpression(tree) {
    let left = this.transformAny(tree.left);
    let right = this.transformAny(tree.right);
    if (left !== tree.left || right !== tree.right) {
      return new ConditionalExpression(tree.location, tree.condition,
          left, right);
    }
    return tree;
  }

  transformNewExpression(tree) {
    const construct = this.bodyTransformer_.getRuntimeExpression('construct');
    return createCall(tree, construct, tree.operand, this.bodyTransformer_);
  }

  transformArrayLiteral(tree) {return tree;}
  transformArrowFunction(tree) {return tree;}
  transformFunctionExpression(tree) {return tree;}
  transformIdentifierExpression(tree) {return tree;}
  transformLiteralExpression(tree) {return tree;}
  transformMemberExpression(tree) {return tree;}
  transformMemberLookupExpression(tree) {return tree;}
  transformPostfixExpression(tree) {return tree;}
  transformObjectLiteral(tree) {return tree;}
  transformUnaryExpression(tree) {return tree;}

  static transform(bodyTransformer,  tree) {
    return new RewriteTailExpressionsTransformer(bodyTransformer).
        transformAny(tree);
  }
}
