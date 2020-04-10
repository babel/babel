import inherit from "../utils/inherit";
import type * as types from "../types";

export default function inheritTrailingComments(
  child: types.Node,
  parent: types.Node,
): void {
  inherit("trailingComments", child, parent);
}
