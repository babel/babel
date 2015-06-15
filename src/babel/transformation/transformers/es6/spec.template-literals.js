import * as t from "../../../types";

export var metadata = {
  optional: true,
  group: "builtin-pre"
};

export var visitor = {
  TemplateLiteral(node, parent) {
    if (t.isTaggedTemplateExpression(parent)) return;

    for (var i = 0; i < node.expressions.length; i++) {
      node.expressions[i] = t.callExpression(t.identifier("String"), [node.expressions[i]]);
    }
  }
};
