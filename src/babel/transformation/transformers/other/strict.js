import * as t from "../../../types";

export var metadata = {
  group: "builtin-setup"
};

const THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassExpression", "ClassDeclaration"];

export var Program = {
  enter(program) {
    var first = program.body[0];

    var directive;
    if (t.isExpressionStatement(first) && t.isLiteral(first.expression, { value: "use strict" })) {
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
};

export function ThisExpression() {
  if (!this.findParent((node) => !node.shadow && THIS_BREAK_KEYS.indexOf(node.type) >= 0)) {
    return t.identifier("undefined");
  }
}
