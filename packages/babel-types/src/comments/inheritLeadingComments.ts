import inherit from "../utils/inherit.ts";
import type * as t from "../index.ts";

export default function inheritLeadingComments(
  child: t.Node | null,
  parent: t.Node | null,
): void {
  inherit("leadingComments", child, parent);
}
