import inherit from "../utils/inherit";

export default function inheritTrailingComments(child: any, parent: any): void {
  inherit("trailingComments", child, parent);
}
