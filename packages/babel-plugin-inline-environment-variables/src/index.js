export default function ({ Plugin, types: t }) {
  return new Plugin("inline-environment-variables", {
    metadata: {
      group: "builtin-pre"
    },
    
    visitor: {
      MemberExpression(node) {
        if (this.get("object").matchesPattern("process.env")) {
          var key = this.toComputedKey();
          if (t.isLiteral(key)) {
            return t.valueToNode(process.env[key.value]);
          }
        }
      }
    }
  });
}
