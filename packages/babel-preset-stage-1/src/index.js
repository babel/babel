import presetStage2 from "@babel/preset-stage-2";

import transformDecorators from "@babel/plugin-transform-decorators";
import transformExportDefault from "@babel/plugin-transform-export-default";
import transformOptionalChaining from "@babel/plugin-transform-optional-chaining";
import transformPipelineOperator from "@babel/plugin-transform-pipeline-operator";
import transformNullishCoalescingOperator from "@babel/plugin-transform-nullish-coalescing-operator";

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
