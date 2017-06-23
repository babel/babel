export default function () {
  return {
    name: "babel-plugin-syntax-async-generators",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("asyncGenerators");
    }
  };
}
