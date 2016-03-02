import * as t from "babel-types";

export default function (node) {
  let params = node.params;
  for (let i = 0; i < params.length; i++) {
    let param = params[i];
    if (t.isAssignmentPattern(param) || t.isRestElement(param)) {
      return i;
    }
  }
  return params.length;
}
