import { declare } from "@babel/helper-plugin-utils";
import presetStage1 from "@babel/preset-stage-1";

import transformFunctionBind from "@babel/plugin-proposal-function-bind";
import { proposals } from "@babel/plugin-proposal-pipeline-operator";

export default declare((api, opts = {}) => {
  api.assertVersion(7);

  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    pipelineProposal,
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

  if (decoratorsLegacy !== true) {
    throw new Error(
      "The new decorators proposal is not supported yet." +
        ' You must pass the `"decoratorsLegacy": true` option to' +
        " @babel/preset-stage-0",
    );
  }

  if (typeof pipelineProposal !== "string") {
    throw new Error(
      "The pipeline operator requires a proposal set." +
        " You must pass 'pipelineProposal' option to" +
        " @babel/preset-stage-0 whose value must be one of: " +
        proposals.join(", "),
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
