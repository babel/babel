import * as t from "babel-types";
import template from "babel-template";

const buildImport = template(`
  Promise.resolve().then(() => HELPER(require(SPECIFIER)))
`);

export default function () {
  return {
    inherits: require("babel-plugin-syntax-dynamic-import"),

    visitor: {
      Import(path) {
        const helper = this.addHelper("specRequireInterop");

        const call = path.parentPath;

        if (!t.isCallExpression(call.node)) {
          // this should have just been path.buildCodeFrameError("message"), but that is crashing!?
          throw new path.hub.file.buildCodeFrameError(path.node, "dynamic import is not in a call expression", Error);
        }

        call.replaceWith(buildImport({
          HELPER: helper,
          SPECIFIER: call.node.arguments[0]
        }));
      }
    }
  };
}
