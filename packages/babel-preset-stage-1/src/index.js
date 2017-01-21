import presetStage2 from "babel-preset-stage-2";

import transformExportExtensions from "babel-plugin-transform-export-extensions";

export default {
  presets: [
    presetStage2
  ],
  plugins: [
    transformExportExtensions
  ]
};
