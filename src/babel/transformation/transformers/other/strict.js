import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
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
  if (!this.findParent((path) => !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0)) {
    return t.identifier("undefined");
  }
}
