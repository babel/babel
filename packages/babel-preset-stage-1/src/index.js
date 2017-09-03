import presetStage2 from "babel-preset-stage-2";

import transformDecorators from "babel-plugin-transform-decorators";
import transformClassProperties from "babel-plugin-transform-class-properties";
import transformExportDefault from "babel-plugin-transform-export-default";
import transformOptionalChaining from "babel-plugin-transform-optional-chaining";

export default function() {
  return {
    presets: [presetStage2],
    plugins: [
      transformDecorators,
      [transformClassProperties, { loose: true }],
      transformExportDefault,
      transformOptionalChaining,
    ],
  };
}
