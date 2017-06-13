export default function () {
  return {
    name: "babel-plugin-syntax-do-expressions",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("doExpressions");
    }
  };
}
