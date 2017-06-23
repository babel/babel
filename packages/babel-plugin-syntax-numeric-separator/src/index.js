export default function () {
  return {
    name: "babel-plugin-syntax-numeric-separator",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("numericSeparator");
    }
  };
}
