import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function TemplateLiteral(node, parent, scope, file) {
  for (var i = 0; i < node.expressions.length; i++) {
    node.expressions[i] = t.callExpression(t.identifier("String"), [node.expressions[i]]);
  }
}
