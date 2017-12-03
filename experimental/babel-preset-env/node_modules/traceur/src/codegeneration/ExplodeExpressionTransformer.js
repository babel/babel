// Copyright 2014 Traceur Authors.
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

import {ParseTreeTransformer} from './ParseTreeTransformer.js';
import {
  createAssignmentExpression,
  createCommaExpression,
  createIdentifierExpression as id,
  createMemberExpression,
  createNumberLiteral,
  createOperatorToken,
  createParenExpression
} from './ParseTreeFactory.js';
import {
  AND,
  EQUAL,
  MINUS,
  MINUS_EQUAL,
  MINUS_MINUS,
  OR,
  PLUS,
  PLUS_EQUAL,
  PLUS_PLUS
} from '../syntax/TokenType.js';
import {
  COMMA_EXPRESSION,
  IDENTIFIER_EXPRESSION,
  MEMBER_EXPRESSION,
  MEMBER_LOOKUP_EXPRESSION,
  PROPERTY_NAME_ASSIGNMENT,
  SPREAD_EXPRESSION,
  TEMPLATE_LITERAL_PORTION
} from '../syntax/trees/ParseTreeType.js';
import {
  ArgumentList,
  ArrayLiteral,
  AwaitExpression,
  BinaryExpression,
  CallExpression,
  ClassExpression,
  ConditionalExpression,
  MemberExpression,
  MemberLookupExpression,
  NewExpression,
  ObjectLiteral,
  PropertyNameAssignment,
  SpreadExpression,
  TemplateLiteralExpression,
  TemplateSubstitution,
  UnaryExpression,
  YieldExpression
} from '../syntax/trees/ParseTrees.js';
import {assert} from '../util/assert.js';
import assignmentOperatorToBinaryOperator from
    './assignmentOperatorToBinaryOperator.js';

/**
 * @fileoverview This transforms expression into a normalized comma expression.
 * These comma expressions take the form of
 *
 *   $tmp1 = ..., $tmp2 = ..., $tmp3 = $tmp1 op $tmp2, $tmp3
 *
 * The important part here is that the order of execution stays the same and
 * that the semantics is the same as well as that the last expression is either
 * an identifier, a literal expression or an expression that has no side effects
 * (minus crazy valueOf, toString, global getter).
 *
 * This concept is also extended to support conditionals `a ? b : c` and
 * expressions such as `a || b` gets transformed into a conditional.
 *
 * The normalized comma form is used by the CPS transformer when there is a
 * yield expression. It is also used by the SuperTransformer.
 */

class CommaExpressionBuilder {
  constructor(tempVar) {
    this.tempVar = tempVar;
    this.expressions = [];
  }
  add(tree) {
    if (tree.type === COMMA_EXPRESSION)
      this.expressions.push(...getExpressions(tree));
    return this;
  }
  build(tree) {
    let tempVar = this.tempVar;
    this.expressions.push(createAssignmentExpression(tempVar, tree), tempVar);
    return createCommaExpression(this.expressions);
  }
}

function getResult(tree) {
  if (tree.type === COMMA_EXPRESSION)
    return tree.expressions[tree.expressions.length - 1];
  return tree;
}

function getExpressions(tree) {
  if (tree.type === COMMA_EXPRESSION)
    return tree.expressions.slice(0, -1);
  return [];
}

export class ExplodeExpressionTransformer extends ParseTreeTransformer {

  /**
   * @param {tempVarTransformer} tempVarTransformer This is the caller temp
   *   var transformer and it is used to generate the temp var names that are
   *   needed for the intermediary expressions.
   */
  constructor(tempVarTransformer) {
    super();
    this.tempVarTransformer_ = tempVarTransformer;
  }

  addTempVar() {
    let tmpId = this.tempVarTransformer_.addTempVar();
    return id(tmpId);
  }

  transformUnaryExpression(tree) {
    if (tree.operator.type === PLUS_PLUS)
      return this.transformUnaryNumeric_(tree, PLUS_EQUAL);

    if (tree.operator.type === MINUS_MINUS)
      return this.transformUnaryNumeric_(tree, MINUS_EQUAL);

    // typeof a
    // =>
    // $0 = a, typeof $0
    let operand = this.transformAny(tree.operand);
    if (operand === tree.operand)
      return tree;

    let expressions = [
      ...getExpressions(operand),
      new UnaryExpression(tree.location, tree.operator, getResult(operand))
    ];
    return createCommaExpression(expressions);
  }

  transformUnaryNumeric_(tree, operator) {
    // This is slightly different than the usual transform methods. It
    // transforms the expression accordingly:
    //
    // ++a
    // =>
    // a += 1
    //
    // and then calls transformAny to get the `a += 1` expression to be
    // transformed as needed.

    return this.transformAny(
        new BinaryExpression(tree.location, tree.operand,
            createOperatorToken(operator), createNumberLiteral(1)));
  }

  transformPostfixExpression(tree) {
    if (tree.operand.type === MEMBER_EXPRESSION)
      return this.transformPostfixMemberExpression_(tree);
    if (tree.operand.type === MEMBER_LOOKUP_EXPRESSION)
      return this.transformPostfixMemberLookupExpression_(tree);

    // What else do we need to support?
    assert(tree.operand.type === IDENTIFIER_EXPRESSION);

    // x++
    // =>
    // $0 = x, x = $0 + 1, $0

    let operand = tree.operand
    let tmp = this.addTempVar();
    let operator = tree.operator.type === PLUS_PLUS ? PLUS : MINUS;

    let expressions = [
      createAssignmentExpression(tmp, operand),
      createAssignmentExpression(operand,
          new BinaryExpression(tree.location, tmp, createOperatorToken(operator),
              createNumberLiteral(1))),
      tmp
    ];
    return createCommaExpression(expressions);
  }

  transformPostfixMemberExpression_(tree) {
    // a.b++
    // =>
    // $0 = a, $1 = $0.b, $0.b = $1 + 1, $1

    let memberName = tree.operand.memberName;
    let operand = this.transformAny(tree.operand.operand);
    let tmp = this.addTempVar();
    let memberExpression =
        new MemberExpression(tree.operand.location, getResult(operand),
                             memberName);
    let operator = tree.operator.type === PLUS_PLUS ? PLUS : MINUS;

    let expressions = [
      ...getExpressions(operand),
      createAssignmentExpression(tmp, memberExpression),
      createAssignmentExpression(memberExpression,
          new BinaryExpression(tree.location, tmp, createOperatorToken(operator),
              createNumberLiteral(1))),
      tmp
    ];
    return createCommaExpression(expressions);
  }

  transformPostfixMemberLookupExpression_(tree) {
    // a[b]++
    // =>
    // $0 = a, $1 = b, $2 = $0[$1], $0[$1] = $2 + 1, $2

    let memberExpression = this.transformAny(tree.operand.memberExpression);
    let operand = this.transformAny(tree.operand.operand);
    let tmp = this.addTempVar();
    let memberLookupExpression = new MemberLookupExpression(
        null, getResult(operand), getResult(memberExpression));
    let operator = tree.operator.type === PLUS_PLUS ? PLUS : MINUS;

    let expressions = [
      ...getExpressions(operand),
      ...getExpressions(memberExpression),
      createAssignmentExpression(tmp, memberLookupExpression),
      createAssignmentExpression(memberLookupExpression,
          new BinaryExpression(tree.location, tmp, createOperatorToken(operator),
              createNumberLiteral(1))),
      tmp
    ];
    return createCommaExpression(expressions);
  }

  transformYieldExpression(tree) {
    if (tree.expression === null) {
      return this.createCommaExpressionBuilder_().build(
          new YieldExpression(tree.location, null, false));
    }
    let expression = this.transformAny(tree.expression);
    return this.createCommaExpressionBuilder_().add(expression).build(
        new YieldExpression(tree.location, getResult(expression),
                            tree.isYieldFor));
  }

  transformAwaitExpression(tree) {
    let expression = this.transformAny(tree.expression);
    return this.createCommaExpressionBuilder_().add(expression).build(
        new AwaitExpression(tree.location, getResult(expression)));
  }

  transformParenExpression(tree) {
    let expression = this.transformAny(tree.expression);
    if (expression === tree.expression)
      return tree;

    let result = getResult(expression);
    if (result.type === IDENTIFIER_EXPRESSION)
      return expression;

    // We do not need to wrap the result in parens since the assignment
    // expression will take care of the grouping.
    return this.createCommaExpressionBuilder_().add(expression).build(result);
  }

  transformCommaExpression(tree) {
    let expressions = this.transformList(tree.expressions);
    if (expressions === tree.expressions)
      return tree;

    let builder = new CommaExpressionBuilder(null);
    // var results = [];
    for (let i = 0; i < expressions.length; i++) {
      builder.add(expressions[i]);
      // results.push(getResult(expressions[i]));
    }
    return createCommaExpression([
      ...builder.expressions,
      getResult(expressions[expressions.length - 1])
    ]);
  }

  transformMemberExpression(tree) {
    // a.b
    // =>
    // $0 = a, $1 = $0.b, $1

    let operand = this.transformAny(tree.operand);
    return this.createCommaExpressionBuilder_().add(operand).build(
        new MemberExpression(
            tree.location, getResult(operand), tree.memberName));
  }

  transformMemberLookupExpression(tree) {
    // a[b]
    // =>
    // $0 = a, $1 = b, $2 = $0[$1], $2

    let operand = this.transformAny(tree.operand);
    let memberExpression = this.transformAny(tree.memberExpression);
    return this.createCommaExpressionBuilder_().add(operand).
        add(memberExpression).
        build(new MemberLookupExpression(
            tree.location, getResult(operand), getResult(memberExpression)));
  }

  transformBinaryExpression(tree) {
    if (tree.operator.isAssignmentOperator())
      return this.transformAssignmentExpression_(tree);

    let left = this.transformAny(tree.left);
    let right = this.transformAny(tree.right);

    if (left === tree.left && right === tree.right)
      return tree;

    if (tree.operator.type === OR)
      return this.transformOr_(left, right);

    if (tree.operator.type === AND)
      return this.transformAnd_(left, right);

    // a op b
    // =>
    // $0 = a, $1 = b, $0 op $1

    let expressions = [
      ...getExpressions(left),
      ...getExpressions(right),
      new BinaryExpression(
              tree.location, getResult(left), tree.operator, getResult(right))
    ];

    return createCommaExpression(expressions);
  }

  transformAssignmentExpression_(tree) {
    let left = tree.left;

    if (left.type === MEMBER_EXPRESSION)
      return this.transformAssignMemberExpression_(tree);
    if (left.type === MEMBER_LOOKUP_EXPRESSION)
        return this.transformAssignMemberLookupExpression_(tree);

    // What else do we need to support?
    assert(tree.left.type === IDENTIFIER_EXPRESSION);

    if (tree.operator.type === EQUAL) {
      // a = b
      // =>
      // $0 = b, a = $0, $0

      left = this.transformAny(left);
      let right = this.transformAny(tree.right);

      let expressions = [
        ...getExpressions(right),
        createAssignmentExpression(left, getResult(right)),
        getResult(right)
      ];
      return createCommaExpression(expressions);
    }

    // a += b
    // =>
    // $0 = b, $1 = a + $0, a = $1, $1

    let right = this.transformAny(tree.right);
    let tmp = this.addTempVar();
    let binop = createOperatorToken(
        assignmentOperatorToBinaryOperator(tree.operator.type));

    let expressions = [
      ...getExpressions(right),
      createAssignmentExpression(tmp,
        new BinaryExpression(tree.location, left, binop, getResult(right))),
      createAssignmentExpression(left, tmp),
      tmp
    ];
    return createCommaExpression(expressions);
  }

  transformAssignMemberExpression_(tree) {
    let left = tree.left;

    if (tree.operator.type === EQUAL) {
      // a.b = c
      // =>
      // $0 = a, $1 = c, $0.b = $1, $1

      let operand = this.transformAny(left.operand);
      let right = this.transformAny(tree.right);

      let expressions = [
        ...getExpressions(operand),
        ...getExpressions(right),
        new BinaryExpression(tree.location,
            new MemberExpression(left.location, getResult(operand), left.memberName),
            tree.operator,
            getResult(right)),
        getResult(right)
      ];
      return createCommaExpression(expressions);
    }

    // a.b += c
    // =>
    // $0 = a, $1 = c, $2 = $0.b, $3 = $2 + $1, $0.b = $3, $3

    let operand = this.transformAny(left.operand);
    let right = this.transformAny(tree.right);
    let tmp = this.addTempVar();
    let memberExpression = new MemberExpression(left.location,
        getResult(operand), left.memberName);
    let tmp2 = this.addTempVar();
    let binop = createOperatorToken(
        assignmentOperatorToBinaryOperator(tree.operator.type));

    let expressions = [
      ...getExpressions(operand),
      ...getExpressions(right),
      createAssignmentExpression(tmp, memberExpression),
      createAssignmentExpression(tmp2,
          new BinaryExpression(tree.location, tmp, binop, getResult(right))),
      createAssignmentExpression(memberExpression, tmp2),
      tmp2
    ];
    return createCommaExpression(expressions);
  }

  transformAssignMemberLookupExpression_(tree) {
    let left = tree.left;

    if (tree.operator.type === EQUAL) {
      // a[b] = c
      // =>
      // $0 = a, $1 = b, $2 = c, $0[$1] = $2, $2

      let operand = this.transformAny(left.operand);
      let memberExpression = this.transformAny(left.memberExpression);
      let right = this.transformAny(tree.right);

      let expressions = [
        ...getExpressions(operand),
        ...getExpressions(memberExpression),
        ...getExpressions(right),
        new BinaryExpression(tree.location,
            new MemberLookupExpression(
                left.location, getResult(operand), getResult(memberExpression)),
            tree.operator,
            getResult(right)),
        getResult(right)
      ];
      return createCommaExpression(expressions);
    }

    // a[b] += c
    // =>
    // $0 = a, $1 = b, $2 = c, $3 = $0[$1], $4 = $3 + $2, $0[$1] = $4, $4

    let operand = this.transformAny(left.operand);
    let memberExpression = this.transformAny(left.memberExpression);
    let right = this.transformAny(tree.right);
    let tmp = this.addTempVar();
    let memberLookupExpression = new MemberLookupExpression(left.location,
        getResult(operand), getResult(memberExpression));
    let tmp2 = this.addTempVar();
    let binop = createOperatorToken(
        assignmentOperatorToBinaryOperator(tree.operator.type));

    let expressions = [
      ...getExpressions(operand),
      ...getExpressions(memberExpression),
      ...getExpressions(right),
      createAssignmentExpression(tmp, memberLookupExpression),
      createAssignmentExpression(tmp2,
          new BinaryExpression(tree.location, tmp, binop, getResult(right))),
      createAssignmentExpression(memberLookupExpression, tmp2),
      tmp2
    ];
    return createCommaExpression(expressions);
  }

  transformArrayLiteral(tree) {
    let elements = this.transformList(tree.elements);
    if (elements === tree.elements)
      return tree;

    let builder = this.createCommaExpressionBuilder_();
    let results = [];
    for (let i = 0; i < elements.length; i++) {
      builder.add(elements[i]);
      results.push(getResult(elements[i]));
    }
    return builder.build(new ArrayLiteral(tree.location, results));
  }

  transformObjectLiteral(tree) {
    // TODO(arv): Computed property names.
    let propertyNameAndValues = this.transformList(tree.propertyNameAndValues);
    if (propertyNameAndValues === tree.propertyNameAndValues)
      return tree;

    let builder = this.createCommaExpressionBuilder_();
    let results = [];
    for (let i = 0; i < propertyNameAndValues.length; i++) {
      if (propertyNameAndValues[i].type === PROPERTY_NAME_ASSIGNMENT) {
        builder.add(propertyNameAndValues[i].value);
        results.push(new PropertyNameAssignment(
            propertyNameAndValues[i].location,
            propertyNameAndValues[i].name,
            getResult(propertyNameAndValues[i].value)));
      } else {
        results.push(propertyNameAndValues[i]);
      }
    }
    return builder.build(new ObjectLiteral(tree.location, results));
  }

  transformTemplateLiteralExpression(tree) {
    let operand = this.transformAny(tree.operand);
    let elements = this.transformList(tree.elements);
    // If operand is present this has side effects.
    if (!operand && operand === tree.operand && elements === tree.elements)
      return tree;

    let builder = this.createCommaExpressionBuilder_();
    if (operand)
      builder.add(operand);

    let results = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type === TEMPLATE_LITERAL_PORTION) {
        results.push(elements[i]);
      } else {
        let expression = elements[i].expression
        builder.add(expression);
        let result = getResult(expression);
        results.push(new TemplateSubstitution(expression.location, result));
      }
    }
    return builder.build(
        new TemplateLiteralExpression(
            tree.location, operand && getResult(operand), results));
  }

  transformCallExpression(tree) {
    if (tree.operand.type === MEMBER_EXPRESSION)
      return this.transformCallMemberExpression_(tree);
    if (tree.operand.type === MEMBER_LOOKUP_EXPRESSION)
      return this.transformCallMemberLookupExpression_(tree);
    return this.transformCallAndNew_(tree, CallExpression);
  }

  transformNewExpression(tree) {
    return this.transformCallAndNew_(tree, NewExpression);
  }

  transformCallAndNew_(tree, ctor) {
    let operand = this.transformAny(tree.operand);
    let args = this.transformAny(tree.args);

    // Call expression have side effects so don't short circuit.

    let builder = this.createCommaExpressionBuilder_().add(operand);
    let argResults = [];
    args.args.forEach((arg) => {
      builder.add(arg);
      argResults.push(getResult(arg));
    });
    return builder.build(
        new ctor(tree.location, getResult(operand),
            new ArgumentList(args.location, argResults)));
  }

  transformCallMemberExpression_(tree) {
    // a.b(c)
    // =>
    // $0 = a, $1 = $0.b, $2 = c, $3 = $1.call($0, $2), $3

    let memberName = tree.operand.memberName;
    let operand = this.transformAny(tree.operand.operand);
    let tmp = this.addTempVar();
    let memberExpresssion = new MemberExpression(
        tree.operand.location, getResult(operand), memberName);
    let args = this.transformAny(tree.args);

    let expressions = [
      ...getExpressions(operand),
      createAssignmentExpression(tmp, memberExpresssion)
    ];

    let argResults = [getResult(operand)];
    args.args.forEach((arg) => {
      expressions.push(...getExpressions(arg));
      argResults.push(getResult(arg));
    });

    let callExpression =
        new CallExpression(tree.location,
            createMemberExpression(tmp, 'call'),
            new ArgumentList(args.location, argResults));

    let tmp2 = this.addTempVar();
    expressions.push(
        createAssignmentExpression(tmp2, callExpression),
        tmp2);
    return createCommaExpression(expressions);
  }

  transformCallMemberLookupExpression_(tree) {
    // a[b](c)
    // =>
    // $0 = a, $1 = b, $2 = $0[$1], $3 = c, $4 = $2.call($0, $3), $4

    let operand = this.transformAny(tree.operand.operand);
    let memberExpression = this.transformAny(tree.operand.memberExpression);
    let tmp = this.addTempVar();
    let lookupExpresssion = new MemberLookupExpression(
        tree.operand.location, getResult(operand), getResult(memberExpression));
    let args = this.transformAny(tree.args);

    let expressions = [
      ...getExpressions(operand),
      ...getExpressions(memberExpression),
      createAssignmentExpression(tmp, lookupExpresssion)
    ];

    let argResults = [getResult(operand)];
    args.args.forEach((arg, i) => {
      expressions.push(...getExpressions(arg));
      let result = getResult(arg);
      if (tree.args.args[i].type === SPREAD_EXPRESSION)
        result = new SpreadExpression(arg.location, result);
      argResults.push(result);
    });

    let callExpression =
        new CallExpression(tree.location,
            createMemberExpression(tmp, 'call'),
            new ArgumentList(args.location, argResults));

    let tmp2 = this.addTempVar();
    expressions.push(
        createAssignmentExpression(tmp2, callExpression),
        tmp2);
    return createCommaExpression(expressions);
  }

  transformConditionalExpression(tree) {
    // a ? b : c
    // =>
    // $0 = a, $0 ? ($1 = b, $2 = $1) : ($3 = c, $2 = $3), $2

    let condition = this.transformAny(tree.condition);
    let left = this.transformAny(tree.left);
    let right = this.transformAny(tree.right);
    if (condition === tree.condition && left === tree.left && right === tree.right)
      return tree;

    let res = this.addTempVar();
    let leftTree = createCommaExpression([
      ...getExpressions(left),
      createAssignmentExpression(res, getResult(left))
    ]);
    let rightTree = createCommaExpression([
      ...getExpressions(right),
      createAssignmentExpression(res, getResult(right))
    ]);

    let expressions = [
      ...getExpressions(condition),
      new ConditionalExpression(tree.location, getResult(condition),
          createParenExpression(leftTree), createParenExpression(rightTree)),
      res
    ];
    return createCommaExpression(expressions);
  }

  transformOr_(left, right) {
    // a || b
    // =>
    // ($0 = a) ? $0 : b

    let res = this.addTempVar();

    let leftTree = createCommaExpression([
      createAssignmentExpression(res, getResult(left))
    ]);

    let rightTree = createCommaExpression([
      ...getExpressions(right),
      createAssignmentExpression(res, getResult(right))
    ]);

    let expressions = [
      ...getExpressions(left),
      new ConditionalExpression(left.location, getResult(left),
          createParenExpression(leftTree), createParenExpression(rightTree)),
      res
    ];
    return createCommaExpression(expressions);
  }

  transformAnd_(left, right) {
    // a && b
    // =>
    // ($0 = a) ? b : $0

    let res = this.addTempVar();

    let leftTree = createCommaExpression([
      ...getExpressions(right),
      createAssignmentExpression(res, getResult(right))
    ]);

    let rightTree = createCommaExpression([
      createAssignmentExpression(res, getResult(left))
    ]);

    let expressions = [
      ...getExpressions(left),
      new ConditionalExpression(left.location, getResult(left),
          createParenExpression(leftTree), createParenExpression(rightTree)),
      res
    ];
    return createCommaExpression(expressions);
  }

  transformSpreadExpression(tree) {
    let expression = this.transformAny(tree.expression);
    if (expression === tree.expression)
      return tree;

    let result = getResult(expression);
    if (result.type !== SPREAD_EXPRESSION)
      result = new SpreadExpression(result.location, result);

    let expressions = [
      ...getExpressions(expression),
      result
    ];
    return createCommaExpression(expressions);
  }

  transformFunctionExpression(tree) {
    // function () {}
    // =>
    // $0 = function () {}, $0
    return this.createCommaExpressionBuilder_().build(tree);
  }

  transformArrowFunction(tree) {
    // () => {}
    // =>
    // $0 = () => {}, $0
    return this.createCommaExpressionBuilder_().build(tree);
  }

  transformClassExpression(tree) {
    // TODO(arv): Computed property names.

    // class extends a {}
    // =>
    // $0 = a, $1 = class extends $0 {}, $1

    let superClass = this.transformAny(tree.superClass);
    if (superClass === tree.superClass) {
      return this.createCommaExpressionBuilder_().build(tree);
    }

    let builder = this.createCommaExpressionBuilder_();
    builder.add(superClass);
    return builder.build(new ClassExpression(tree.location, tree.name,
        getResult(superClass), tree.elements, tree.annotations,
        tree.typeParameters));
  }

  transformFunctionBody(tree) {
    return tree;
  }

  createCommaExpressionBuilder_() {
    return new CommaExpressionBuilder(this.addTempVar());
  }
}
