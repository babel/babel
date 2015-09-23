/* @flow */

import type NodePrinter from "../node/printer";
import * as t from "babel-types";

export function _params(node: Object, print: NodePrinter) {
  print.plain(node.typeParameters);
  this.push("(");
  print.list(node.params, {
    iterator: (node) =>{
      if (node.optional) this.push("?");
      print.plain(node.typeAnnotation);
    }
  });
  this.push(")");

  if (node.returnType) {
    print.plain(node.returnType);
  }
}

export function _method(node: Object, print: NodePrinter) {
  let value = node.value;
  let kind  = node.kind;
  let key   = node.key;

  if (kind === "method" || kind === "init") {
    if (value.generator) {
      this.push("*");
    }
  }

  if (kind === "get" || kind === "set") {
    this.push(kind + " ");
  }

  if (value.async) this.push("async ");

  if (node.computed) {
    this.push("[");
    print.plain(key);
    this.push("]");
  } else {
    print.plain(key);
  }

  this._params(value, print);
  this.space();
  print.plain(value.body);
}

export function FunctionExpression(node: Object, print: NodePrinter) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");

  if (node.id) {
    this.push(" ");
    print.plain(node.id);
  } else {
    this.space();
  }

  this._params(node, print);
  this.space();
  print.plain(node.body);
}

export { FunctionExpression as FunctionDeclaration };

export function ArrowFunctionExpression(node: Object, print: NodePrinter) {
  if (node.async) this.push("async ");

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    print.plain(node.params[0]);
  } else {
    this._params(node, print);
  }

  this.push(" => ");

  const bodyNeedsParens = t.isObjectExpression(node.body);

  if (bodyNeedsParens) {
    this.push("(");
  }

  print.plain(node.body);

  if (bodyNeedsParens) {
    this.push(")");
  }
}
