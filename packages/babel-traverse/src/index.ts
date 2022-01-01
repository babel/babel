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

traverse.node = function (
  node: t.Node,
  opts: TraverseOptions,
  scope?: Scope,
  state?: any,
  parentPath?: NodePath,
  skipKeys?,
) {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;

  const context = new TraversalContext(scope, opts, state, parentPath);
  for (const key of keys) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
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
