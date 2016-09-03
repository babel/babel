import syntaxTrailingFunctionCommas from "babel-plugin-syntax-trailing-function-commas";
import transformAsyncToGenerator from "babel-plugin-transform-async-to-generator";

//export const plugins = [
//  syntaxTrailingFunctionCommas,
//  transformAsyncToGenerator
//];


//export default function (/*context*//*, opts = {}*/) {
//  return {
//    plugins: [
//      syntaxTrailingFunctionCommas,
//      transformAsyncToGenerator
//    ]
//  };
//}


export default {
  plugins: [
    syntaxTrailingFunctionCommas,
    transformAsyncToGenerator
  ]
};
