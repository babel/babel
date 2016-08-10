/* eslint max-len: 0 */
/* eslint quotes: 0 */

import * as t from "babel-types";

export function Identifier(node: Object) {
  // FIXME: We hang variance off Identifer to support Flow's def-site variance.
  // This is a terrible hack, but changing type annotations to use a new,
  // dedicated node would be a breaking change. This should be cleaned up in
  // the next major.
  if (node.variance) {
    if (node.variance === "plus") {
      this.token("+");
    } else if (node.variance === "minus") {
      this.token("-");
    }
  }

  this.word(node.name);
}

export function RestElement(node: Object) {
  this.token("...");
  this.print(node.argument, node);
}

export {
  RestElement as SpreadElement,
  RestElement as SpreadProperty,
  RestElement as RestProperty,
};

export function ObjectExpression(node: Object) {
  let props = node.properties;

  this.token("{");
  this.printInnerComments(node);

  if (props.length) {
    this.space();
    this.printList(props, node, { indent: true, statement: true });
    this.space();
  }

  this.token("}");
}

export { ObjectExpression as ObjectPattern };

export function ObjectMethod(node: Object) {
  this.printJoin(node.decorators, node);
  this._method(node);
}

export function ObjectProperty(node: Object) {
  this.printJoin(node.decorators, node);

  if (node.computed) {
    this.token("[");
    this.print(node.key, node);
    this.token("]");
  } else {
    // print `({ foo: foo = 5 } = {})` as `({ foo = 5 } = {});`
    if (t.isAssignmentPattern(node.value) && t.isIdentifier(node.key) && node.key.name === node.value.left.name) {
      this.print(node.value, node);
      return;
    }

    this.print(node.key, node);

    // shorthand!
    if (node.shorthand &&
      (t.isIdentifier(node.key) &&
       t.isIdentifier(node.value) &&
       node.key.name === node.value.name)) {
      return;
    }
  }

  this.token(":");
  this.space();
  this.print(node.value, node);
}

export function ArrayExpression(node: Object) {
  let elems = node.elements;
  let len   = elems.length;

  this.token("[");
  this.printInnerComments(node);

  for (let i = 0; i < elems.length; i++) {
    let elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      this.print(elem, node);
      if (i < len - 1) this.token(",");
    } else {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      this.token(",");
    }
  }

  this.token("]");
}

export { ArrayExpression as ArrayPattern };

export function RegExpLiteral(node: Object) {
  this.word(`/${node.pattern}/${node.flags}`);
}

export function BooleanLiteral(node: Object) {
  this.word(node.value ? "true" : "false");
}

export function NullLiteral() {
  this.word("null");
}

export function NumericLiteral(node: Object) {
  let raw = this.getPossibleRaw(node);

  this.number(raw == null ? node.value + "" : raw);
}

export function StringLiteral(node: Object, parent: Object) {
  // raw is the string literal's representation as it occurs
  // in the source code. This preserves quotes, line break
  // characters and unicode code units.
  let val = this.getPossibleRaw(node);
  // fall back to stringified value if raw does not exist
  if (val == null) {
    val = JSON.stringify(node.value);
  }

  // escape illegal js but valid json unicode characters
  val = val.replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });

  // Early return when inside JSX, because quotes
  // should not be altered in this case.
  if (t.isJSX(parent)) {
    return this.token(val);
  }

  // remove current quotes (keep originalVal for comparison below)
  let originalVal = val;
  val = val.slice(1, -1);

  if (this.format.quotes === "single") {
    // unescape double quotes
    val = val.replace(/\\"/g, '"');

    // escape single quotes not already escaped
    val = val.replace(/\\([\s\S])|(')/g,"\\$1$2");

    // add single quotes
    val = `'${val}'`;
  }

  // double quotes - default
  if (this.format.quotes !== "single") {
    // unescape single quotes
    val = val.replace(/\\'/g, "'");

    // escape double quotes not already escaped
    val = val.replace(/\\([\s\S])|(")/g,"\\$1$2");

    // add double quotes
    val = `"${val}"`;
  }

  // If conversion to led to escaping quotes and
  // original string had no escaped quotes, prefer
  // the original if avoidEscapingQuotes is true.
  if (this.format.avoidEscapingQuotes
    && /\\'|\\"/.test(val)
    && !/\\'|\\"/.test(originalVal)) {
    return this.token(originalVal);
  }

  return this.token(val);
}
