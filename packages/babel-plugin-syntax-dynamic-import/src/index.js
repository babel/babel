export default function () {
  return {
    name: "babel-plugin-syntax-dynamic-import",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("dynamicImport");
    }
  };
}
