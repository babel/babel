import presetStage3 from "@babel/preset-stage-3";

import transformFunctionSent from "@babel/plugin-proposal-function-sent";
import transformExportNamespaceFrom from "@babel/plugin-proposal-export-namespace-from";
import transformNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import transformThrowExpressions from "@babel/plugin-proposal-throw-expressions";

export default function(context, opts = {}) {
  let loose = false;
  let useBuiltIns = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  }

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-2 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-2 'useBuiltIns' option must be a boolean.",
    );
  }

  return {
    presets: [[presetStage3, { loose, useBuiltIns }]],
    plugins: [
      transformFunctionSent,
      transformExportNamespaceFrom,
      transformNumericSeparator,
      transformThrowExpressions,
    ],
  };
}
