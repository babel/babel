export default function ({ messages, types: t }) {
  function check(node) {
    if (t.isVariableDeclaration(node, { kind: "const" })) {
      node.kind = "let";
    }
  }

  return {
    visitor: {
      Scope({ scope }) {
        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (let violation of (binding.constantViolations: Array)) {
            throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      },

      VariableDeclaration({ node }) {
        check(node);
      },

      ForXStatement({ node: { left } }) {
        check(left);
      },

      ForStatement({ node: { init } }) {
        check(init);
      },

      "BlockStatement|Program"({ node: { body } }) {
        for (let node of body) check(node);
      }
    }
  };
}
