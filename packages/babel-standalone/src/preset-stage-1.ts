import presetStage2 from "./preset-stage-2.ts";
import * as babelPlugins from "./generated/plugins.ts";

export default (_: any, opts: any = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsVersion,
    pipelineProposal,
    pipelineTopicToken,
    optionalChainingAssignVersion = "2023-07",
  } = opts;

  return {
    presets: [
      [
        presetStage2,

        {
          loose,
          useBuiltIns,
          decoratorsVersion,
          pipelineProposal,
          pipelineTopicToken,
        },
      ],
    ],
    plugins: [
      ...[],
      babelPlugins.proposalExportDefaultFrom,
      babelPlugins.proposalDoExpressions,
      [
        babelPlugins.proposalOptionalChainingAssign,
        { version: optionalChainingAssignVersion },
      ],
    ],
  };
};
