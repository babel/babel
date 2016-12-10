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

        call.replaceWith(buildImport({
          HELPER: helper,
          SPECIFIER: call.node.arguments[0]
        }));
      }
    }
  };
}
