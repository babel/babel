import * as t from "babel-types";

export let metadata = {
  group: "builtin-pre"
};

export let visitor = {
  Block: {
    exit(node) {
      for (let i = 0; i < node.body.length; i++) {
        let bodyNode = node.body[i];
        if (t.isExpressionStatement(bodyNode) && t.isLiteral(bodyNode.expression)) {
          bodyNode._blockHoist = Infinity;
        } else {
          return;
        }
      }
    }
  }
};
