import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function FunctionExpression(node, print) {
  if (!node.id) return;
  node._ignoreUserWhitespace = true;

  return t.callExpression(
    t.functionExpression(null, [], t.blockStatement([
      t.toStatement(node),
      t.returnStatement(node.id)
    ])),
    []
  );
}
