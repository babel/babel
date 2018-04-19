import { declare } from "@babel/helper-plugin-utils";
import presetStage1 from "@babel/preset-stage-1";

import transformFunctionBind from "@babel/plugin-proposal-function-bind";

export default declare((api, opts) => {
  api.assertVersion(7);

  let loose = false;
  let useBuiltIns = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  }

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-0 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-0 'useBuiltIns' option must be a boolean.",
    );
  }

  return {
    presets: [[presetStage1, { loose, useBuiltIns }]],
    plugins: [transformFunctionBind],
  };
});
