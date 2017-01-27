import presetStage2 from "babel-preset-stage-2";

import transformExportExtensions from "babel-plugin-transform-export-extensions";
import transformDecoratorsLegacy from "babel-plugin-transform-decorators-legacy";

export default {
  presets: [
    presetStage2
  ],
  plugins: [
    transformExportExtensions,
    transformDecoratorsLegacy
  ]
};
