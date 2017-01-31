// This file contains methods that convert the path node into another node or some other type of data.

import * as t from "babel-types";

export function toComputedKey(): Object {
  const node = this.node;

  let key;
  if (this.isMemberExpression()) {
    key = node.property;
  } else if (this.isProperty() || this.isMethod()) {
    key = node.key;
  } else {
    throw new ReferenceError("todo");
  }

  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.stringLiteral(key.name);
  }

  return key;
}

export function ensureBlock() {
  return t.ensureBlock(this.node);
}

export function arrowFunctionToShadowed() {
  // todo: maybe error
  if (!this.isArrowFunctionExpression()) return;

  this.ensureBlock();

  const { node } = this;
  node.expression = false;
  node.type = "FunctionExpression";
  node.shadow = node.shadow || true;
}
