export default function ({ types: t }) {
  const FLOW_DIRECTIVE = "@flow";

  return {
    visitor: {
      Program(path, file) {
        for (var comment of (file.ast.comments: Array)) {
          if (comment.value.indexOf(FLOW_DIRECTIVE) >= 0) {
            // remove flow directive
            comment.value = comment.value.replace(FLOW_DIRECTIVE, "");

            // remove the comment completely if it only consists of whitespace and/or stars
            if (!comment.value.replace(/\*/g, "").trim()) comment._displayed = true;
          }
        }
      },

      Flow(path) {
        path.remove();
      },

      ClassProperty(path) {
        path.node.typeAnnotation = null;
        if (!path.node.value) path.remove();
      },

      Class({ node }) {
        node.implements = null;
      },

      Function({ node }) {
        for (var i = 0; i < node.params.length; i++) {
          var param = node.params[i];
          param.optional = false;
        }
      },

      TypeCastExpression(path) {
        var { node } = path;
        do {
          node = node.expression;
        } while(t.isTypeCastExpression(node));
        path.replaceWith(node);
      }
    }
  };
}
