import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

export var visitor = {
  Flow() {
    this.dangerouslyRemove();
  },

  ClassProperty(node) {
    node.typeAnnotation = null;
    if (!node.value) this.dangerouslyRemove();
  },

  Class(node) {
    node.implements = null;
  },

  Function(node) {
    for (var i = 0; i < node.params.length; i++) {
      var param = node.params[i];
      param.optional = false;
    }
  },

  TypeCastExpression(node) {
    do {
      node = node.expression;
    } while(t.isTypeCastExpression(node));
    return node;
  },

  ImportDeclaration(node) {
    if (node.isType) this.dangerouslyRemove();
  },

  ExportDeclaration() {
    if (this.get("declaration").isTypeAlias()) this.dangerouslyRemove();
  }
};
