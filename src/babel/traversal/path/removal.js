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
 * Description
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
  this.shouldSkip = true;
  this.removed    = true;
  this.node       = null;
}

export function _assertUnremoved() {
  if (this.removed) {
    throw this.errorWithNode("NodePath has been removed so is read-only.");
  }
}

/**
 * Description
 */

export function addComment(type, content) {
  var node = this.node;
  var key = `${type}Comments`;
  var comments = node[key] = node[key] || [];
  comments.push({
    type: "CommentBlock",
    value: content
  });
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
