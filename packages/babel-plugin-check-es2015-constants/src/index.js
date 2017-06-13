export default function ({ messages }) {
  return {
    name: "babel-plugin-check-es2015-constants",

    visitor: {
      Scope({ scope }) {
        for (const name in scope.bindings) {
          const binding = scope.bindings[name];
          if (binding.kind !== "const" && binding.kind !== "module") continue;

          for (const violation of (binding.constantViolations: Array)) {
            throw violation.buildCodeFrameError(messages.get("readOnly", name));
          }
        }
      },
    }
  };
}
