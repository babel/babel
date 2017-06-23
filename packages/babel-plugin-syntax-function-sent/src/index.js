export default function () {
  return {
    name: "babel-plugin-syntax-function-sent",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("functionSent");
    }
  };
}
