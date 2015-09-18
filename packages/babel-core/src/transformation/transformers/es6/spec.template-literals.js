import * as t from "babel-types";

export let metadata = {
  optional: true,
  group: "builtin-pre"
};

export let visitor = {
  TemplateLiteral(node, parent) {
    if (t.isTaggedTemplateExpression(parent)) return;

    for (let i = 0; i < node.expressions.length; i++) {
      node.expressions[i] = t.callExpression(t.identifier("String"), [node.expressions[i]]);
    }
  }
};
