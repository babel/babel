// @flow
import inheritTrailingComments from "./inheritTrailingComments";
import inheritLeadingComments from "./inheritLeadingComments";
import inheritInnerComments from "./inheritInnerComments";

/**
 * Inherit all unique comments from `parent` node to `child` node.
 */
export default function inheritsComments<T: Object>(
  child: T,
  parent: Object,
): T {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);

  return child;
}
