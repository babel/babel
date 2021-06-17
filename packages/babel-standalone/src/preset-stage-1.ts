import presetStage2 from "./preset-stage-2";
import * as babelPlugins from "./generated/plugins";

export default (_: any, opts: any = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    decoratorsBeforeExport,
    pipelineProposal = "minimal",
    pipelineTopicToken = "%",
    recordAndTupleSyntax,
  } = opts;

  return {
    presets: [
      [
        presetStage2,
        {
          loose,
          useBuiltIns,
          decoratorsLegacy,
          decoratorsBeforeExport,
          recordAndTupleSyntax,
        },
      ],
    ],
    plugins: [
      babelPlugins.syntaxDecimal,
      babelPlugins.syntaxModuleBlocks,
      babelPlugins.proposalExportDefaultFrom,
      [
        babelPlugins.proposalPipelineOperator,
        { proposal: pipelineProposal, topicToken: pipelineTopicToken },
      ],
      babelPlugins.proposalDoExpressions,
    ],
  };
};
