/* eslint max-len: 0 */
/* eslint quotes: 0 */

import * as t from "babel-types";

export function Identifier(node: Object) {
  // FIXME: We hang variance off Identifer to support Flow's def-site variance.
  // This is a terrible hack, but changing type annotations to use a new,
  // dedicated node would be a breaking change. This should be cleaned up in
  // the next major.
  if (node.variance === "plus") {
    this.push("+");
  } else if (node.variance === "minus") {
    this.push("-");
  }

  this.push(node.name);
}

export function RestElement(node: Object) {
  this.push("...");
  this.print(node.argument, node);
}

export {
  RestElement as SpreadElement,
  RestElement as SpreadProperty,
  RestElement as RestProperty,
};

export function ObjectExpression(node: Object) {
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

export function ObjectMethod(node: Object) {
  this.printJoin(node.decorators, node, { separator: "" });
  this._method(node);
}

export function ObjectProperty(node: Object) {
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

export function ArrayExpression(node: Object) {
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

export function RegExpLiteral(node: Object) {
  this.push(`/${node.pattern}/${node.flags}`);
}

export function BooleanLiteral(node: Object) {
  this.push(node.value ? "true" : "false");
}

export function NullLiteral() {
  this.push("null");
}

export function NumericLiteral(node: Object) {
  this.push(node.value + "");
}

export function StringLiteral(node: Object, parent: Object) {
  this.push(this._stringLiteral(node.value, parent));
}

export function _stringLiteral(val: string, parent: Object): string {
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
