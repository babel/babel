import * as t from "../../../types";

export var visitor = {
  ArrowFunctionExpression(node) {
    t.ensureBlock(node);

    node.expression = false;
    node.type = "FunctionExpression";
    node.shadow = true;
  }
};
