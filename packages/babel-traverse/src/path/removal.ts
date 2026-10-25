// This file contains methods responsible for removing a node.

import { hooks } from "./lib/removal-hooks.ts";
import { _replaceWith } from "./replacement.ts";
import type NodePath from "./index.ts";
import { REMOVED, SHOULD_SKIP } from "./index.ts";
import * as t from "@babel/types";
import { updateSiblingKeys } from "./modification.ts";
import { resync } from "./context.ts";
import { uncacheNodePath } from "../cache.ts";
import TraversalContext from "../context.ts";

export function remove(this: NodePath<t.Node | null>) {
  _assertUnremoved.call(this);

  resync.call(this);

  const handledByHook =
    this.parentPath &&
    hooks.some(fn => fn(this as NodePath<t.Node>, this.parentPath));

  if (!handledByHook) {
    if (this.node && !this.opts?.noScope) {
      // Remove scope information relative to this node
      const bindings = t.getBindingIdentifiers(this.node, false, false, true);
      Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
    }

    this.shareCommentsWithSiblings();

    if (Array.isArray(this.container)) {
      const index = this.key as number;
      this.container.splice(index, 1);
      updateSiblingKeys.call(this, index + 1, -1);

      for (let ctx = TraversalContext.current; ctx; ctx = ctx._parent) {
        for (let i = ctx._depth - 1; i > 0; i--) {
          const frame = ctx._stacks[i];
          if (frame.container === this.container && frame.index >= index) {
            frame.index--;
          }
        }
      }
    } else {
      _replaceWith.call(this, null);
    }
  }

  // Mark the path as removed.
  this._traverseFlags |= SHOULD_SKIP | REMOVED;
  uncacheNodePath(this);
  this.node = null;
}

export function _assertUnremoved(this: NodePath<t.Node | null>) {
  if (this.removed) {
    throw this.buildCodeFrameError(
      "NodePath has been removed so is read-only.",
    );
  }
}
