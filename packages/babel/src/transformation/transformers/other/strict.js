import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

const THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty"];

function isUseStrict(node) {
  if (!t.isLiteral(node)) return false;

  if (node.raw && node.rawValue === node.value) {
    return node.rawValue === "use strict";
  } else {
    return node.value === "use strict";
  }
}

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  Program: {
    enter(program) {
      var first = program.body[0];

      var directive;
      if (t.isExpressionStatement(first) && isUseStrict(first.expression)) {
        directive = first;
      } else {
        directive = t.expressionStatement(t.literal("use strict"));
        this.unshiftContainer("body", directive);
        if (first) {
          directive.leadingComments = first.leadingComments;
          first.leadingComments = [];
        }
      }
      directive._blockHoist = Infinity;
    }
  },

  /**
   * [Please add a description.]
   */

  ThisExpression() {
    if (!this.findParent((path) => !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0)) {
      return t.identifier("undefined");
    }
  }
};
