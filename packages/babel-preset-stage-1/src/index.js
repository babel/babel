import presetStage2 from "@babel/preset-stage-2";

import transformDecorators from "@babel/plugin-proposal-decorators";
import transformExportDefault from "@babel/plugin-proposal-export-default";
import transformOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import transformPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import transformNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";

export default function(context, opts = {}) {
  let loose = false;
  let useBuiltIns = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  }

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-1 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-1 'useBuiltIns' option must be a boolean.",
    );
  }

  return {
    presets: [[presetStage2, { loose, useBuiltIns }]],
    plugins: [
      transformDecorators,
      transformExportDefault,
      [transformOptionalChaining, { loose }],
      transformPipelineOperator,
      [transformNullishCoalescingOperator, { loose }],
    ],
  };
}
