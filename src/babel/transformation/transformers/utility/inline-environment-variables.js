import * as t from "../../../types";

export var optional = true;

var match = t.buildMatchMemberExpression("process.env");

export function MemberExpression(node) {
  if (match(node.object)) {
    var key = t.toComputedKey(node, node.property);
    if (t.isLiteral(key)) {
      return t.valueToNode(process.env[key.value]);
    }
  }
}
