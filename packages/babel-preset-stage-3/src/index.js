import syntaxTrailingFunctionCommas from "babel-plugin-syntax-trailing-function-commas";
import transformAsyncToGenerator from "babel-plugin-transform-async-to-generator";
import transformExponentiationOperator from "babel-plugin-transform-exponentiation-operator";

//export const plugins = [
//  syntaxTrailingFunctionCommas,
//  transformAsyncToGenerator,
//  transformExponentiationOperator
//];


//export default function (/*context*//*, opts = {}*/) {
//  return {
//    plugins: [
//      syntaxTrailingFunctionCommas,
//      transformAsyncToGenerator,
//      transformExponentiationOperator
//    ]
//  };
//}


export default {
  plugins: [
    syntaxTrailingFunctionCommas,
    transformAsyncToGenerator,
    transformExponentiationOperator
  ]
};
