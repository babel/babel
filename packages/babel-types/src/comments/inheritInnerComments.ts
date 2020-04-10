import inherit from "../utils/inherit";
import type * as types from "../types";

export default function inheritInnerComments(
  child: types.Node,
  parent: types.Node,
): void {
  inherit("innerComments", child, parent);
}
