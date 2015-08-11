import * as t from "babel-types";

export var metadata = {
  group: "builtin-pre"
};

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  Block: {
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
  }
};
