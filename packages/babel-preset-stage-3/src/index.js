import syntaxDynamicImport from "babel-plugin-syntax-dynamic-import";
import transformObjectRestSpread from "babel-plugin-transform-object-rest-spread";
import transformAsyncGeneratorFunctions from "babel-plugin-transform-async-generator-functions";

export default function () {
  return {
    plugins: [
      syntaxDynamicImport,
      transformAsyncGeneratorFunctions,
      transformObjectRestSpread,
    ],
  };
}
