import inherit from "../utils/inherit";

export default function inheritInnerComments(child: any, parent: any): void {
  inherit("innerComments", child, parent);
}
