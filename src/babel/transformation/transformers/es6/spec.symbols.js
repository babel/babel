import * as t from "../../../types";

export var metadata = {
  optional: true
};

export function UnaryExpression(node, parent, scope, file) {
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
}

export function BinaryExpression(node, parent, scope, file) {
  if (node.operator === "instanceof") {
    return t.callExpression(file.addHelper("instanceof"), [node.left, node.right]);
  }
}

export function VariableDeclaration(node) {
  if (node._generated) this.skip();
}

export { VariableDeclaration as FunctionDeclaration };
