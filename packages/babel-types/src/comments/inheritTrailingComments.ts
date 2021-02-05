import inherit from "../utils/inherit";
import type * as t from "..";

export default function inheritTrailingComments(
  child: t.Node,
  parent: t.Node,
): void {
  inherit("trailingComments", child, parent);
}
