import presetStage3 from "./preset-stage-3.ts";
import * as babelPlugins from "./generated/plugins.ts";

export default (_: any, opts: any = {}) => {
  const {
    pipelineProposal = process.env.BABEL_8_BREAKING ? "fsharp" : "minimal",
    pipelineTopicToken = "%",
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
      babelPlugins.syntaxModuleBlocks,
      ...(process.env.BABEL_8_BREAKING
        ? []
        : [
            [
              babelPlugins.proposalRecordAndTuple,
              { syntaxType: opts.recordAndTupleSyntax ?? "hash" },
            ],
            babelPlugins.syntaxImportReflection,
          ]),
    ],
  };
};
