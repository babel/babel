export default function() {
  return {
    visitor: {
      CallExpression(path, state) {
        const args = path.get("arguments");
        const evaluatedCallee = path.get("callee").evaluate();

        if (!state.file.opts.filename.includes("packages/babel-plugin-")) {
          return;
        }

        if (
          args.length &&
          args[0].evaluate().value === "undefined" &&
          evaluatedCallee.deopt.node.object &&
          evaluatedCallee.deopt.node.object.name === "t" &&
          evaluatedCallee.deopt.node.property &&
          evaluatedCallee.deopt.node.property.name === "identifier"
        ) {
          throw path.buildCodeFrameError(
            "Use path.scope.buildUndefinedNode() to create an undefined identifier directly.",
          );
        }
      },
    },
  };
}
