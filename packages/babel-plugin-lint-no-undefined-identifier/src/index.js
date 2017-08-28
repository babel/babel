export default function() {
  return {
    visitor: {
      CallExpression(path) {
        const args = path.get("arguments");
        const evaluatedCallee = path.get("callee").evaluate();

        if (
          args.length &&
          args[0].evaluate().value === "undefined" &&
          evaluatedCallee.deopt.matchesPattern("t.identifier")
        ) {
          throw path.buildCodeFrameError(
            "Use path.scope.buildUndefinedNode() to create an undefined identifier directly.",
          );
        }
      },
    },
  };
}
