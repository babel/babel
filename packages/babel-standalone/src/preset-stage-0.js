import presetStage1 from "./preset-stage-1";

import transformFunctionBind from "@babel/plugin-proposal-function-bind";

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
        presetStage1,
        {
          loose,
          useBuiltIns,
          decoratorsLegacy,
          decoratorsBeforeExport,
          pipelineProposal,
        },
      ],
    ],
    plugins: [transformFunctionBind],
  };
};
