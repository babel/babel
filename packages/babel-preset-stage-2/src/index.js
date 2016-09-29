import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformObjectRestSpread from "babel-plugin-transform-object-rest-spread";
import transformDecorators from "babel-plugin-transform-decorators";
import transformAsyncGeneratorFunctions from "babel-plugin-transform-async-generator-functions";

export default {
  presets: [
    presetStage3
  ],
  plugins: [
    transformAsyncGeneratorFunctions,
    transformClassProperties,
    transformObjectRestSpread,
    transformDecorators
  ]
};
