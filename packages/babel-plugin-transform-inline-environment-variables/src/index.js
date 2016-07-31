export default function ({ types: t }) {
  return {
    visitor: {
      MemberExpression(path, state) {
        if (path.get("object").matchesPattern("process.env")) {
          let key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            let name = key.value;
            let value = (state.opts.env && name in state.opts.env) ? state.opts.env[name] : process.env[name];
            path.replaceWith(t.valueToNode(value));
          }
        }
      }
    }
  };
}
