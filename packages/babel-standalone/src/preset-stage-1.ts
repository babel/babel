import presetStage2 from "./preset-stage-2.ts";
import * as babelPlugins from "./generated/plugins.ts";

export default (_: any, opts: any = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy,
    decoratorsVersion,
    decoratorsBeforeExport,
    pipelineProposal,
    pipelineTopicToken,
    optionalChainingAssignVersion = "2023-07",
  } = opts;

  return {
    presets: [
      [
        presetStage2,
        process.env.BABEL_8_BREAKING
          ? {
              loose,
              useBuiltIns,
              decoratorsLegacy,
              decoratorsVersion,
              decoratorsBeforeExport,
              pipelineProposal,
              pipelineTopicToken,
            }
          : {
              loose,
              useBuiltIns,
              decoratorsLegacy,
              decoratorsVersion,
              decoratorsBeforeExport,
              pipelineProposal,
              pipelineTopicToken,
              recordAndTupleSyntax: opts.recordAndTupleSyntax,
            },
      ],
    ],
    plugins: [
      ...(process.env.BABEL_8_BREAKING ? [] : [babelPlugins.syntaxDecimal]),
      babelPlugins.proposalExportDefaultFrom,
      babelPlugins.proposalDoExpressions,
      [
        babelPlugins.proposalOptionalChainingAssign,
        { version: optionalChainingAssignVersion },
      ],
    ],
  };
};
