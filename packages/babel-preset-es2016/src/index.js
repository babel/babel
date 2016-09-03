import transformExponentiationOperator from "babel-plugin-transform-exponentiation-operator";

//export const plugins = [
//  transformExponentiationOperator
//];


//export default function (/*context*//*, opts = {}*/) {
//  return {
//    plugins: [
//      transformExponentiationOperator
//    ]
//  };
//}


export default {
  plugins: [
    transformExponentiationOperator
  ]
};
