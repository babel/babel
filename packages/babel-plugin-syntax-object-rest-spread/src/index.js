export default function () {
  return {
    name: "babel-plugin-syntax-object-rest-spread",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("objectRestSpread");
    }
  };
}
