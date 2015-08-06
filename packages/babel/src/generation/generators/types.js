/* eslint quotes: 0 */

import * as t from "../../types";

/**
 * Prints Identifier, prints name.
 */

export function Identifier(node) {
  this.push(node.name);
}

/**
 * Prints RestElement, prints argument.
 */

export function RestElement(node) {
  this.push("...");
  this.print(node.argument, node);
}

/**
 * Alias RestElement printer as SpreadElement,
 * and RestElement printer as SpreadProperty.
 */

export { RestElement as SpreadElement, RestElement as SpreadProperty };

/**
 * Prints ObjectExpression, prints properties.
 */

export function ObjectExpression(node) {
  var props = node.properties;

  this.push("{");
  this.printInnerComments(node);

  if (props.length) {
    this.space();
    this.printList(props, node, { indent: true });
    this.space();
  }

  this.push("}");
}

/**
 * Alias ObjectExpression printer as ObjectPattern.
 */

export { ObjectExpression as ObjectPattern };

/**
 * Prints Property, prints decorators, key, and value, handles kind, computed, and shorthand.
 */

export function Property(node) {
  this.printList(node.decorators, node, { separator: "" });

  if (node.method || node.kind === "get" || node.kind === "set") {
    this._method(node);
  } else {
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
}

/**
 * Prints ArrayExpression, prints elements.
 */

export function ArrayExpression(node) {
  var elems = node.elements;
  var len   = elems.length;

  this.push("[");
  this.printInnerComments(node);

  for (var i = 0; i < elems.length; i++) {
    var elem = elems[i];
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

/**
 * Alias ArrayExpression printer as ArrayPattern.
 */

export { ArrayExpression as ArrayPattern };

/**
 * Prints Literal, prints value, regex, raw, handles val type.
 */

export function Literal(node) {
  this.push(""); // hack: catch up indentation
  this._push(this._Literal(node));
}

export function _Literal(node) {
  var val = node.value;

  if (node.regex) {
    return `/${node.regex.pattern}/${node.regex.flags}`;
  }

  // just use the raw property if our current value is equivalent to the one we got
  // when we populated raw
  if (node.raw != null && node.rawValue != null && val === node.rawValue) {
    return node.raw;
  }

  switch (typeof val) {
    case "string":
      return this._stringLiteral(val);

    case "number":
      return val + "";

    case "boolean":
      return val ? "true" : "false";

    default:
      if (val === null) {
        return "null";
      } else {
        throw new Error("Invalid Literal type");
      }
  }
}

/**
 * Prints string literals, handles format.
 */

export function _stringLiteral(val) {
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
