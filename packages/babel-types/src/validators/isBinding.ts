import getBindingIdentifiers from "../retrievers/getBindingIdentifiers.ts";
import type * as t from "../index.ts";
/**
 * Check if the input `node` is a binding identifier.
 */
export default function isBinding(
  node: t.Node,
  parent: t.Node,
  grandparent?: t.Node,
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
      const val =
        // @ts-expect-error key must present in parent
        parent[key];
      if (Array.isArray(val)) {
        if (val.includes(node)) return true;
      } else {
        if (val === node) return true;
      }
    }
  }

  return false;
}
