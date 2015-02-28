import t from "../../../types";

export function Flow(node) {
  this.remove();
}

export function ClassProperty(node) {
  node.typeAnnotation = null;
  if (!node.value) this.remove();
}

export function Class(node) {
  node.implements = null;
}

export function TypeCastExpression(node) {
  return node.expression;
}

export function ImportDeclaration(node) {
  if (node.isType) this.remove();
}

export function ExportDeclaration(node) {
  if (t.isTypeAlias(node.declaration)) this.remove();
}
