import { VISITOR_KEYS } from "../definitions/index.ts";
import type * as t from "../index.ts";

const _skip = Symbol();
const _stop = Symbol();

/**
 * A prefix AST traversal implementation meant for simple searching and processing.
 * @param enter The callback can return `traverseFast.skip` to skip the subtree of the current node, or `traverseFast.stop` to stop the traversal.
 * @returns `true` if the traversal was stopped by callback, `false` otherwise.
 */
export default function traverseFast<Options = object>(
  node: t.Node | null | undefined,
  enter: (
    node: t.Node,
    opts?: Options,
  ) => void | typeof traverseFast.skip | typeof traverseFast.stop,
  opts?: Options,
): boolean {
  if (!node) return false;

  const keys = VISITOR_KEYS[node.type];
  if (!keys) return false;

  opts = opts || ({} as Options);
  const ret = enter(node, opts);
  if (ret !== undefined) {
    switch (ret) {
      case _skip:
        return false;
      case _stop:
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

traverseFast.skip = _skip;
traverseFast.stop = _stop;
