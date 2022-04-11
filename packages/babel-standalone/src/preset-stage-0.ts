import presetStage1 from "./preset-stage-1";
import { proposalFunctionBind } from "./generated/plugins";

export default (_: any, opts: any = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy,
    decoratorsVersion,
    decoratorsBeforeExport,
    pipelineProposal,
    pipelineTopicToken,
    importAssertionsVersion = "september-2020",
  } = opts;

  return {
    presets: [
      [
        presetStage1,
        {
          loose,
          useBuiltIns,
          decoratorsLegacy,
          decoratorsVersion,
          decoratorsBeforeExport,
          pipelineProposal,
          pipelineTopicToken,
          importAssertionsVersion,
        },
      ],
    ],
    plugins: [proposalFunctionBind],
  };
};
