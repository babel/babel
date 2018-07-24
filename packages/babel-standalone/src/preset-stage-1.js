import presetStage2 from "./preset-stage-2";

import transformExportDefaultFrom from "@babel/plugin-proposal-export-default-from";
import transformLogicalAssignmentOperators from "@babel/plugin-proposal-logical-assignment-operators";
import transformOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import transformPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import transformNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";
import transformDoExpressions from "@babel/plugin-proposal-do-expressions";

export default (_, opts = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    pipelineProposal = "minimal",
  } = opts;

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
};
