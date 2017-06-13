import remapAsyncToGenerator from "babel-helper-remap-async-to-generator";
import syntaxAsyncFunctions from "babel-plugin-syntax-async-functions";

export default function () {
  return {
    name: "babel-plugin-transform-async-to-module-method",
    inherits: syntaxAsyncFunctions,

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addImport(state.opts.module, state.opts.method),
        });
      },
    }
  };
}
