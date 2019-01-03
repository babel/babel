// @flow
import inherit from "../utils/inherit";

export default function inheritLeadingComments(
  child: ?Object,
  parent: ?Object,
): void {
  inherit("leadingComments", child, parent);
}
