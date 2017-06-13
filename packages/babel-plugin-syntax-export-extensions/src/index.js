export default function () {
  return {
    name: "babel-plugin-syntax-export-extensions",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("exportExtensions");
    }
  };
}
