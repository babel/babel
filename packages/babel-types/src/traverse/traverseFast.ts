import { VISITOR_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

/**
 * A prefix AST traversal implementation meant for simple searching
 * and processing.
 */
export default function traverseFast<Options = object>(
  node: t.Node | null | undefined,
  enter: (node: t.Node, opts?: Options) => void,
  opts?: Options,
): void {
  if (!node) return;

  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  opts = opts || ({} as Options);
  enter(node, opts);

  for (const key of keys) {
    const subNode: t.Node | undefined | null =
      // @ts-expect-error key must present in node
      node[key];

    if (Array.isArray(subNode)) {
      for (const node of subNode) {
        traverseFast(node, enter, opts);
      }
    } else {
      traverseFast(subNode, enter, opts);
    }
  }
}
