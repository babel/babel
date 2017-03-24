import remapAsyncToGenerator from "babel-helper-remap-async-to-generator";
import syntaxAsyncFunctions from "babel-plugin-syntax-async-functions";

export default function () {
  return {
    inherits: syntaxAsyncFunctions,

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        // Ensure any bindings at the Program level are renamed first
        // so any further renames cannot accidentally rename the Promise
        // binding used by the inline helper
        const programScope = path.scope.getProgramParent();
        if (programScope.hasBinding("Promise", true)) {
          programScope.rename("Promise");
        }
        if (path.scope.hasBinding("Promise", true)) {
          path.scope.rename("Promise");
        }

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addHelper("asyncToGenerator"),
        });
      },
    },
  };
}
