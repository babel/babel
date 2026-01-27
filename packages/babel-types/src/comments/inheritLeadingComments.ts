import inherit from "../utils/inherit.ts";
import type * as t from "../index.ts";

export default function inheritLeadingComments(
  child: t.Node | null,
  parent: t.Node | null,
): void {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  inherit("leadingComments", child!, parent!);
}
