import inherit from "../utils/inherit";
import type * as t from "../types";

export default function inheritInnerComments(
  child: t.Node,
  parent: t.Node,
): void {
  inherit("innerComments", child, parent);
}
