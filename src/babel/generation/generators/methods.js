import * as t from "../../types";

export function _params(node, print) {
  print(node.typeParameters);
  this.push("(");
  print.list(node.params, {
    iterator: (node) =>{
      if (node.optional) this.push("?");
      print(node.typeAnnotation);
    }
  });
  this.push(")");

  if (node.returnType) {
    print(node.returnType);
  }
}

export function _method(node, print) {
  var value = node.value;
  var kind  = node.kind;
  var key   = node.key;

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
    print(key);
    this.push("]");
  } else {
    print(key);
  }

  this._params(value, print);
  this.push(" ");
  print(value.body);
}

export function FunctionExpression(node, print) {
  if (node.async) this.push("async ");
  this.push("function");
  if (node.generator) this.push("*");

  if (node.id) {
    this.push(" ");
    print(node.id);
  } else {
    this.space();
  }

  this._params(node, print);
  this.space();
  print(node.body);
}

export { FunctionExpression as FunctionDeclaration };

export function ArrowFunctionExpression(node, print) {
  if (node.async) this.push("async ");

  if (node.params.length === 1 && t.isIdentifier(node.params[0])) {
    print(node.params[0]);
  } else {
    this._params(node, print);
  }

  this.push(" => ");

  const bodyNeedsParens = t.isObjectExpression(node.body);

  if (bodyNeedsParens) {
    this.push("(");
  }

  print(node.body);

  if (bodyNeedsParens) {
    this.push(")");
  }
}
