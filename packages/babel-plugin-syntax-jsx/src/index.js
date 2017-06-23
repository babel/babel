export default function () {
  return {
    name: "babel-plugin-syntax-jsx",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("jsx");
    }
  };
}
