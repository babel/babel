import syntaxTrailingFunctionCommas from "babel-plugin-syntax-trailing-function-commas";
import transformAsyncToGenerator from "babel-plugin-transform-async-to-generator";

export default {
  plugins: [
    syntaxTrailingFunctionCommas,
    transformAsyncToGenerator
  ]
};
