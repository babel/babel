import presetStage3 from "babel-preset-stage-3";

import transformClassProperties from "babel-plugin-transform-class-properties";
import transformDecorators from "babel-plugin-transform-decorators";
import syntaxDynamicImport from "babel-plugin-syntax-dynamic-import";

export default {
  presets: [
    presetStage3
  ],
  plugins: [
    syntaxDynamicImport,
    transformClassProperties,
    transformDecorators
  ]
};
