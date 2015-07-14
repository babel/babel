import * as removalHooks from "./lib/removal-hooks";

/**
 * Deprecated in favor of `dangerouslyRemove` as it's far more scary and more accurately portrays
 * the risk.
 */

export function remove() {
  console.trace("Path#remove has been renamed to Path#dangerouslyRemove, removing a node is extremely dangerous so please refrain using it.");
  return this.dangerouslyRemove();
}

/**
 * Dangerously remove the current node. This may sometimes result in a tainted
 * invalid AST so use with caution.
 */

export function dangerouslyRemove() {
  this._assertUnremoved();

  this.resync();

  if (this._callRemovalHooks("pre")) {
    this._markRemoved();
    return;
  }

  this.shareCommentsWithSiblings();
  this._remove();
  this._markRemoved();

  this._callRemovalHooks("post");
}

/**
 * [Please add a description.]
 */

export function _callRemovalHooks(position) {
  for (var fn of (removalHooks[position]: Array)) {
    if (fn(this, this.parentPath)) return true;
  }
}

/**
 * [Please add a description.]
 */

export function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this.container[this.key] = null;
  }
}

/**
 * [Please add a description.]
 */

export function _markRemoved() {
  this.shouldSkip = true;
  this.removed    = true;
  this.node       = null;
}

/**
 * [Please add a description.]
 */

export function _assertUnremoved() {
  if (this.removed) {
    throw this.errorWithNode("NodePath has been removed so is read-only.");
  }
}
