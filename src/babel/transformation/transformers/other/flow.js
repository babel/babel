import t from "../../../types";

export function TypeCastExpression(node) {
  return node.expression;
}

export function ImportDeclaration(node) {
  if (node.isType) this.remove();
}

export function ExportDeclaration(node) {
  if (t.isTypeAlias(node.declaration)) this.remove();
}
