import * as t from "../../../types";

export var metadata = {
  group: "builtin-trailing"
};

const FLOW_DIRECTIVE = "@flow";

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  Program(node, parent, scope, file) {
    for (var comment of (file.ast.comments: Array)) {
      if (comment.value.indexOf(FLOW_DIRECTIVE) >= 0) {
        // remove flow directive
        comment.value = comment.value.replace(FLOW_DIRECTIVE, "");

        // remove the comment completely if it only consists of whitespace and/or stars
        if (!comment.value.replace(/\*/g, "").trim()) comment._displayed = true;
      }
    }
  },

  /**
   * [Please add a description.]
   */

  Flow() {
    this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  ClassProperty(node) {
    node.typeAnnotation = null;
    if (!node.value) this.dangerouslyRemove();
  },

  /**
   * [Please add a description.]
   */

  Class(node) {
    node.implements = null;
  },

  /**
   * [Please add a description.]
   */

  Function(node) {
    for (var i = 0; i < node.params.length; i++) {
      var param = node.params[i];
      param.optional = false;
    }
  },

  /**
   * [Please add a description.]
   */

  TypeCastExpression(node) {
    do {
      node = node.expression;
    } while(t.isTypeCastExpression(node));
    return node;
  }
};
