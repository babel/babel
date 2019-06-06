// @flow
import getBindingIdentifiers from "../retrievers/getBindingIdentifiers";
/**
 * Check if the input `node` is a binding identifier.
 */
export default function isBinding(
  node: Object,
  parent: Object,
  grandparent?: Object,
): boolean {
  if (
    grandparent &&
    node.type === "Identifier" &&
    parent.type === "ObjectProperty" &&
    grandparent.type === "ObjectExpression"
  ) {
    // We need to special-case this, because getBindingIdentifiers
    // has an ObjectProperty->value entry for destructuring patterns.
    return false;
  }

  const keys = getBindingIdentifiers.keys[parent.type];
  if (keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0) return true;
      } else {
        if (val === node) return true;
      }
    }
  }

  return false;
}
