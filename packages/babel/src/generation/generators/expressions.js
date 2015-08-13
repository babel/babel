import isInteger from "is-integer";
import isNumber from "lodash/lang/isNumber";
import * as t from "../../types";

/**
 * RegExp for testing scientific notation in literals.
 */

const SCIENTIFIC_NOTATION = /e/i;

/**
 * Prints UnaryExpression, prints operator and argument.
 */

export function UnaryExpression(node, parent) {
  var needsSpace = /[a-z]$/.test(node.operator);
  var arg = node.argument;

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

/**
 * Prints DoExpression, prints body.
 */

export function DoExpression(node, parent) {
  this.push("do");
  this.space();
  this.print(node.body, node);
}

/**
 * Prints ParenthesizedExpression, prints expression.
 */

export function ParenthesizedExpression(node, parent) {
  this.push("(");
  this.print(node.expression, node);
  this.push(")");
}

/**
 * Prints UpdateExpression, prints operator and argument.
 */

export function UpdateExpression(node, parent) {
  if (node.prefix) {
    this.push(node.operator);
    this.print(node.argument, node);
  } else {
    this.print(node.argument, node);
    this.push(node.operator);
  }
}

/**
 * Prints ConditionalExpression, prints test, consequent, and alternate.
 */

export function ConditionalExpression(node, parent) {
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

/**
 * Prints NewExpression, prints callee and arguments.
 */

export function NewExpression(node, parent) {
  this.push("new ");
  this.print(node.callee, node);
  this.push("(");
  this.printList(node.arguments, node);
  this.push(")");
}

/**
 * Prints SequenceExpression.expressions.
 */

export function SequenceExpression(node, parent) {
  this.printList(node.expressions, node);
}

/**
 * Prints ThisExpression.
 */

export function ThisExpression() {
  this.push("this");
}

/**
 * Prints Super.
 */

export function Super() {
  this.push("super");
}

/**
 * Prints Decorator, prints expression.
 */

export function Decorator(node, parent) {
  this.push("@");
  this.print(node.expression, node);
  this.newline();
}

/**
 * Prints CallExpression, prints callee and arguments.
 */

export function CallExpression(node, parent) {
  this.print(node.callee, node);

  this.push("(");

  var isPrettyCall = node._prettyCall && !this.format.retainLines && !this.format.compact;

  var separator;
  if (isPrettyCall) {
    separator = ",\n";
    this.newline();
    this.indent();
  }

  this.printList(node.arguments, node, { separator });

  if (isPrettyCall) {
    this.newline();
    this.dedent();
  }

  this.push(")");
}

/**
 * Builds yield or await expression printer.
 * Prints delegate, all, and argument.
 */

var buildYieldAwait = function (keyword) {
  return function (node) {
    this.push(keyword);

    if (node.delegate || node.all) {
      this.push("*");
    }

    if (node.argument) {
      this.push(" ");
      var terminatorState = this.startTerminatorless();
      this.print(node.argument, node);
      this.endTerminatorless(terminatorState);
    }
  };
};

/**
 * Create YieldExpression and AwaitExpression printers.
 */

export var YieldExpression = buildYieldAwait("yield");
export var AwaitExpression = buildYieldAwait("await");

/**
 * Prints EmptyStatement.
 */

export function EmptyStatement() {
  this.semicolon();
}

/**
 * Prints ExpressionStatement, prints expression.
 */

export function ExpressionStatement(node, parent) {
  this.print(node.expression, node);
  this.semicolon();
}

/**
 * Prints AssignmentPattern, prints left and right.
 */

export function AssignmentPattern(node, parent) {
  this.print(node.left, node);
  this.push(" = ");
  this.print(node.right, node);
}

/**
 * Prints AssignmentExpression, prints left, operator, and right.
 */

export function AssignmentExpression(node, parent) {
  // todo: add cases where the spaces can be dropped when in compact mode
  this.print(node.left, node);

  var spaces = node.operator === "in" || node.operator === "instanceof";
  spaces = true; // todo: https://github.com/babel/babel/issues/1835
  this.space(spaces);

  this.push(node.operator);

  if (!spaces) {
    // space is mandatory to avoid outputting <!--
    // http://javascript.spec.whatwg.org/#comment-syntax
    spaces = node.operator === "<" &&
             t.isUnaryExpression(node.right, { prefix: true, operator: "!" }) &&
             t.isUnaryExpression(node.right.argument, { prefix: true, operator: "--" });
  }

  this.space(spaces);

  this.print(node.right, node);
}

/**
 * Prints BindExpression, prints object and callee.
 */

export function BindExpression(node, parent) {
  this.print(node.object, node);
  this.push("::");
  this.print(node.callee, node);
}

/**
 * Alias ClassDeclaration printer as ClassExpression,
 * and AssignmentExpression printer as LogicalExpression.
 */

export {
  AssignmentExpression as BinaryExpression,
  AssignmentExpression as LogicalExpression
};

/**
 * Print MemberExpression, prints object, property, and value. Handles computed.
 */

export function MemberExpression(node, parent) {
  var obj = node.object;
  this.print(obj, node);

  if (!node.computed && t.isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  var computed = node.computed;
  if (t.isLiteral(node.property) && isNumber(node.property.value)) {
    computed = true;
  }

  if (computed) {
    this.push("[");
    this.print(node.property, node);
    this.push("]");
  } else {
    if (t.isLiteral(node.object)) {
      var val = this._Literal(node.object);
      if (isInteger(+val) && !SCIENTIFIC_NOTATION.test(val) && !this.endsWith(".")) {
        this.push(".");
      }
    }

    this.push(".");
    this.print(node.property, node);
  }
}

/**
 * Print MetaProperty, prints meta and property.
 */

export function MetaProperty(node, parent) {
  this.print(node.meta, node);
  this.push(".");
  this.print(node.property, node);
}
