import inherit from "../utils/inherit";
import type * as t from "..";

export default function inheritLeadingComments(
  child: t.Node,
  parent: t.Node,
): void {
  inherit("leadingComments", child, parent);
}
