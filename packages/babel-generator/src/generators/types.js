/* @flow */

/* eslint quotes: 0 */

import type NodePrinter from "../node/printer";
import * as t from "babel-types";

export function Identifier(node: Object) {
  this.push(node.name);
}

export function RestElement(node: Object, print: NodePrinter) {
  this.push("...");
  print.plain(node.argument);
}

export { RestElement as SpreadElement, RestElement as SpreadProperty };

export function ObjectExpression(node: Object, print: NodePrinter) {
  let props = node.properties;

  this.push("{");
  print.printInnerComments();

  if (props.length) {
    this.space();
    print.list(props, { indent: true });
    this.space();
  }

  this.push("}");
}

export { ObjectExpression as ObjectPattern };

export function Property(node: Object, print: NodePrinter) {
  print.list(node.decorators, { separator: "" });

  if (node.method || node.kind === "get" || node.kind === "set") {
    this._method(node, print);
  } else {
    if (node.computed) {
      this.push("[");
      print.plain(node.key);
      this.push("]");
    } else {
      // print `({ foo: foo = 5 } = {})` as `({ foo = 5 } = {});`
      if (t.isAssignmentPattern(node.value) && t.isIdentifier(node.key) && node.key.name === node.value.left.name) {
        print.plain(node.value);
        return;
      }

      print.plain(node.key);

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
    print.plain(node.value);
  }
}

export function ArrayExpression(node: Object, print: NodePrinter) {
  let elems = node.elements;
  let len   = elems.length;

  this.push("[");
  print.printInnerComments();

  for (let i = 0; i < elems.length; i++) {
    let elem = elems[i];
    if (elem) {
      if (i > 0) this.space();
      print.plain(elem);
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

export function RegexLiteral(node: Object) {
  this.push(`/${node.pattern}/${node.flags}`);
}

export function BooleanLiteral(node: Object) {
  this.push(node.value ? "true" : "false");
}

export function NullLiteral() {
  this.push("null");
}

export function NumberLiteral(node: Object) {
  this.push(node.value + "");
}

export function StringLiteral(node: Object) {
  this.push(this._stringLiteral(node.value));
}

export function _stringLiteral(val: string): string {
  val = JSON.stringify(val);

  // escape illegal js but valid json unicode characters
  val = val.replace(/[\u000A\u000D\u2028\u2029]/g, function (c) {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });

  if (this.format.quotes === "single") {
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
