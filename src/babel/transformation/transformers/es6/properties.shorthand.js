import clone from "lodash/lang/clone";
import t from "../../../types";

export function check(node) {
  return t.isProperty(node) && (node.method || node.shorthand);
}

export function Property(node) {
  if (node.method) {
    node.method = false;
  }

  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(clone(node.key));
  }
}
