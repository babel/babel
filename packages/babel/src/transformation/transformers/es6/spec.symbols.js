import * as t from "../../../types";

export var metadata = {
  optional: true
};

export var visitor = {
  UnaryExpression(node, parent, scope, file) {
    if (node._ignoreSpecSymbols) return;

    if (node.operator === "typeof") {
      var call = t.callExpression(file.addHelper("typeof"), [node.argument]);
      if (this.get("argument").isIdentifier()) {
        var undefLiteral = t.literal("undefined");
        var unary = t.unaryExpression("typeof", node.argument);
        unary._ignoreSpecSymbols = true;
        return t.conditionalExpression(
          t.binaryExpression("===", unary, undefLiteral),
          undefLiteral,
          call
        );
      } else {
        return call;
      }
    }
  },

  BinaryExpression(node, parent, scope, file) {
    if (node.operator === "instanceof") {
      return t.callExpression(file.addHelper("instanceof"), [node.left, node.right]);
    }
  },

  "VariableDeclaration|FunctionDeclaration"(node) {
    if (node._generated) this.skip();
  }
};
