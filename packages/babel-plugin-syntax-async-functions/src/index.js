export default function () {
  return {
    name: "babel-plugin-syntax-async-functions",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("asyncFunctions");
    }
  };
}
