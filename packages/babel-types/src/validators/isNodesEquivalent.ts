import { NODE_FIELDS, VISITOR_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

/**
 * Check if two nodes are equivalent
 */
export default function isNodesEquivalent<T extends Partial<t.Node>>(
  a: T,
  b: any,
): b is T {
  if (
    typeof a !== "object" ||
    typeof b !== "object" ||
    a == null ||
    b == null
  ) {
    return a === b;
  }

  if (a.type !== b.type) {
    return false;
  }

  const fields = Object.keys(NODE_FIELDS[a.type] || a.type);
  const visitorKeys = VISITOR_KEYS[a.type];

  for (const field of fields) {
    const val_a =
      // @ts-expect-error field must present in a
      a[field];
    const val_b = b[field];
    if (typeof val_a !== typeof val_b) {
      return false;
    }
    if (val_a == null && val_b == null) {
      continue;
    } else if (val_a == null || val_b == null) {
      return false;
    }

    if (Array.isArray(val_a)) {
      if (!Array.isArray(val_b)) {
        return false;
      }
      if (val_a.length !== val_b.length) {
        return false;
      }

      for (let i = 0; i < val_a.length; i++) {
        if (!isNodesEquivalent(val_a[i], val_b[i])) {
          return false;
        }
      }
      continue;
    }

    if (typeof val_a === "object" && !visitorKeys?.includes(field)) {
      for (const key of Object.keys(val_a)) {
        if (val_a[key] !== val_b[key]) {
          return false;
        }
      }
      continue;
    }

    if (!isNodesEquivalent(val_a, val_b)) {
      return false;
    }
  }

  return true;
}
