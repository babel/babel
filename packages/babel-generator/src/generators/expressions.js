/* @flow */

import * as punctuators from "../fragments/punctuators";
import * as keywords from "../fragments/keywords";
import isInteger from "is-integer";
import isNumber from "lodash/lang/isNumber";
import * as t from "babel-types";
import n from "../node";

const SCIENTIFIC_NOTATION = /e/i;
const ZERO_DECIMAL_INTEGER = /\.0+$/;

export function UnaryExpression(node: Object) {
  let needsSpace = /[a-z]$/.test(node.operator);
  let arg = node.argument;

  if (t.isUpdateExpression(arg) || t.isUnaryExpression(arg)) {
    needsSpace = true;
  }

  if (t.isUnaryExpression(arg) && arg.operator === "!") {
    needsSpace = false;
  }

  this.push(node.operator);
  if (needsSpace) this.push(" ");
  this.print(node.argument, node);
}

export function DoExpression(node: Object) {
  this.push("do");
  this.space();
  this.print(node.body, node);
}

export function ParenthesizedExpression(node: Object) {
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.expression, node);
  this.push(new punctuators.ParenRPunctuator);
}

export function UpdateExpression(node: Object) {
  if (node.prefix) {
    this.push(node.operator);
    this.print(node.argument, node);
  } else {
    this.print(node.argument, node);
    this.push(node.operator);
  }
}

export function ConditionalExpression(node: Object) {
  this.print(node.test, node);
  this.space();
  this.push("?");
  this.space();
  this.print(node.consequent, node);
  this.space();
  this.push(":");
  this.space();
  this.print(node.alternate, node);
}

export function NewExpression(node: Object, parent: Object) {
  this.push(new keywords.NewKeyword);
  this.print(node.callee, node);
  if (node.arguments.length === 0 && this.format.minified &&
      !t.isCallExpression(parent, { callee: node }) &&
      !t.isMemberExpression(parent) &&
      !t.isNewExpression(parent)) return;

  this.push(new punctuators.ParenLPunctuator);
  this.printList(node.arguments, node);
  this.push(new punctuators.ParenRPunctuator);
}

export function SequenceExpression(node: Object) {
  this.printList(node.expressions, node);
}

export function ThisExpression() {
  this.push("this");
}

export function Super() {
  this.push("super");
}

export function Decorator(node: Object) {
  this.push("@");
  this.print(node.expression, node);
  this.newline();
}

export function CallExpression(node: Object) {
  this.print(node.callee, node);

  this.push(new punctuators.ParenLPunctuator);

  let isPrettyCall = node._prettyCall && !this.format.retainLines && !this.format.compact;

  let separator;
  if (isPrettyCall) {
    separator = ",\n";
    this.indent();
  }

  this.printList(node.arguments, node, { separator });

  if (isPrettyCall) {
    this.dedent();
  }

  this.push(new punctuators.ParenRPunctuator);
}

function buildYieldAwait(Keyword) {
  return function (node: Object) {
    this.push(new Keyword);

    if (node.delegate || node.all) {
      this.push("*");
    }

    if (node.argument) {
      this.push(" ");
      this.print(node.argument, node);
    }
  };
}

export let YieldExpression = buildYieldAwait(keywords.YieldKeyword);
export let AwaitExpression = buildYieldAwait(keywords.AwaitKeyword);

export function EmptyStatement() {
  this._lastPrintedIsEmptyStatement = true;
  this.push(new punctuators.SemicolonPunctuator);
}

export function ExpressionStatement(node: Object) {
  this.print(node.expression, node);
  this.push(new punctuators.SemicolonPunctuator);
}

export function AssignmentPattern(node: Object) {
  this.print(node.left, node);
  this.space();
  this.push("=");
  this.space();
  this.print(node.right, node);
}

export function AssignmentExpression(node: Object, parent: Object) {
  // Somewhere inside a for statement `init` node but doesn't usually
  // needs a paren except for `in` expressions: `for (a in b ? a : b;;)`
  let parens = this._inForStatementInit && node.operator === "in" &&
               !n.needsParens(node, parent);

  if (parens) {
    this.push("(");
  }

  this.print(node.left, node);

  let spaces = !this.format.compact || node.operator === "in" || node.operator === "instanceof";
  if (spaces) this.push(" ");

  this.push(node.operator);

  if (!spaces) {
    // space is mandatory to avoid outputting <!--
    // http://javascript.spec.whatwg.org/#comment-syntax
    spaces = node.operator === "<" &&
             t.isUnaryExpression(node.right, { prefix: true, operator: "!" }) &&
             t.isUnaryExpression(node.right.argument, { prefix: true, operator: "--" }) ||
             // Need spaces for operators of the same kind to avoid: `a+++b`
             t.isUnaryExpression(node.right, { prefix: true, operator: node.operator }) ||
             t.isUpdateExpression(node.right, { prefix: true, operator: node.operator + node.operator }) ||
             (t.isBinaryExpression(node.right) &&
               t.isUnaryExpression(getLeftMost(node.right), { prefix: true, operator: node.operator }));

  }

  if (spaces) this.push(" ");

  this.print(node.right, node);

  if (parens) {
    this.push(")");
  }
}

export function BindExpression(node: Object) {
  this.print(node.object, node);
  this.push("::");
  this.print(node.callee, node);
}

export {
  AssignmentExpression as BinaryExpression,
  AssignmentExpression as LogicalExpression
};

export function MemberExpression(node: Object) {
  this.print(node.object, node);

  let computed = node.computed;
  if (t.isLiteral(node.property) && isNumber(node.property.value)) {
    computed = true;
  }

  if (computed) {
    this.push(new punctuators.BracketLPunctuator);
    this.print(node.property, node);
    this.push(new punctuators.BracketRPunctuator);
  } else {
    if (t.isLiteral(node.object) && !t.isTemplateLiteral(node.object)) {
      let val;
      if (this.format.minified) {
        val = this._stringLiteral(node.object);
      } else {
        val = this.getPossibleRaw(node.object) || this._stringLiteral(node.object);
      }

      //if (isInteger(+val) && !SCIENTIFIC_NOTATION.test(val) && !ZERO_DECIMAL_INTEGER.test(val) && !this.endsWith(".")) {
      //  this.push(".");
      //}
    }

    this.push(new punctuators.DotPunctuator);
    this.print(node.property, node);
  }
}

export function MetaProperty(node: Object) {
  this.print(node.meta, node);
  this.push(new punctuators.DotPunctuator);
  this.print(node.property, node);
}

function getLeftMost(binaryExpr) {
  if (!t.isBinaryExpression(binaryExpr)) {
    return binaryExpr;
  }
  return getLeftMost(binaryExpr.left);
}
