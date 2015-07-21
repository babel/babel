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

export function UnaryExpression(node, print) {
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
  print.plain(node.argument);
}

/**
 * Prints DoExpression, prints body.
 */

export function DoExpression(node, print) {
  this.push("do");
  this.space();
  print.plain(node.body);
}

/**
 * Prints ParenthesizedExpression, prints expression.
 */

export function ParenthesizedExpression(node, print) {
  this.push("(");
  print.plain(node.expression);
  this.push(")");
}

/**
 * Prints UpdateExpression, prints operator and argument.
 */

export function UpdateExpression(node, print) {
  if (node.prefix) {
    this.push(node.operator);
    print.plain(node.argument);
  } else {
    print.plain(node.argument);
    this.push(node.operator);
  }
}

/**
 * Prints ConditionalExpression, prints test, consequent, and alternate.
 */

export function ConditionalExpression(node, print) {
  print.plain(node.test);
  this.space();
  this.push("?");
  this.space();
  print.plain(node.consequent);
  this.space();
  this.push(":");
  this.space();
  print.plain(node.alternate);
}

/**
 * Prints NewExpression, prints callee and arguments.
 */

export function NewExpression(node, print) {
  this.push("new ");
  print.plain(node.callee);
  this.push("(");
  print.list(node.arguments);
  this.push(")");
}

/**
 * Prints SequenceExpression.expressions.
 */

export function SequenceExpression(node, print) {
  print.list(node.expressions);
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

export function Decorator(node, print) {
  this.push("@");
  print.plain(node.expression);
  this.newline();
}

/**
 * Prints CallExpression, prints callee and arguments.
 */

export function CallExpression(node, print) {
  print.plain(node.callee);

  this.push("(");

  var isPrettyCall = node._prettyCall && !this.format.retainLines && !this.format.compact;

  var separator;
  if (isPrettyCall) {
    separator = ",\n";
    this.newline();
    this.indent();
  }

  print.list(node.arguments, { separator });

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
  return function (node, print) {
    this.push(keyword);

    if (node.delegate || node.all) {
      this.push("*");
    }

    if (node.argument) {
      this.push(" ");
      print.plain(node.argument);
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

export function ExpressionStatement(node, print) {
  print.plain(node.expression);
  this.semicolon();
}

/**
 * Prints AssignmentPattern, prints left and right.
 */

export function AssignmentPattern(node, print) {
  print.plain(node.left);
  this.push(" = ");
  print.plain(node.right);
}

/**
 * Prints AssignmentExpression, prints left, operator, and right.
 */

export function AssignmentExpression(node, print) {
  // todo: add cases where the spaces can be dropped when in compact mode
  print.plain(node.left);

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

  print.plain(node.right);
}

/**
 * Prints BindExpression, prints object and callee.
 */

export function BindExpression(node, print) {
  print.plain(node.object);
  this.push("::");
  print.plain(node.callee);
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

export function MemberExpression(node, print) {
  var obj = node.object;
  print.plain(obj);

  if (!node.computed && t.isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  var computed = node.computed;
  if (t.isLiteral(node.property) && isNumber(node.property.value)) {
    computed = true;
  }

  if (computed) {
    this.push("[");
    print.plain(node.property);
    this.push("]");
  } else {
    if (t.isLiteral(node.object)) {
      var val = this._Literal(node.object);
      if (isInteger(+val) && !SCIENTIFIC_NOTATION.test(val)) {
        this.push(".");
      }
    }

    this.push(".");
    print.plain(node.property);
  }
}

/**
 * Print MetaProperty, prints meta and property.
 */

export function MetaProperty(node, print) {
  print.plain(node.meta);
  this.push(".");
  print.plain(node.property);
}
