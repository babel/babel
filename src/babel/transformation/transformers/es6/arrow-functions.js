import * as t from "../../../types";

export var visitor = {
  ArrowFunctionExpression(node) {
    this.ensureBlock();

    node.expression = false;
    node.type = "FunctionExpression";
    node.shadow = true;
  }
};
