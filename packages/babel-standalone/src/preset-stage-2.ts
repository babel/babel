import presetStage3 from "./preset-stage-3";
import * as babelPlugins from "./generated/plugins";

export default (_: any, opts: any = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    decoratorsVersion = "2018-09",
    decoratorsBeforeExport,
    pipelineProposal = "minimal",
    pipelineTopicToken = "%",
    recordAndTupleSyntax = "hash",
  } = opts;

  return {
    presets: [[presetStage3, { loose, useBuiltIns }]],
    plugins: [
      [
        babelPlugins.proposalDecorators,
        {
          version: decoratorsLegacy ? "legacy" : decoratorsVersion,
          decoratorsBeforeExport,
        },
      ],
      babelPlugins.proposalDestructuringPrivate,
      [
        babelPlugins.proposalPipelineOperator,
        { proposal: pipelineProposal, topicToken: pipelineTopicToken },
      ],
      babelPlugins.proposalFunctionSent,
      babelPlugins.proposalThrowExpressions,
      [
        babelPlugins.proposalRecordAndTuple,
        { syntaxType: recordAndTupleSyntax },
      ],
      babelPlugins.syntaxExplicitResourceManagement,
      babelPlugins.syntaxModuleBlocks,
      babelPlugins.syntaxImportReflection,
    ],
  };
};
