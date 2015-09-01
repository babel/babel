export default function () {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      CallExpression() {
        if (this.get("callee").matchesPattern("console", true)) {
          this.dangerouslyRemove();
        }
      }
    }
  };
}
