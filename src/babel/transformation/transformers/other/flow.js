import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

export var visitor = {
  Program(node, parent, scope, file) {
    for (var comment of (file.ast.comments: Array)) {
      if (comment.value.indexOf("@flow") >= 0) {
        comment._displayed = true;
      }
    }
  },

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
    if (node.importKind === "type" || node.importKind === "typeof") this.dangerouslyRemove();
  },

  ExportDeclaration() {
    if (this.get("declaration").isTypeAlias()) this.dangerouslyRemove();
  }
};
