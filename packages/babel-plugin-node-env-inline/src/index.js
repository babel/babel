export default function ({ types: t }) {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      MemberExpression() {
        if (this.matchesPattern("process.env.NODE_ENV")) {
          this.replaceWith(t.valueToNode(process.env.NODE_ENV));

          if (this.parentPath.isBinaryExpression()) {
            var evaluated = this.parentPath.evaluate();
            if (evaluated.confident) {
              this.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
          }
        }
      }
    }
  };
}
