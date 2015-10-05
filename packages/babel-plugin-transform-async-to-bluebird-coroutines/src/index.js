import remapAsyncToGenerator from "babel-helper-remap-async-to-generator";
import * as t from "babel-types";

export default function () {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("asyncFunctions");
    },

    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(
          path,
          t.memberExpression(state.addImport("bluebird", null, "absolute"), t.identifier("coroutine"))
        );
      }
    }
  };
}
