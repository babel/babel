// This file contains methods responsible for dealing with comments.

/**
 * Share comments amongst siblings.
 */

export function shareCommentsWithSiblings() {
  // NOTE: this assumes numbered keys
  if (typeof this.key === "string") return;

  let node = this.node;
  if (!node) return;

  let trailing = node.trailingComments;
  let leading  = node.leadingComments;
  if (!trailing && !leading) return;

  let prev = this.getSibling(this.key - 1);
  let next = this.getSibling(this.key + 1);

  if (!prev.node) prev = next;
  if (!next.node) next = prev;

  prev.addComments("trailing", leading);
  next.addComments("leading", trailing);
}

export function addComment(type, content, line?) {
  this.addComments(type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content
  }]);
}

/**
 * Give node `comments` of the specified `type`.
 */

export function addComments(type: string, comments: Array) {
  if (!comments) return;

  let node = this.node;
  if (!node) return;

  let key = `${type}Comments`;

  if (node[key]) {
    node[key] = node[key].concat(comments);
  } else {
    node[key] = comments;
  }
}
