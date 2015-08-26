import * as t from "babel-types";

/**
 * [Please add a description.]
 */

export default function (node) {
  for (var i = 0; i < node.params.length; i++) {
    var param = node.params[i];
    if (t.isAssignmentPattern(param) || t.isRestElement(param)) {
      return i;
    }
  }
  return node.params.length;
}
