import * as t from "../../../types";

export var metadata = {
  group: "builtin-pre"
};

const BINARY_COMPARISON_OPERATORS = ["!=", "==", "!==", "==="];

export function UnaryExpression(node, parent, scope, file) {
  if (node._ignoreSpecSymbols || node.operator !== "typeof") return;

  if (t.isBinaryExpression(parent) && BINARY_COMPARISON_OPERATORS.indexOf(parent.operator) >= 0 && t.isLiteral(parent.right)) {
    // don't touch binary comparisons with a string that doesn't equal symbol, we can statically determine
    // that this condition will never be met which means faster code!
    if (parent.right.value !== "symbol") return;
  }


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

export function BinaryExpression(node, parent, scope, file) {
  if (node.operator === "instanceof") {
    return t.callExpression(file.addHelper("instanceof"), [node.left, node.right]);
  }
}

export function VariableDeclaration(node) {
  if (node._generated) this.skip();
}

export { VariableDeclaration as FunctionDeclaration };
