import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-pre"
};

var match = t.buildMatchMemberExpression("process.env");

export function MemberExpression(node) {
  if (match(node.object)) {
    var key = this.toComputedKey();
    if (t.isLiteral(key)) {
      return t.valueToNode(process.env[key.value]);
    }
  }
}
