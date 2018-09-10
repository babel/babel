import presetStage1 from "./preset-stage-1";

import transformFunctionBind from "@babel/plugin-proposal-function-bind";

export default (_, opts = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    pipelineProposal = "minimal",
  } = opts;

  return {
    presets: [
      [
        presetStage1,
        { loose, useBuiltIns, decoratorsLegacy, pipelineProposal },
      ],
    ],
    plugins: [transformFunctionBind],
  };
};
