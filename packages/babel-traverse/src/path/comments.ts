// This file contains methods responsible for dealing with comments.
import type * as t from "@babel/types";
import type NodePath from "./index.ts";
import {
  addComment as _addComment,
  addComments as _addComments,
} from "@babel/types";

/**
 * Share comments amongst siblings.
 */

export function shareCommentsWithSiblings(this: NodePath) {
  // NOTE: this assumes numbered keys
  if (typeof this.key === "string") return;

  const node = this.node;
  if (!node) return;

  const trailing = node.trailingComments;
  const leading = node.leadingComments;
  if (!trailing && !leading) return;

  const prev = this.getSibling(this.key! - 1);
  const next = this.getSibling(this.key! + 1);
  const hasPrev = Boolean(prev.node);
  const hasNext = Boolean(next.node);

  if (hasPrev) {
    if (leading) {
      prev.addComments(
        "trailing",
        removeIfExisting(leading, prev.node.trailingComments),
      );
    }
    if (trailing && !hasNext) prev.addComments("trailing", trailing);
  }
  if (hasNext) {
    if (trailing) {
      next.addComments(
        "leading",
        removeIfExisting(trailing, next.node.leadingComments),
      );
    }
    if (leading && !hasPrev) next.addComments("leading", leading);
  }
}

function removeIfExisting<T>(list: T[], toRemove?: T[] | null): T[] {
  if (!toRemove?.length) return list;
  const set = new Set(toRemove);
  return list.filter(el => {
    return !set.has(el);
  });
}

export function addComment(
  this: NodePath,
  type: t.CommentTypeShorthand,
  content: string,
  line?: boolean,
) {
  _addComment(this.node, type, content, line);
}

/**
 * Give node `comments` of the specified `type`.
 */

export function addComments(
  this: NodePath,
  type: t.CommentTypeShorthand,
  comments: t.Comment[],
) {
  _addComments(this.node, type, comments);
}
