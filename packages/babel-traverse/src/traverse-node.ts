import TraversalContext from "./context.ts";
import type { ExplodedTraverseOptions } from "./index.ts";
import type NodePath from "./path/index.ts";
import type Scope from "./scope/index.ts";
import type * as t from "@babel/types";
import { VISITOR_KEYS } from "@babel/types";

/**
 * Traverse the children of given node
 * @param {Node} node
 * @param {TraverseOptions} opts The traverse options used to create a new traversal context
 * @param {scope} scope A traversal scope used to create a new traversal context. When opts.noScope is true, scope should not be provided
 * @param {any} state A user data storage provided as the second callback argument for traversal visitors
 * @param {NodePath} path A NodePath of given node
 * @param {Record<string, boolean>} skipKeys A map from key names to whether that should be skipped during traversal. The skipKeys are applied to every descendants
 * @returns {boolean} Whether the traversal stops early

 * @note This function does not visit the given `node`.
 */
export function traverseNode<S = unknown>(
  node: t.Node,
  opts: ExplodedTraverseOptions<S>,
  scope?: Scope,
  state?: S,
  path?: NodePath,
  skipKeys?: Record<string, boolean>,
  visitSelf?: boolean,
): boolean {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return false;

  const context = new TraversalContext<S>(scope, opts, state, path);
  if (visitSelf) {
    if (skipKeys?.[path.parentKey]) return false;
    return context.visitQueue([path]);
  }

  for (const key of keys) {
    if (skipKeys?.[key]) continue;
    if (context.visit(node, key)) {
      return true;
    }
  }

  return false;
}
