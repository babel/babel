// @flow
import presetStage2 from "./preset-stage-2";
import * as babelPlugins from "./plugins";

export default (_: any, opts: Object = {}) => {
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
      babelPlugins.transformExportDefaultFrom,
      babelPlugins.transformLogicalAssignmentOperators,
      [babelPlugins.transformOptionalChaining, { loose }],
      [babelPlugins.transformPipelineOperator, { proposal: pipelineProposal }],
      [babelPlugins.transformNullishCoalescingOperator, { loose }],
      babelPlugins.transformDoExpressions,
    ],
  };
};
