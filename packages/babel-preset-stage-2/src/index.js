import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformDecorators from "babel-plugin-transform-decorators";
import syntaxImportFunctions from "babel-plugin-syntax-import-functions";

export default {
  presets: [
    presetStage3
  ],
  plugins: [
    syntaxImportFunctions,
    transformClassProperties,
    transformDecorators
  ]
};
