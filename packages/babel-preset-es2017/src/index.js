const syntaxTrailingFunctionCommas = require("babel-plugin-syntax-trailing-function-commas");
const transformAsyncToGenerator = require("babel-plugin-transform-async-to-generator");

export const plugins = [
  syntaxTrailingFunctionCommas,
  transformAsyncToGenerator
];
