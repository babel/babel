import remapAsyncToGenerator from "babel-helper-remap-async-to-generator";

export default function () {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("asyncFunctions");
    },

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(path, state.addHelper("async-to-generator"));
      }
    }
  };
}
