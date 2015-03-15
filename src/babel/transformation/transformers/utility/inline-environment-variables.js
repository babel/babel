import * as t from "../../../types";

export var optional = true;

var match = t.buildMatchMemberExpression("process.env");

export function MemberExpression(node) {
  if (match(node.object)) {
    var key = this.toComputedKey();
    if (t.isLiteral(key)) {
      return t.valueToNode(process.env[key.value]);
    }
  }
}
