import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

export function Flow(node) {
  this.dangerouslyRemove();
}

export function ClassProperty(node) {
  node.typeAnnotation = null;
  if (!node.value) this.dangerouslyRemove();
}

export function Class(node) {
  node.implements = null;
}

export function Func/*tion*/(node) {
  for (var i = 0; i < node.params.length; i++) {
    var param = node.params[i];
    param.optional = false;
  }
}

export function TypeCastExpression(node) {
  do {
    node = node.expression;
  } while(t.isTypeCastExpression(node));
  return node;
}

export function ImportDeclaration(node) {
  if (node.isType) this.dangerouslyRemove();
}

export function ExportDeclaration(node) {
  if (this.get("declaration").isTypeAlias()) this.dangerouslyRemove();
}
