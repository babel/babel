module.exports = {
  plugins: [
    // ES2017: Async Functions
    // https://github.com/tc39/ecmascript-asyncawait
    require("babel-plugin-transform-async-to-generator"),

    // ES2017: Trailing commas in function parameter lists and calls
    // https://jeffmo.github.io/es-trailing-function-commas/
    require("babel-plugin-syntax-trailing-function-commas"),
  ]
};
