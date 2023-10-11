import inheritTrailingComments from "./inheritTrailingComments.ts";
import inheritLeadingComments from "./inheritLeadingComments.ts";
import inheritInnerComments from "./inheritInnerComments.ts";
import type * as t from "../index.ts";

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
