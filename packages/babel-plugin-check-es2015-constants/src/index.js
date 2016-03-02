export default function ({ messages }) {
  return {
    visitor: {
      Scope({ scope }) {
        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (let violation of binding.constantViolations) {
            throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      }
    }
  };
}
