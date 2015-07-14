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

  prev.addComments("trailing", leading);
  next.addComments("leading", trailing);
}

/**
 * [Please add a description.]
 */

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

  var node = this.node;
  if (!node) return;

  var key = `${type}Comments`;

  if (node[key]) {
    node[key] = node[key].concat(comments);
  } else {
    node[key] = comments;
  }
}
