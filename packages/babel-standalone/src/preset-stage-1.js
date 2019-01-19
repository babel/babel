import presetStage2 from "./preset-stage-2";

import transformExportDefaultFrom from "@babel/plugin-proposal-export-default-from";
import transformLogicalAssignmentOperators from "@babel/plugin-proposal-logical-assignment-operators";
import transformOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import transformPatternMatching from "../../babel-plugin-proposal-pattern-matching";
import transformPipelineOperator from "@babel/plugin-proposal-pipeline-operator";
import transformNullishCoalescingOperator from "@babel/plugin-proposal-nullish-coalescing-operator";
import transformDoExpressions from "@babel/plugin-proposal-do-expressions";

export default (_, opts = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    decoratorsBeforeExport,
    pipelineProposal = "minimal",
  } = opts;

  return {
    presets: [
      [
        presetStage2,
        { loose, useBuiltIns, decoratorsLegacy, decoratorsBeforeExport },
      ],
    ],
    plugins: [
      transformExportDefaultFrom,
      transformLogicalAssignmentOperators,
      [transformOptionalChaining, { loose }],
      transformPatternMatching,
      [transformPipelineOperator, { proposal: pipelineProposal }],
      [transformNullishCoalescingOperator, { loose }],
      transformDoExpressions,
    ],
  };
};
