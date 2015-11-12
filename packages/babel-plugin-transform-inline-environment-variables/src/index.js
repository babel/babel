export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        if (path.get("object").matchesPattern("process.env")) {
          let key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            path.replace(t.valueToNode(process.env[key.value]));
          }
        }
      }
    }
  };
}
