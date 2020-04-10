import inherit from "../utils/inherit";
import type * as types from "../types";

export default function inheritLeadingComments(
  child: types.Node,
  parent: types.Node,
): void {
  inherit("leadingComments", child, parent);
}
