export default function () {
  return {
    name: "babel-plugin-syntax-exponentiation-operator",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("exponentiationOperator");
    }
  };
}
