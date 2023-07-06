import TraversalContext from "./context";
import type { ExplodedTraverseOptions } from "./index";
import type NodePath from "./path";
import type Scope from "./scope";
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
  state?: any,
  path?: NodePath,
  skipKeys?: Record<string, boolean>,
): boolean {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return false;

  const context = new TraversalContext(scope, opts, state, path);
  for (const key of keys) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) {
      return true;
    }
  }

  return false;
}
