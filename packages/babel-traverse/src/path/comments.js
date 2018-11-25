// This file contains methods responsible for dealing with comments.
import * as t from "@babel/types";

/**
 * Share comments amongst siblings.
 */

/**
 * TODO(logan): Deprecated. Remove in Babel 8.x. I don't even really know
 * what this function is supposed to do, but it doesn't seems to make
 * a lot of sense as is. It used to be used as part of path removal,
 * but in that usecase it was weird anyway.
 */
export function shareCommentsWithSiblings() {
  // NOTE: this assumes numbered keys
  if (typeof this.key === "string") return;

  const node = this.node;
  if (!node) return;

  const trailing = node.trailingComments;
  const leading = node.leadingComments;
  if (!trailing && !leading) return;

  const prev = this.getSibling(this.key - 1);
  const next = this.getSibling(this.key + 1);
  const hasPrev = Boolean(prev.node);
  const hasNext = Boolean(next.node);
  if (hasPrev && hasNext) {
  } else if (hasPrev) {
    prev.addComments("trailing", trailing);
  } else if (hasNext) {
    next.addComments("leading", leading);
  }
}

export function addComment(type: string, content: string, line?: boolean) {
  t.addComment(this.node, type, content, line);
}

/**
 * Give node `comments` of the specified `type`.
 */

export function addComments(type: string, comments: Array) {
  t.addComments(this.node, type, comments);
}
