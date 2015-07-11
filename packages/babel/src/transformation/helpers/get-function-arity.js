import * as t from "../../types";

export default function (node) {
  var lastNonDefault = 0;
  for (var i = 0; i < node.params.length; i++) {
    var param = node.params[i];
    if (!t.isAssignmentPattern(param) && !t.isRestElement(param)) {
      lastNonDefault = i + 1;
    }
  }
  return lastNonDefault;
}
