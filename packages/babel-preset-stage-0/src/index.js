import { declare } from "@babel/helper-plugin-utils";
import presetStage1 from "@babel/preset-stage-1";

import transformFunctionBind from "@babel/plugin-proposal-function-bind";

export default declare((api, opts = {}) => {
  api.assertVersion(7);

  const { loose = false, useBuiltIns = false, decoratorsLegacy = false } = opts;

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
        ' You muse pass the `"decoratorsLegacy": true` option to' +
        " @babel/preset-stage-0",
    );
  }

  return {
    presets: [[presetStage1, { loose, useBuiltIns, decoratorsLegacy }]],
    plugins: [transformFunctionBind],
  };
});
