export default function ({ messages }) {
  return {
    visitor: {
      Scope({ scope }) {
        for (var name in scope.bindings) {
          var binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (var violation of (binding.constantViolations: Array)) {
            throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      },

      VariableDeclaration({ node }) {
        if (node.kind === "const") node.kind = "let";
      }
    }
  };
}
