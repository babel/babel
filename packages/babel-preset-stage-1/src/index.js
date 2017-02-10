import presetStage2 from "@babel/preset-stage-2";

import transformDecoratorsLegacy from "@babel/plugin-transform-decorators-legacy";
import transformExportExtensions from "@babel/plugin-transform-export-extensions";

export default {
  presets: [
    presetStage2
  ],
  plugins: [
    transformDecoratorsLegacy,
    transformExportExtensions
  ]
};
