import type * as t from "..";

/**
 * Add comments of certain type to a node.
 */
export default function addComments<T extends t.Node>(
  node: T,
  type: t.CommentTypeShorthand,
  comments: ReadonlyArray<t.Comment>,
): T {
  if (!comments || !node) return node;

  const key = `${type}Comments`;

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
