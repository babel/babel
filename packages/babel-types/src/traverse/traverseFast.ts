import { VISITOR_KEYS } from "../definitions";
import type * as t from "..";

/**
 * A prefix AST traversal implementation meant for simple searching
 * and processing.
 */
export default function traverseFast(
  node: t.Node | null | undefined,
  enter: (node: t.Node, opts?: any) => void,
  // todo(flow->ts) We could parametrize opts to T rather than any, so that the type is "forwarded" to the callback.
  opts?: any,
): void {
  if (!node) return;

  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  opts = opts || {};
  enter(node, opts);

  for (const key of keys) {
    const subNode = node[key];

    if (Array.isArray(subNode)) {
      for (const node of subNode) {
        traverseFast(node, enter, opts);
      }
    } else {
      traverseFast(subNode, enter, opts);
    }
  }
}
