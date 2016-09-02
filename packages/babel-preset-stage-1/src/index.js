import presetStage2 from "babel-preset-stage-2";

import transformClassConstructorCall from "babel-plugin-transform-class-constructor-call";
import transformExportExtensions from "babel-plugin-transform-export-extensions";

export default {
  presets: [
    presetStage2
  ],
  plugins: [
    transformClassConstructorCall,
    transformExportExtensions
  ]
};
