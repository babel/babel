import * as t from "../../types";

export default function (node) {
  var container = t.functionExpression(null, [], node.body, node.generator, node.async);
  container.shadow = true;

  var call = t.callExpression(container, []);
  if (node.generator) call = t.yieldExpression(call, true);

  return t.returnStatement(call);
}
