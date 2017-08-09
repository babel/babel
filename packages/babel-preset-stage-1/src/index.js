import presetStage2 from "babel-preset-stage-2";

import transformDecorators from "babel-plugin-transform-decorators";
import transformExportDefault from "babel-plugin-transform-export-default";
import transformOptionalChaining from "babel-plugin-transform-optional-chaining";

export default function() {
  return {
    presets: [presetStage2],
    plugins: [
      transformDecorators,
      transformExportDefault,
      transformOptionalChaining,
    ],
  };
}
