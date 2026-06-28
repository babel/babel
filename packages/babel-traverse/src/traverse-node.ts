import TraversalContext from "./context.ts";
import type { ExplodedVisitor, TraverseOptions } from "./types.ts";
import { Hub } from "./index.ts";
import NodePath from "./path/index.ts";
import type Scope from "./scope/index.ts";
import type * as t from "@babel/types";
import { VISITOR_KEYS } from "@babel/types";
import { _call, resync } from "./path/context.ts";

function _visitPaths(
  ctx: TraversalContext<any>,
  paths: NodePath<t.Node | null>[],
  keepFlags?: boolean,
): boolean {
  // set queue
  ctx.queue = paths;
  ctx.priorityQueue = [];

  const visited = new Set();
  let stop = false;
  let visitIndex = 0;

  const len = paths.length;

  for (; visitIndex < paths.length; ) {
    const path = paths[visitIndex];
    visitIndex++;

    resync.call(path);

    const oldContext = path.context;

    path.setContext(ctx, keepFlags || visitIndex > len);

    // this path no longer belongs to the tree
    if (path.key === null) continue;

    // ensure we don't visit the same node twice
    const { node } = path;
    if (visited.has(node)) continue;
    if (node) visited.add(node);

    stop = _visit(ctx, path);

    if (!stop && ctx.priorityQueue.length) {
      stop = _visitPaths(ctx, ctx.priorityQueue, true);
      ctx.priorityQueue = [];
      ctx.queue = paths;
    }

    path.setContext(undefined);
    path.context = oldContext;
    if (stop) break;
  }

  // clear queue
  ctx.queue = null;

  return stop;
}

function _visit(ctx: TraversalContext, path: NodePath<t.Node | null>) {
  const node = path.node;
  if (!node) {
    return false;
  }
  const opts = ctx.opts;

  const denylist = opts.denylist;
  if (denylist?.includes(node.type)) {
    return false;
  }

  if (opts.shouldSkip?.(path)) {
    return false;
  }

  // Note: We need to check "this.shouldSkip" first because
  // another visitor can set it to true. Usually .shouldSkip is false
  // before calling the enter visitor, but it can be true in case of
  // a requeued node (e.g. by .replaceWith()) that is then marked
  // with .skip().
  if (path.shouldSkip) return path.shouldStop;

  if (_call.call(path, opts.enter)) return path.shouldStop;
  if (path.node) {
    if (_call.call(path, opts[node.type]?.enter)) return path.shouldStop;
  }

  path.shouldStop = traverseNode(
    path.node,
    opts,
    path.scope,
    ctx.state,
    path,
    path.skipKeys,
  );

  if (path.node) {
    if (_call.call(path, opts.exit)) return true;
  }
  if (path.node) {
    _call.call(path, opts[node.type]?.exit);
  }

  return path.shouldStop;
}

/**
 * Traverse the children of given node
 * @param {Node} node
 * @param {TraverseOptions} opts The traverse options used to create a new traversal context
 * @param {scope} scope A traversal scope used to create a new traversal context. When opts.noScope is true, scope should not be provided
 * @param {any} state A user data storage provided as the second callback argument for traversal visitors
 * @param {NodePath} path A NodePath of given node
 * @param {Record<string, boolean>} skipKeys A map from key names to whether that should be skipped during traversal. The skipKeys are applied to every descendants
 * @param {boolean} visitSelf Whether to visit the given node itself
 * @returns {boolean} Whether the traversal stops early
 */
export function traverseNode<S = unknown>(
  node: t.Node,
  opts: TraverseOptions & ExplodedVisitor<S>,
  scope?: Scope | null,
  state?: S,
  path?: NodePath,
  skipKeys?: Record<string, boolean> | null,
  visitSelf?: boolean,
) {
  const keys = VISITOR_KEYS[node.type];
  if (!keys?.length) return false;

  const ctx = new TraversalContext(opts, state!);
  if (visitSelf) {
    if (skipKeys?.[path!.parentKey]) return false;
    return _visitPaths(ctx, [path!]);
  }

  const hub =
    path == null
      ? node.type === "Program" || node.type === "File"
        ? new Hub()
        : undefined
      : path.hub;

  for (const key of keys) {
    if (skipKeys?.[key]) continue;
    // @ts-expect-error key must present in node
    const prop = node[key];
    if (!prop) continue;

    if (Array.isArray(prop)) {
      if (!prop.length) continue;
      const paths = [];
      for (let i = 0; i < prop.length; i++) {
        const childPath = NodePath.get({
          parentPath: path,
          parent: node,
          container: prop,
          key: i,
          listKey: key,
          hub,
        });
        paths.push(childPath);
      }
      if (_visitPaths(ctx, paths)) return true;
    } else {
      if (
        _visitPaths(ctx, [
          NodePath.get({
            parentPath: path,
            parent: node,
            container: node,
            key,
            listKey: null,
            hub,
          }),
        ])
      ) {
        return true;
      }
    }
  }

  return false;
}
