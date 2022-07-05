import TraversalContext from "./context";
import type NodePath from "./path";
import type { Node } from "@babel/types";
import type { Visitor } from "./types";
import { VISITOR_KEYS } from "@babel/types";
import { explode } from "./visitors";

export type TraversePathOptions = {
  visitSelf?: boolean;
};

/**
 * Traverse the given path, optionally visiting itself too
 *
 * @function
 * @param path NodePath to be visited
 * @param visitor The traverse options used to create a new traversal context
 * @param state A user data storage provided as the second callback argument for traversal visitors
 * @param opts User provided options for traversal
 * @returns Whether the traversal stops early
 */
export function traversePath(
  path: NodePath,
  visitor: Visitor,
  state?: any,
  opts?: TraversePathOptions,
): boolean {
  const { type, scope } = path;

  explode(visitor as Visitor);
  const context = new TraversalContext(scope, visitor, state, path);

  if (opts && opts.visitSelf) return context.visitQueue([path]);

  const queue = buildQueue(path, type);
  if (!queue.length) return false;
  return context.visitQueue(queue);
}

function buildQueue(path: NodePath, type: string): NodePath[] {
  const { node } = path;
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

  return queue;
}
