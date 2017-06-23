export default function () {
  return {
    name: "babel-plugin-syntax-function-bind",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("functionBind");
    }
  };
}
