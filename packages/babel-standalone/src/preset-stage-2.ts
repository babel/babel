import presetStage3 from "./preset-stage-3";
import * as babelPlugins from "./generated/plugins";

export default (_: any, opts: any = {}) => {
  const {
    pipelineProposal = "minimal",
    pipelineTopicToken = "%",
    recordAndTupleSyntax = "hash",
  } = opts;

  return {
    presets: [[presetStage3, opts]],
    plugins: [
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
      babelPlugins.syntaxModuleBlocks,
      babelPlugins.syntaxImportReflection,
    ],
  };
};
