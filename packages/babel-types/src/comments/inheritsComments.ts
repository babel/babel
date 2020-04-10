import inheritTrailingComments from "./inheritTrailingComments";
import inheritLeadingComments from "./inheritLeadingComments";
import inheritInnerComments from "./inheritInnerComments";
import type * as types from "../types";

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */
export default function inheritsComments<T extends types.Node>(
  child: T,
  parent: types.Node,
): T {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);

  return child;
}
