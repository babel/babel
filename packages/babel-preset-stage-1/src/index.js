import presetStage2 from "@babel/preset-stage-2";

import transformDecorators from "@babel/plugin-proposal-decorators";
import transformExportDefault from "@babel/plugin-proposal-export-default";
import transformOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import transformPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import transformNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";

export default function() {
  return {
    presets: [presetStage2],
    plugins: [
      transformDecorators,
      transformExportDefault,
      transformOptionalChaining,
      transformPipelineOperator,
      transformNullishCoalescingOperator,
    ],
  };
}
