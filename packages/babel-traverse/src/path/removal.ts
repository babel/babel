// This file contains methods responsible for removing a node.

import { hooks } from "./lib/removal-hooks";
import { path as pathCache } from "../cache";
import NodePath, { REMOVED, SHOULD_SKIP } from "./index";

export function remove(this: NodePath) {
  this._assertUnremoved();

  this.resync();
  if (!this.opts?.noScope) {
    this._removeFromScope();
  }

  if (this._callRemovalHooks()) {
    this._markRemoved();
    return;
  }

  this.shareCommentsWithSiblings();
  this._remove();
  this._markRemoved();
}

export function _removeFromScope(this: NodePath) {
  const allBindings = [];

  let scope = this.scope;
  do {
    for (const name of Object.keys(scope.bindings)) {
      const binding = this.scope.getBinding(name);
      if (binding != undefined) {
        allBindings.push(binding);
      }
    }
  } while ((scope = scope.parent));

  scope = this.scope;

  function enter(p: NodePath) {
    allBindings.forEach(binding => {
      if (binding.identifier == p.node) {
        scope.removeBinding(binding.identifier.name);
      }
      let i;
      i = binding.constantViolations.indexOf(p);
      if (i != -1) {
        binding.constantViolations.splice(i, 1);
        binding.constant = binding.constantViolations.length == 0;
      }
      i = binding.referencePaths.indexOf(p);
      if (i != -1) {
        binding.referencePaths.splice(i, 1);
        binding.references = binding.referencePaths.length;
        binding.referenced = binding.referencePaths.length != 0;
      }
    });
  }

  enter(this);

  this.traverse({
    enter: enter,
  });
}

export function _callRemovalHooks(this: NodePath) {
  for (const fn of hooks) {
    if (fn(this, this.parentPath)) return true;
  }
}

export function _remove(this: NodePath) {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key as number, 1);
    this.updateSiblingKeys(this.key as number, -1);
  } else {
    this._replaceWith(null);
  }
}

export function _markRemoved(this: NodePath) {
  // this.shouldSkip = true; this.removed = true;
  this._traverseFlags |= SHOULD_SKIP | REMOVED;
  if (this.parent) pathCache.get(this.parent).delete(this.node);
  this.node = null;
}

export function _assertUnremoved(this: NodePath) {
  if (this.removed) {
    throw this.buildCodeFrameError(
      "NodePath has been removed so is read-only.",
    );
  }
}
