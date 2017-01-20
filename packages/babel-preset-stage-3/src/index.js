import transformObjectRestSpread from "babel-plugin-transform-object-rest-spread";
import transformAsyncGeneratorFunctions from "babel-plugin-transform-async-generator-functions";

export default {
  plugins: [
    transformAsyncGeneratorFunctions,
    transformObjectRestSpread
  ]
};
