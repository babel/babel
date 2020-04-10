import type * as types from "../types";

/**
 * Add comments of certain type to a node.
 */
export default function addComments<T extends types.Node>(
  node: T,
  type: types.CommentTypeShorthand,
  comments: ReadonlyArray<types.Comment>,
): T {
  if (!comments || !node) return node;

  const key = `${type}Comments`;

  if (node[key]) {
    if (type === "leading") {
      node[key] = comments.concat(node[key]);
    } else {
      node[key] = node[key].concat(comments);
    }
  } else {
    node[key] = comments;
  }

  return node;
}
