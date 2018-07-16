import { declare } from "@babel/helper-plugin-utils";
import presetStage1 from "@babel/preset-stage-1";

import transformFunctionBind from "@babel/plugin-proposal-function-bind";

export default declare((api, opts = {}) => {
  api.assertVersion(7);

  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = true,
    pipelineProposal = "minimal",
  } = opts;

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-0 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-0 'useBuiltIns' option must be a boolean.",
    );
  }
  if (typeof decoratorsLegacy !== "boolean") {
    throw new Error(
      "@babel/preset-stage-0 'decoratorsLegacy' option must be a boolean.",
    );
  }

  return {
    presets: [
      [
        presetStage1,
        { loose, useBuiltIns, decoratorsLegacy, pipelineProposal },
      ],
    ],
    plugins: [transformFunctionBind],
  };
});
