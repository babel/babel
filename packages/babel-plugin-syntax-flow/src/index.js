export default function () {
  return {
    name: "babel-plugin-syntax-flow",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("flow");
    }
  };
}
