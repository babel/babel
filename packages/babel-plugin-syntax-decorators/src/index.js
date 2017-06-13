export default function () {
  return {
    name: "babel-plugin-syntax-decorators",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("decorators");
    }
  };
}
