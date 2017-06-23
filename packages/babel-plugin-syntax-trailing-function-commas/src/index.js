export default function () {
  return {
    name: "babel-plugin-syntax-trailing-function-commas",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("trailingFunctionCommas");
    }
  };
}
