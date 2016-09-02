const syntaxTrailingFunctionCommas = require("babel-plugin-syntax-trailing-function-commas");
const transformAsyncToGenerator = require("babel-plugin-transform-async-to-generator");
const transformExponentiationOperator = require("babel-plugin-transform-exponentiation-operator");

export const plugins = [
  syntaxTrailingFunctionCommas,
  transformAsyncToGenerator,
  transformExponentiationOperator
];
