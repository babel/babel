/* @flow */

import * as t from "babel-types";

export function _params(node: Object) {
  this.print(node.typeParameters, node);
  this.push("(");
  this.printList(node.params, node, {
    iterator: (node) =>{
      if (node.optional) this.push("?");
      this.print(node.typeAnnotation, node);
    }
  });
  this.push(")");

  if (node.returnType) {
    this.print(node.returnType, node);
  }
}

export function _method(node: Object) {
  let kind = node.kind;
  let key  = node.key;

  if (kind === "method" || kind === "init") {
    if (node.generator) {
      this.push("*");
    }
  }

  if (kind === "get" || kind === "set") {
    this.push(kind + " ");
  }

  if (node.async) this.push("async ");

  if (node.computed) {
    this.push("[");
    this.print(key, node);
    this.push("]");
  } else {
    this.print(key, node);
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

export function FunctionExpression(node: Object) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");

  if (node.id) {
    this.push(" ");
    this.print(node.id, node);
  } else {
    this.space();
  }

  this._params(node);
  this.space();
  this.print(node.body, node);
}

export { FunctionExpression as FunctionDeclaration };

export function ArrowFunctionExpression(node: Object) {
  if (node.async) this.push("async ");

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    this.print(node.params[0], node);
  } else {
    this._params(node);
  }

  this.push(" => ");

  this.print(node.body, node);
}
