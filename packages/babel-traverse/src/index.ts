import "./path/context.ts"; // We have some cycles, this ensures correct order to avoid TDZ
import * as visitors from "./visitors.ts";
import {
  VISITOR_KEYS,
  removeProperties,
  type RemovePropertiesOptions,
  traverseFast,
} from "@babel/types";
import type * as t from "@babel/types";
import type { Binding } from "./scope/index.ts";
import type {
  ExplodedVisitor,
  Visitor,
  VisitorBase,
  VisitorProp,
  TraverseOptions,
} from "./types.ts";
import { lightTraverse } from "./light-traverse.ts";
import type { HubInterface } from "./hub.ts";
import TraversalContext from "./context.ts";

export type { ExplodedVisitor, Visitor, VisitorBase, Binding, TraverseOptions };
export { default as NodePath } from "./path/index.ts";
export { default as Scope, type BindingKind } from "./scope/index.ts";
export { default as Hub } from "./hub.ts";
export type { HubInterface };
export type { VisitWrapper } from "./visitors.ts";
export { createNodePath, createRootPath } from "./context.ts";

export { visitors };

function traverse<S, T extends object>(
  parent: t.Node,
  opts: {
    [P in keyof T]: VisitorProp<S, P & string>;
  },
  state: S,
  hub?: HubInterface,
): void;
function traverse<T extends object>(
  parent: t.Node,
  opts: {
    [P in keyof T]: VisitorProp<any, P & string>;
  },
  state?: any,
  hub?: HubInterface,
): void;
function traverse<S>(
  parent: t.Node,
  opts: TraverseOptions & Visitor<S>,
  state: S,
  hub?: HubInterface,
): void;
function traverse(
  parent: t.Node,
  opts: TraverseOptions & Visitor<any>,
  state?: any,
  hub?: HubInterface,
): void;
function traverse(
  parent: t.Node,
  opts: any = {},
  state?: any,
  hub?: HubInterface,
) {
  if (!parent) return;

  if (!opts.noScope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error(
        "If you do not pass `noScope: true` to traverse, the root node must be a Program or File node.",
      );
    }
  }

  if (!VISITOR_KEYS[parent.type]) {
    return;
  }

  visitors.explode(opts);

  const ctx = new TraversalContext(opts, state, hub!);
  lightTraverse(parent, ctx);
}

export default traverse;

traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.cheap = function (node: t.Node, enter: (node: t.Node) => void) {
  traverseFast(node, enter);
  return;
};

traverse.clearNode = function (node: t.Node, opts?: RemovePropertiesOptions) {
  removeProperties(node, opts);
};

traverse.removeProperties = function (
  tree: t.Node,
  opts?: RemovePropertiesOptions,
) {
  traverseFast(tree, traverse.clearNode, opts);
  return tree;
};

traverse.hasType = function (
  tree: t.Node,
  type: t.Node["type"],
  denylistTypes?: string[],
): boolean {
  // the node we're searching in is denylisted
  if (denylistTypes?.includes(tree.type)) return false;

  // the type we're looking for is the same as the passed node
  if (tree.type === type) return true;

  return traverseFast(tree, function (node) {
    if (denylistTypes?.includes(node.type)) {
      return traverseFast.skip;
    }
    if (node.type === type) {
      return traverseFast.stop;
    }
  });
};
