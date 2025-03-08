import { VISITOR_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

/**
 * A prefix AST traversal implementation meant for simple searching
 * and processing.
 */
export default function traverseFast<Options = object>(
  node: t.Node | null | undefined,
  enter: (node: t.Node, opts?: Options) => void | "skip" | "stop",
  opts?: Options,
): boolean {
  if (!node) return false;

  const keys = VISITOR_KEYS[node.type];
  if (!keys) return false;

  opts = opts || ({} as Options);
  const ret = enter(node, opts);
  if (ret !== undefined) {
    switch (ret) {
      case "skip":
        return false;
      case "stop":
        return true;
    }
  }

  for (const key of keys) {
    const subNode: t.Node | undefined | null =
      // @ts-expect-error key must present in node
      node[key];

    if (!subNode) continue;

    if (Array.isArray(subNode)) {
      for (const node of subNode) {
        if (traverseFast(node, enter, opts)) return true;
      }
    } else {
      if (traverseFast(subNode, enter, opts)) return true;
    }
  }
  return false;
}
