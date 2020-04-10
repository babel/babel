import addComments from "./addComments";
import type * as types from "../types";

/**
 * Add comment of certain type to a node.
 */
export default function addComment<T extends types.Node>(
  node: T,
  type: types.CommentTypeShorthand,
  content: string,
  line?: boolean,
): T {
  return addComments(node, type, [
    {
      type: line ? "CommentLine" : "CommentBlock",
      value: content,
    } as types.Comment,
  ]);
}
