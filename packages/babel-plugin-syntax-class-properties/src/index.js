export default function () {
  return {
    name: "babel-plugin-syntax-class-properties",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classProperties");
    }
  };
}
