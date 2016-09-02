import syntaxTrailingFunctionCommas from "babel-plugin-syntax-trailing-function-commas";
import transformAsyncToGenerator from "babel-plugin-transform-async-to-generator";
import transformExponentiationOperator from "babel-plugin-transform-exponentiation-operator";

export default {
  plugins: [
    syntaxTrailingFunctionCommas,
    transformAsyncToGenerator,
    transformExponentiationOperator
  ]
};
