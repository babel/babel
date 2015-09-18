import * as t from "babel-types";

export default function (node) {
  for (let i = 0; i < node.params.length; i++) {
    let param = node.params[i];
    if (t.isAssignmentPattern(param) || t.isRestElement(param)) {
      return i;
    }
  }
  return node.params.length;
}
