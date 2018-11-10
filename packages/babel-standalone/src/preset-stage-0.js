// @flow
import presetStage1 from "./preset-stage-1";
import { transformFunctionBind } from "./plugins";

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
