export default function ({ parse, traverse }) {
  return {
    visitor: {
      CallExpression(path) {
        if (path.get("callee").isIdentifier({ name: "eval" }) && path.node.arguments.length === 1) {
          let evaluate = path.get("arguments")[0].evaluate();
          if (!evaluate.confident) return;

          let code = evaluate.value;
          if (typeof code !== "string") return;

          let ast = parse(code);
          traverse.removeProperties(ast);
          return ast.program;
        }
      }
    }
  };
}
