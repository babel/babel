import remapAsyncToGenerator from "babel-helper-remap-async-to-generator";

export default function () {
  return {
    inherits: require("babel-plugin-syntax-async-functions"),

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addImport(state.opts.module, state.opts.method)
        });
      }
    }
  };
}
