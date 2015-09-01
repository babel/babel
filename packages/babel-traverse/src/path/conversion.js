// This file contains methods that convert the path node into another node or some other type of data.

import * as t from "babel-types";

export function toComputedKey(): Object {
  var node = this.node;

  var key;
  if (this.isMemberExpression()) {
    key = node.property;
  } else if (this.isProperty()) {
    key = node.key;
  } else {
    throw new ReferenceError("todo");
  }

  if (!node.computed) {
    if (t.isIdentifier(key)) key = t.literal(key.name);
  }

  return key;
}

export function ensureBlock() {
  return t.ensureBlock(this.node);
}
