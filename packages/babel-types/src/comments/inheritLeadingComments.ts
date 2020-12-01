import inherit from "../utils/inherit";

export default function inheritLeadingComments(child: any, parent: any): void {
  inherit("leadingComments", child, parent);
}
