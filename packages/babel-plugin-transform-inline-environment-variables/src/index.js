export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression(path, state) {
        if (path.get("object").matchesPattern("process.env")) {
          let key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            let {value} = key;
            let replacement = process.env[value] || (state.opts.defaults || {})[value];
            path.replaceWith(t.valueToNode(replacement));
          }
        }
      }
    }
  };
}
