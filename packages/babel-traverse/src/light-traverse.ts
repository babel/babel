import type * as t from "@babel/types";
import { VISITOR_KEYS } from "@babel/types";
import type NodePath from "./path/index.ts";
import { INSERTED, SHOULD_SKIP, SHOULD_STOP } from "./path/index.ts";
import TraversalContext, {
  createNodePath,
  type TraversalStack,
} from "./context.ts";
import { _call, resync, setScope } from "./path/context.ts";
import Hub from "./hub.ts";

export function lightTraverse(
  node: t.Node | null,
  ctx: TraversalContext<any>,
  parentPath?: NodePath,
  skipKeys?: string[],
) {
  if (!node) return;

  if (!parentPath && (node.type === "Program" || node.type === "File")) {
    ctx.hub ??= new Hub();
  }

  const rootStack = ctx.currentStack(parentPath);
  const rootPath = rootStack.path;
  rootStack.path = rootPath;

  const oldContext = rootPath.context;
  const oldVisitFrame = rootPath._visitFrame;
  const oldFlags = rootPath._traverseFlags;
  const oldSkipKeys = rootPath.skipKeys;

  ctx._depth = 1;
  ctx._parent = TraversalContext.current;
  TraversalContext.current = ctx;

  rootPath.context = ctx;
  rootPath.node = node;
  rootPath.skipKeys = skipKeys;
  rootPath._visitFrame = oldVisitFrame ?? rootStack;
  rootPath._traverseFlags = 0;

  try {
    if (node.type === "Program") setScope.call(rootPath);

    const keys = VISITOR_KEYS[node.type];
    if (!keys?.length) return;

    const childFrame = _pushFrame(ctx, rootPath);

    _traverseNode(ctx, childFrame, node, keys, skipKeys);

    _popFrame(ctx, childFrame);
  } finally {
    rootPath._visitFrame = oldVisitFrame;
    if (parentPath) {
      rootPath.context = oldContext;
      rootPath.skipKeys = oldSkipKeys;
      if (!rootPath.removed) rootPath._traverseFlags = oldFlags;
    }

    ctx._depth = 0;
    TraversalContext.current = ctx._parent;
    ctx._parent = undefined;
  }
}

function _pushFrame(ctx: TraversalContext, path: NodePath) {
  const stack = ctx.currentStack(path);
  stack.parentPath = path;
  stack.queueIndex = -1;
  ctx._depth++;
  return stack;
}

function _popFrame(ctx: TraversalContext, stack: TraversalStack) {
  ctx._depth--;
  if (stack.queue.length) stack.queue.length = 0;
  stack.priorityQueue = undefined;
}

function _traverseNode(
  ctx: TraversalContext,
  stack: TraversalStack,
  node: t.Node,
  keys: string[],
  skipKeys?: string[],
) {
  for (const key of keys) {
    if (skipKeys?.includes(key)) continue;

    // @ts-expect-error key must present in node
    const prop = node[key];
    if (prop == null) continue;

    if (Array.isArray(prop)) {
      stack.container = prop;
      for (stack.index = 0; stack.index < prop.length; stack.index++) {
        const child = prop[stack.index];
        if (child === null) continue;

        if (_traverseProp(ctx, stack, child, stack.index, key)) return true;
      }
    } else {
      stack.container = node;
      if (_traverseProp(ctx, stack, prop, key, null)) return true;
    }
  }
  return false;
}

function _traverseProp(
  ctx: TraversalContext,
  stack: TraversalStack,
  node: t.Node,
  key: string | number | null,
  listKey: string | null,
) {
  const path = createNodePath(
    ctx,
    stack.parentPath!,
    node,
    stack.container,
    key,
    listKey,
    false,
  );
  stack.path = path;

  if (
    listKey &&
    // @ts-expect-error listKey must be present in parent
    stack.parentPath!.node?.[listKey] !== path.container
  ) {
    resync.call(path);
    if (path.key === null) return false;
  }

  return _visitPath(ctx, path, stack);
}

function _visitPath(
  ctx: TraversalContext,
  path: NodePath,
  stack: TraversalStack,
) {
  const { opts, state } = ctx;

  const { context, skipKeys, _visitFrame, _traverseFlags } = path;

  if (
    _traverseFlags & INSERTED &&
    context === ctx &&
    _traverseFlags & SHOULD_SKIP
  ) {
    path._traverseFlags &= ~INSERTED;
    return (_traverseFlags & SHOULD_STOP) > 0;
  }

  const restoreContext = _visitFrame !== undefined && context !== ctx;

  path.context = ctx;
  path._visitFrame = stack;
  path._traverseFlags = 0;
  path.skipKeys = undefined;

  try {
    setScope.call(path);

    visit: {
      if (opts.shouldSkip?.(path)) break visit;

      if (_call.call(path, opts.enter, state)) break visit;
      if (path.node) {
        if (_call.call(path, opts[path.node.type]?.enter, state)) break visit;
      }

      const _node = path.node;

      if (_node == null) break visit;

      const keys = VISITOR_KEYS[_node.type];
      if (keys?.length) {
        const childFrame = _pushFrame(ctx, path);

        path.shouldStop = _traverseNode(
          ctx,
          childFrame,
          _node,
          keys,
          path.skipKeys,
        );

        _popFrame(ctx, childFrame);
      }

      if (path.node) {
        if (_call.call(path, opts[path.node.type]?.exit, state)) break visit;
      }
      if (path.node) {
        _call.call(path, opts.exit, state);
      }
    }
    if (path.shouldStop) return true;

    if (
      (stack.queue.length || stack.priorityQueue) &&
      (restoreContext || stack.queueIndex < 0)
    ) {
      return _visitQueue(ctx, stack);
    }

    return false;
  } finally {
    path._visitFrame = _visitFrame;

    if (restoreContext) {
      path.context = context;
      path.skipKeys = skipKeys;
      if (!path.removed) path._traverseFlags = _traverseFlags;
    }
  }
}

function _visitQueue(ctx: TraversalContext, stack: TraversalStack) {
  const ownsQueue = stack.queueIndex < 0;
  if (ownsQueue) stack.queueIndex = 0;
  try {
    while (true) {
      const priority = stack.priorityQueue;
      if (priority) {
        const oldQueue = stack.queue;
        const oldIndex = stack.queueIndex;

        stack.queue = priority;
        stack.queueIndex = -1;
        stack.priorityQueue = undefined;

        const shouldStop = _visitQueue(ctx, stack);

        stack.queue = oldQueue;
        stack.queueIndex = oldIndex;

        if (shouldStop) return true;
        continue;
      }
      if (stack.queueIndex >= stack.queue.length) break;

      const item = stack.queue[stack.queueIndex++];
      const { parent, container, listKey, key, node } = item;
      if (!node || item.removed) continue;

      if (
        // @ts-expect-error listKey must be present in parent
        (listKey && parent && parent[listKey] !== container) ||
        // @ts-expect-error key must be present in container
        (container && container[key] !== node)
      ) {
        resync.call(item);
      }
      if (item.key === null) continue;

      if (item.context === ctx && item.shouldSkip) {
        item._traverseFlags &= ~INSERTED;
        if (item.shouldStop) return true;
      } else if (_visitPath(ctx, item, stack)) return true;
    }
    return false;
  } finally {
    if (ownsQueue) {
      if (stack.queue.length) stack.queue.length = 0;
      stack.queueIndex = -1;
      stack.priorityQueue = undefined;
    }
  }
}
