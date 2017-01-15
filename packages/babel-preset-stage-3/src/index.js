import transformAsyncToGenerator from "babel-plugin-transform-async-to-generator";
import transformObjectRestSpread from "babel-plugin-transform-object-rest-spread";
import transformAsyncGeneratorFunctions from "babel-plugin-transform-async-generator-functions";

export default {
  plugins: [
    transformAsyncToGenerator, // in ES2017 (remove as a breaking change)
    transformAsyncGeneratorFunctions,
    transformObjectRestSpread
  ]
};
