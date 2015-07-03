import * as t from "../../types";

/**
 * [Please add a description.]
 */

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

/**
 * [Please add a description.]
 */

export function ensureBlock() {
  return t.ensureBlock(this.node);
}
