import inherit from "../utils/inherit.ts";
import type * as t from "../index.ts";

export default function inheritTrailingComments(
  child: t.Node,
  parent: t.Node,
): void {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  inherit("trailingComments", child!, parent!);
}
