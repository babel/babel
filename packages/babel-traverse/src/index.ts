import TraversalContext from "./context";
import * as visitors from "./visitors";
import { VISITOR_KEYS, removeProperties, traverseFast } from "@babel/types";
import type * as t from "@babel/types";
import * as cache from "./cache";
import type NodePath from "./path";
import type { default as Scope, Binding } from "./scope";
import type { Visitor } from "./types";

export type { Visitor, Binding };
export { default as NodePath } from "./path";
export { default as Scope } from "./scope";
export { default as Hub } from "./hub";
export type { HubInterface } from "./hub";

export { visitors };

export type TraverseOptions<S = t.Node> =
  | {
      scope?: Scope;
      noScope?: boolean;
      denylist?: string[];
    }
  | Visitor<S>;

function traverse<S>(
  parent: t.Node,
  opts: TraverseOptions<S>,
  scope: Scope | undefined,
  state: S,
  parentPath?: NodePath,
): void;

function traverse(
  parent: t.Node,
  opts: TraverseOptions,
  scope?: Scope,
  state?: any,
  parentPath?: NodePath,
): void;

function traverse(
  parent: t.Node,
  opts: TraverseOptions = {},
  scope?: Scope,
  state?: any,
  parentPath?: NodePath,
) {
  if (!parent) return;

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(
        "You must pass a scope and parentPath unless traversing a Program/File. " +
          `Instead of that you tried to traverse a ${parent.type} node without ` +
          "passing scope and parentPath.",
      );
    }
  }

  if (!VISITOR_KEYS[parent.type]) {
    return;
  }

  visitors.explode(opts);

  traverse.node(parent, opts, scope, state, parentPath);
}

export default traverse;

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.cheap = function (node, enter) {
  return traverseFast(node, enter);
};

/**
 * Traverse the children of given node
 * @param {Node} node
 * @param {TraverseOptions} opts The traverse options used to create a new traversal context
 * @param {scope} scope A traversal scope used to create a new traversal context. When opts.noScope is true, scope should not be provided
 * @param {any} state A user data storage provided as the second callback argument for traversal visitors
 * @param {NodePath} path A NodePath of given node
 * @param {string[]} skipKeys A list of key names that should be skipped during traversal. The skipKeys are applied to every descendants
 *
 * @note This function does not visit the given `node`.
 */
traverse.node = function (
  node: t.Node,
  opts: TraverseOptions,
  scope?: Scope,
  state?: any,
  path?: NodePath,
  skipKeys?: string[],
) {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  const context = new TraversalContext(scope, opts, state, path);
  for (const key of keys) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) {
      path?.stop();
      return;
    }
  }
};

traverse.clearNode = function (node: t.Node, opts?) {
  removeProperties(node, opts);

  cache.path.delete(node);
};

traverse.removeProperties = function (tree, opts?) {
  traverseFast(tree, traverse.clearNode, opts);
  return tree;
};

function hasDenylistedType(path: NodePath, state) {
  if (path.node.type === state.type) {
    state.has = true;
    path.stop();
  }
}

traverse.hasType = function (
  tree: any,
  type: any,
  denylistTypes?: Array<string>,
): boolean {
  // the node we're searching in is denylisted
  if (denylistTypes?.includes(tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  const state = {
    has: false,
    type: type,
  };

  traverse(
    tree,
    {
      noScope: true,
      denylist: denylistTypes,
      enter: hasDenylistedType,
    },
    null,
    state,
  );

  return state.has;
};

traverse.cache = cache;
