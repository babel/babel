import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

export var BlockStatement = {
  exit(node) {
    for (var i = 0; i < node.body.length; i++) {
      var bodyNode = node.body[i];
      if (t.isExpressionStatement(bodyNode) && t.isLiteral(bodyNode.expression)) {
        bodyNode._blockHoist = Infinity;
      } else {
        return;
      }
    }
  }
};

export { BlockStatement as Program };
