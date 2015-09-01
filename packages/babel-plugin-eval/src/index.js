export default function ({ Plugin, parse, traverse }) {
  return new Plugin("eval", {
    metadata: {
      group: "builtin-pre",
    },

    visitor: {
      CallExpression(node) {
        if (this.get("callee").isIdentifier({ name: "eval" }) && node.arguments.length === 1) {
          var evaluate = this.get("arguments")[0].evaluate();
          if (!evaluate.confident) return;

          var code = evaluate.value;
          if (typeof code !== "string") return;

          var ast = parse(code);
          traverse.removeProperties(ast);
          return ast.program;
        }
      }
    }
  });
}
