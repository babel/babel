import inheritTrailingComments from "./inheritTrailingComments";
import inheritLeadingComments from "./inheritLeadingComments";
import inheritInnerComments from "./inheritInnerComments";
import type * as t from "..";

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */
export default function inheritsComments<T extends t.Node>(
  child: T,
  parent: t.Node,
): T {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);

  return child;
}
