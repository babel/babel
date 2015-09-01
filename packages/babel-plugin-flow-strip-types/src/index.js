export default function ({ Plugin, types: t }) {
  const FLOW_DIRECTIVE = "@flow";

  return {
    metadata: {
      group: "builtin-trailing"
    },

    visitor: {
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
      }
    }
  };
}
