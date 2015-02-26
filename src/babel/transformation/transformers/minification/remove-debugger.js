import t from "../../../types";

export var optional = true;

export function ExpressionStatement(node) {
  if (t.isIdentifier(node.expression, { name: "debugger" })) {
    this.remove();
  }
}
