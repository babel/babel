import type * as t from "../index.ts";

/**
 * Add comments of certain type to a node.
 */
export default function addComments<T extends t.Node>(
  node: T,
  type: t.CommentTypeShorthand,
  comments: Array<t.Comment>,
): T {
  if (!comments || !node) return node;

  const key = `${type}Comments` as const;

  if (node[key]) {
    if (type === "leading") {
      node[key] = comments.concat(node[key]);
    } else {
      node[key].push(...comments);
    }
  } else {
    node[key] = comments;
  }

  return node;
}
