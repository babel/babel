// @flow
import inherit from "../utils/inherit";

export default function inheritTrailingComments(
  child: Object,
  parent: Object,
): void {
  inherit("trailingComments", child, parent);
}
