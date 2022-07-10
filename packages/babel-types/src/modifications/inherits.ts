import { INHERIT_KEYS } from "../constants";
import inheritsComments from "../comments/inheritsComments";
import type * as t from "..";

/**
 * Inherit all contextual properties from `parent` node to `child` node.
 */
export default function inherits<T extends t.Node | null | undefined>(
  child: T,
  parent: t.Node | null | undefined,
): T {
  if (!child || !parent) return child;

  // optionally inherit specific properties if not null
  for (const key of INHERIT_KEYS.optional) {
    // @ts-expect-error Fixme: refine parent types
    if (child[key] == null) {
      // @ts-expect-error Fixme: refine parent types
      child[key] = parent[key];
    }
  }

  // force inherit "private" properties
  for (const key of Object.keys(parent)) {
    if (key[0] === "_" && key !== "__clone") {
      // @ts-expect-error Fixme: refine parent types
      child[key] = parent[key];
    }
  }

  // force inherit select properties
  for (const key of INHERIT_KEYS.force) {
    // @ts-expect-error Fixme: refine parent types
    child[key] = parent[key];
  }

  inheritsComments(child, parent);

  return child;
}
