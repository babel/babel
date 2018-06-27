import { declare } from "@babel/helper-plugin-utils";
import presetStage2 from "@babel/preset-stage-2";

import transformExportDefaultFrom from "@babel/plugin-proposal-export-default-from";
import transformLogicalAssignmentOperators from "@babel/plugin-proposal-logical-assignment-operators";
import transformOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import transformPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import transformNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";
import transformDoExpressions from "@babel/plugin-proposal-do-expressions";

export default declare((api, opts = {}) => {
  api.assertVersion(7);

  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    pipelineProposal,
  } = opts;

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-1 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-1 'useBuiltIns' option must be a boolean.",
    );
  }
  if (typeof decoratorsLegacy !== "boolean") {
    throw new Error(
      "@babel/preset-stage-1 'decoratorsLegacy' option must be a boolean.",
    );
  }

  if (decoratorsLegacy !== true) {
    throw new Error(
      "The new decorators proposal is not supported yet." +
        ' You must pass the `"decoratorsLegacy": true` option to' +
        " @babel/preset-stage-1",
    );
  }

  if (typeof pipelineProposal !== "string") {
    throw new Error(
      "The pipeline operator requires a proposal set." +
        " You must pass 'pipelineProposal' option to" +
        " @babel/preset-stage-1",
    );
  }

  return {
    presets: [[presetStage2, { loose, useBuiltIns, decoratorsLegacy }]],
    plugins: [
      transformExportDefaultFrom,
      transformLogicalAssignmentOperators,
      [transformOptionalChaining, { loose }],
      [transformPipelineOperator, { proposal: pipelineProposal }],
      [transformNullishCoalescingOperator, { loose }],
      transformDoExpressions,
    ],
  };
});
