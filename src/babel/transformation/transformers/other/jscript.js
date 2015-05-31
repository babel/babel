import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing",
  optional: true
};

export var FunctionExpression = {
  exit(node) {
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
};
