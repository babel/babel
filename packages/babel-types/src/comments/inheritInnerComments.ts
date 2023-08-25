import inherit from "../utils/inherit.ts";
import type * as t from "../index.ts";

export default function inheritInnerComments(
  child: t.Node,
  parent: t.Node,
): void {
  inherit("innerComments", child, parent);
}
