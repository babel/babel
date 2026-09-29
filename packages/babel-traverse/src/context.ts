import type { ExplodedVisitor, TraverseOptions } from "./types.ts";
import type * as t from "@babel/types";
import NodePath from "./path/index.ts";
import type { HubInterface } from "./hub.ts";
import { setScope } from "./path/context.ts";
import { cacheNodePath, getCachedNodePath } from "./cache.ts";
import { explode } from "./visitors.ts";

export type TraversalStack = {
  path: NodePath;
  parentPath: NodePath | null;
  container: t.Node[] | t.Node | null;
  index: number;
  queue: NodePath<t.Node | null>[];
  priorityQueue: NodePath<t.Node | null>[] | undefined;
  queueIndex: number;
};

export default class TraversalContext<S = unknown> {
  static current: TraversalContext | undefined;

  constructor(
    opts: TraverseOptions & ExplodedVisitor<S>,
    state: S,
    hub: HubInterface,
  ) {
    this.state = state;
    this.opts = opts;
    this.hub = hub;
  }

  state!: S;
  opts!: TraverseOptions & ExplodedVisitor<S>;
  hub!: HubInterface;

  _parent: TraversalContext | undefined;
  _stacks: TraversalStack[] = [];
  _depth = 0;

  currentStack(path?: NodePath) {
    if (this._stacks.length <= this._depth) {
      if (!path) {
        path = new NodePath() as NodePath;
        path.context = this as TraversalContext;
      }
      this._stacks.push({
        container: null,
        index: 0,
        path,
        parentPath: null,
        queue: [],
        priorityQueue: undefined,
        queueIndex: -1,
      });
    }
    return this._stacks[this._depth];
  }

  findInsertionStack(
    container: t.Node | t.Node[] | null,
    path: NodePath<t.Node | null>,
  ) {
    for (let i = this._depth - 1; i > 0; i--) {
      const stack = this._stacks[i];
      if (stack.container === container) return stack;
    }

    for (let parent = path.parentPath; parent; parent = parent.parentPath) {
      if (!parent.node) return;

      for (let i = this._depth - 1; i > 0; i--) {
        const stack = this._stacks[i];
        if (stack.parentPath === parent) return stack;

        const currentPath =
          stack.queueIndex > 0 ? stack.queue[stack.queueIndex - 1] : stack.path;
        if (currentPath === parent) return stack;
      }
    }
  }
}

export function createRootPath(node: t.File, hub: HubInterface) {
  const ctx = new TraversalContext(explode({}), undefined, hub);
  const path = ctx.currentStack().path as NodePath<t.File>;
  path.node = node;
  return path;
}

export function createNodePath(
  context: TraversalContext,
  parentPath: NodePath,
  node: t.Node | null,
  container: t.Node | t.Node[] | null,
  key: string | number | null,
  listKey: string | null,
  initializeScope = true,
) {
  if (node) {
    const cached = getCachedNodePath(parentPath, node);
    if (cached) {
      if (cached.node === node && !cached.removed) {
        cached.container = container;
        cached.key = key;
        cached.listKey = listKey;

        if (cached._visitFrame === undefined && cached.context !== context) {
          cached.context = context;
          cached._traverseFlags = 0;
          cached.skipKeys = undefined;
        }

        if (initializeScope && !cached.scope) setScope.call(cached);

        return cached;
      }
    }
  }

  const newPath = new NodePath() as NodePath;

  newPath.context = context;
  newPath.parentPath = parentPath;
  newPath.container = container;
  newPath.node = node!;
  newPath.key = key;
  newPath.listKey = listKey;
  if (node) {
    cacheNodePath(newPath);
    if (initializeScope) setScope.call(newPath);
  } else {
    newPath.scope = parentPath.scope;
  }
  return newPath;
}
