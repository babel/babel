import t from "../../../types";

export var optional = true;

export function UnaryExpression(node, parent, scope, file) {
  this.skip();

  if (node.operator === "typeof") {
    var call = t.callExpression(file.addHelper("typeof"), [node.argument]);
    if (t.isIdentifier(node.argument)) {
      var undefLiteral = t.literal("undefined");
      return t.conditionalExpression(
        t.binaryExpression("===", t.unaryExpression("typeof", node.argument), undefLiteral),
        undefLiteral,
        call
      );
    } else {
      return call;
    }
  }
}
