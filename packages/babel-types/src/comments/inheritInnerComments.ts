// @flow
import inherit from "../utils/inherit";

export default function inheritInnerComments(
  child: Object,
  parent: Object,
): void {
  inherit("innerComments", child, parent);
}
