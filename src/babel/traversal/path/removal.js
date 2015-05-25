import * as removalHooks from "./lib/removal-hooks";

/**
 * Description
 */

export function remove() {
  console.trace("Path#remove has been renamed to Path#dangerouslyRemove, removing a node is extremely dangerous so please refrain using it.");
  return this.dangerouslyRemove();
}

/**
 * Description
 */

export function dangerouslyRemove() {
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

export function _callRemovalHooks(position) {
  for (var fn of (removalHooks[position]: Array)) {
    if (fn(this, this.parentPath)) return true;
  }
}

export function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this.container[this.key] = null;
  }
}

export function _markRemoved() {
  this.node = null;
  this.removed = true;
}

/**
 * Share comments amongst siblings.
 */

export function shareCommentsWithSiblings() {
  var node = this.node;
  if (!node) return;

  var trailing = node.trailingComments;
  var leading  = node.leadingComments;
  if (!trailing && !leading) return;

  var prev = this.getSibling(this.key - 1);
  var next = this.getSibling(this.key + 1);

  if (!prev.node) prev = next;
  if (!next.node) next = prev;

  prev.giveComments("trailing", leading);
  next.giveComments("leading", trailing);
}

/**
 * Give node `comments` of the specified `type`.
 */

export function giveComments(type: string, comments: Array) {
  if (!comments) return;

  var node = this.node;
  if (!node) return;

  var key = `${type}Comments`;

  if (node[key]) {
    node[key] = node[key].concat(comments);
  } else {
    node[key] = comments;
  }
}
