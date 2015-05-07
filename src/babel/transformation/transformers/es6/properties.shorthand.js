import * as t from "../../../types";

export function Property(node) {
  if (node.method) {
    node.method = false;
  }

  if (node.shorthand) {
    node.shorthand = false;
    node.key = t.removeComments(t.clone(node.key));
  }
}
