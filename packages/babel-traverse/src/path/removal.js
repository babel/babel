// This file contains methods responsible for removing a node.

import { hooks } from "./lib/removal-hooks";

export function remove() {
  this._assertUnremoved();

  this.resync();
  this._removeFromScope();

  if (this._callRemovalHooks()) {
    this._markRemoved();
    return;
  }

  moveCommentsToSiblings(this);
  this._remove();
  this._markRemoved();
}

export function _removeFromScope() {
  const bindings = this.getBindingIdentifiers();
  Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
}

export function _callRemovalHooks() {
  for (const fn of (hooks: Array<Function>)) {
    if (fn(this, this.parentPath)) return true;
  }
}

export function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this._replaceWith(null);
  }
}

export function _markRemoved() {
  this.shouldSkip = true;
  this.removed = true;
  this.node = null;
}

export function _assertUnremoved() {
  if (this.removed) {
    throw this.buildCodeFrameError(
      "NodePath has been removed so is read-only.",
    );
  }
}

function moveCommentsToSiblings(path) {
  // NOTE: this assumes numbered keys
  if (typeof path.key === "string") return;

  const node = path.node;
  if (!node) return;

  const trailing = node.trailingComments;
  const leading = node.leadingComments;
  if (!trailing && !leading) return;

  const comments = [].concat(leading || [], trailing || []);

  const prev = path.getSibling(path.key - 1);
  const next = path.getSibling(path.key + 1);
  const hasPrev = Boolean(prev.node);
  const hasNext = Boolean(next.node);

  if (hasNext) {
    next.addComments("leading", comments);
  } else if (hasPrev) {
    prev.addComments("trailing", comments);
  }
}
