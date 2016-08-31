import { default as syntaxAsyncFunctions } from "babel-plugin-syntax-async-functions";
import remapAsyncToGenerator from "babel-helper-remap-async-to-generator";

export default function () {
  return {
    inherits: syntaxAsyncFunctions,

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(
          path,
          state.addImport(state.opts.module, state.opts.method)
        );
      }
    }
  };
}
