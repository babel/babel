// This file contains methods responsible for maintaining a TraversalContext.

import { SHOULD_SKIP, SHOULD_STOP } from "./index.ts";
import type NodePath from "./index.ts";
import * as t from "@babel/types";
import Scope from "../scope/index.ts";

export function _call(
  this: NodePath,
  fns: Function[] | undefined,
  state: any,
): boolean {
  if (!fns) return false;

  for (const fn of fns) {
    if (!fn) continue;

    const node = this.node;
    if (!node) return true;

    const ret = fn.call(state, this, state);
    if (ret && typeof ret === "object" && typeof ret.then === "function") {
      throw new Error(
        `You appear to be using a plugin with an async traversal visitor, ` +
          `which your current version of Babel does not support. ` +
          `If you're using a published plugin, you may need to upgrade ` +
          `your @babel/core version.`,
      );
    }
    if (ret) {
      throw new Error(`Unexpected return value from visitor method ${fn}`);
    }

    // node has been replaced, it will have been requeued
    if (this.node !== node) return true;

    // this.shouldSkip || this.shouldStop || this.removed
    if (this._traverseFlags > 0) return true;
  }

  return false;
}

export function isDenylisted(this: NodePath): boolean {
  return !!this.opts.denylist?.includes(this.node.type);
}

export function skip(this: NodePath) {
  this.shouldSkip = true;
}

export function skipKey(this: NodePath, key: string) {
  (this.skipKeys ??= []).push(key);
}

export function stop(this: NodePath) {
  // this.shouldSkip = true; this.shouldStop = true;
  this._traverseFlags |= SHOULD_SKIP | SHOULD_STOP;
}

export function setScope(this: NodePath) {
  const ctx = this.context;
  if (ctx.opts.noScope) return;

  const isScope = this.isScope();
  if (isScope && this.scope?.block === this.node) {
    this.scope.init();
    return this.scope;
  }

  const target = getScopeParent.call(this);

  if (isScope) {
    const scope = new Scope(this, target);
    this.scope = scope;
    this.scope.init();
    return scope;
  }
  this.scope = target!;
}

export function getScopeParent(this: NodePath): Scope | undefined {
  let path = this.parentPath;

  if (
    // Skip method scope if is computed method key or decorator expression
    ((this.key === "key" || this.listKey === "decorators") &&
      path.isMethod()) ||
    // Skip switch scope if for discriminant (`x` in `switch (x) {}`).
    (this.key === "discriminant" && path.isSwitchStatement())
  ) {
    path = path.parentPath;
  }

  let target;
  while (path && !target) {
    target = path.scope;
    path = path.parentPath;
  }

  return target;
}

/**
 * Here we resync the node paths `key` and `container`. If they've changed according
 * to what we have stored internally then we attempt to resync by crawling and looking
 * for the new values.
 */

export function resync(this: NodePath<t.Node | null>) {
  if (this.removed) return;

  if (this.parent && this.inList) {
    // @ts-expect-error this.listKey should present in this.parent
    const newContainer = this.parent[this.listKey] as t.Node;
    if (this.container !== newContainer) {
      // container is out of sync. this is likely the result of it being reassigned
      this.container = newContainer || null;
    }
  }

  if (
    this.container &&
    this.node !== this.container[this.key as keyof typeof this.container]
  ) {
    // grrr, path key is out of sync. this is likely due to a modification to the AST
    // not done through our path APIs

    let key: string | number = -1;
    if (Array.isArray(this.container)) {
      key = this.container.indexOf(this.node!);
    } else {
      for (const candidate of Object.keys(this.container)) {
        if (
          this.container[candidate as keyof typeof this.container] === this.node
        ) {
          key = candidate;
          break;
        }
      }
    }
    if (key === -1) {
      // ¯\_(ツ)_/¯ who knows where it's gone lol
      this.key = null;
    } else {
      _setKey.call(this, key);
    }
  }
}

export function setup(
  this: NodePath,
  parentPath: NodePath | undefined | null,
  container: t.Node | t.Node[],
  listKey: string | null,
  key: string | number,
) {
  this.listKey = listKey;
  this.container = container;

  this.parentPath = parentPath || this.parentPath;
  _setKey.call(this, key);
}

function _setKey(this: NodePath<t.Node | null>, key: string | number) {
  this.key = key;
  this.node =
    // @ts-expect-error this.key must present in this.container
    this.container[this.key];
}

export function requeue(
  this: NodePath<t.Node | null>,
  target: NodePath<t.Node | null> = this,
) {
  if (target.removed || !target.node) return;
  target.shouldSkip = false;

  const frame = this._visitFrame;
  if (frame?.parentPath) {
    (frame.priorityQueue ??= []).push(target);
  }
}

export function requeueComputedKeyAndDecorators(
  this: NodePath<t.Method | t.Property>,
) {
  const { node } = this;
  const queue = this._visitFrame!.queue;
  if (!t.isPrivate(node) && node.computed) {
    queue.push(this.get("key"));
  }
  if (node.decorators) {
    for (const decorator of this.get("decorators")) {
      queue.push(decorator);
    }
  }
}
