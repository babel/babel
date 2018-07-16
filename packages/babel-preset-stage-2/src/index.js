import { declare } from "@babel/helper-plugin-utils";
import presetStage3 from "@babel/preset-stage-3";

import transformDecorators from "@babel/plugin-proposal-decorators";
import transformFunctionSent from "@babel/plugin-proposal-function-sent";
import transformExportNamespaceFrom from "@babel/plugin-proposal-export-namespace-from";
import transformNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import transformThrowExpressions from "@babel/plugin-proposal-throw-expressions";

export default declare((api, opts = {}) => {
  api.assertVersion(7);

  const { loose = false, useBuiltIns = false, decoratorsLegacy = true } = opts;

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-2 'loose' option must be a boolean.");
  }
  if (typeof useBuiltIns !== "boolean") {
    throw new Error(
      "@babel/preset-stage-2 'useBuiltIns' option must be a boolean.",
    );
  }
  if (typeof decoratorsLegacy !== "boolean") {
    throw new Error(
      "@babel/preset-stage-2 'decoratorsLegacy' option must be a boolean.",
    );
  }

  return {
    presets: [[presetStage3, { loose, useBuiltIns }]],
    plugins: [
      [transformDecorators, { legacy: decoratorsLegacy }],
      transformFunctionSent,
      transformExportNamespaceFrom,
      transformNumericSeparator,
      transformThrowExpressions,
    ],
  };
});
