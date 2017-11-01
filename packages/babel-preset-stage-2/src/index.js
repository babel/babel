import presetStage3 from "@babel/preset-stage-3";

import transformFunctionSent from "@babel/plugin-proposal-function-sent";
import transformExportNamespace from "@babel/plugin-proposal-export-namespace";
import transformNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import transformThrowExpressions from "@babel/plugin-proposal-throw-expressions";

export default function() {
  return {
    presets: [presetStage3],
    plugins: [
      transformFunctionSent,
      transformExportNamespace,
      transformNumericSeparator,
      transformThrowExpressions,
    ],
  };
}
