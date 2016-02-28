/* eslint max-len: 0 */
/* eslint quotes: 0 */

import * as t from "babel-types";

export function Identifier(node) {
  this.push(node.name);
}

export function RestElement(node) {
  this.push("...");
  this.print(node.argument, node);
}

export {
  RestElement as SpreadElement,
  RestElement as SpreadProperty,
  RestElement as RestProperty,
};

export function ObjectExpression(node) {
  let props = node.properties;

  this.push("{");
  this.printInnerComments(node);

  if (props.length) {
    this.space();
    this.printList(props, node, { indent: true });
    this.space();
  }

  this.push("}");
}

export { ObjectExpression as ObjectPattern };

export function ObjectMethod(node) {
  this.printJoin(node.decorators, node, { separator: "" });
  this._method(node);
}

export function ObjectProperty(node) {
  this.printJoin(node.decorators, node, { separator: "" });

  if (node.computed) {
    this.push("[");
    this.print(node.key, node);
    this.push("]");
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

  this.push(":");
  this.space();
  this.print(node.value, node);
}

export function ArrayExpression(node) {
  let elems = node.elements;
  let len   = elems.length;

  this.push("[");
  this.printInnerComments(node);

  for (let i = 0; i < elems.length; i++) {
    let elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      this.print(elem, node);
      if (i < len - 1) this.push(",");
    } else {
      // If the array expression ends with a hole, that hole
      // will be ignored by the interpreter, but if it ends with
      // two (or more) holes, we need to write out two (or more)
      // commas so that the resulting code is interpreted with
      // both (all) of the holes.
      this.push(",");
    }
  }

  this.push("]");
}

export { ArrayExpression as ArrayPattern };

export function RegExpLiteral(node) {
  this.push(`/${node.pattern}/${node.flags}`);
}

export function BooleanLiteral(node) {
  this.push(node.value ? "true" : "false");
}

export function NullLiteral() {
  this.push("null");
}

export function NumericLiteral(node) {
  this.push(node.value + "");
}

export function StringLiteral(node, parent) {
  this.push(this._stringLiteral(node.value, parent));
}

export function _stringLiteral(val, parent) {
  val = JSON.stringify(val);

  // escape illegal js but valid json unicode characters
  val = val.replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });

  if (this.format.quotes === "single" && !t.isJSX(parent)) {
    // remove double quotes
    val = val.slice(1, -1);

    // unescape double quotes
    val = val.replace(/\\"/g, '"');

    // escape single quotes
    val = val.replace(/'/g, "\\'");

    // add single quotes
    val = `'${val}'`;
  }

  return val;
}
