import inherit from "../utils/inherit.ts";
import type * as t from "../index.ts";

export default function inheritTrailingComments(
  child: t.Node,
  parent: t.Node,
): void {
  inherit("trailingComments", child, parent);
}
