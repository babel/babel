import presetStage1 from "@babel/preset-stage-1";

import transformPatternMatching from "@babel/plugin-proposal-pattern-matching";
import transformFunctionBind from "@babel/plugin-proposal-function-bind";

export default function(context, opts = {}) {
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
    plugins: [transformPatternMatching, transformFunctionBind],
  };
}
