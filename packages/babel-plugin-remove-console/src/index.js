export default function ({ Plugin, types: t }) {
  return new Plugin("remove-console", {
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
  });
}
