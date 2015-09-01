export default function ({ Plugin, types: t }) {
  return {
    metadata: {
      group: "builtin-pre"
    },

    visitor: {
      MemberExpression() {
        if (this.get("object").matchesPattern("process.env")) {
          var key = this.toComputedKey();
          if (t.isStringLiteral(key)) {
            return t.valueToNode(process.env[key.value]);
          }
        }
      }
    }
  };
}
