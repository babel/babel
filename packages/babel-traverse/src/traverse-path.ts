import TraversalContext from "./context";
import type { TraverseOptions } from "./index";
import type NodePath from "./path";
import type { Node } from "@babel/types";
import { VISITOR_KEYS } from "@babel/types";

/**
 * Traverse the given path, optionally visiting itself too
 *
 * @param path NodePath to be visited
 * @param opts The traverse options used to create a new traversal context
 * @param state A user data storage provided as the second callback argument for traversal visitors
 * @returns Whether the traversal stops early
 */
export const traversePath = (
  path: NodePath,
  opts: TraverseOptions,
  visitSelf: boolean,
  state?: any,
): boolean => {
  const { node, type, scope } = path;
  const context = new TraversalContext(scope, opts, state, path);

  if (visitSelf) return context.visitQueue([path]);

  const queue: NodePath[] | [] = [];
  const keys = VISITOR_KEYS[type];

  if (path.shouldSkip) return queue;

  for (const key of keys) {
    // @ts-expect-error
    const nodes = node[key] as Node | Node[] | null;
    let paths: NodePath[] = path.get(key);
    if (nodes && paths) {
      if (!Array.isArray(paths)) paths = [paths];
      // @ts-ignore
      queue.push(...paths);
    }
  }

  if (!queue) return false;
  return context.visitQueue(queue);
};
