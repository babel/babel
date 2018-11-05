import presetStage3 from "./preset-stage-3";

import transformDecorators from "@babel/plugin-proposal-decorators";
import transformFunctionSent from "@babel/plugin-proposal-function-sent";
import transformExportNamespaceFrom from "@babel/plugin-proposal-export-namespace-from";
import transformNumericSeparator from "@babel/plugin-proposal-numeric-separator";
import transformThrowExpressions from "@babel/plugin-proposal-throw-expressions";

export default (_, opts = {}) => {
  const {
    loose = false,
    useBuiltIns = false,
    decoratorsLegacy = false,
    decoratorsBeforeExport,
  } = opts;

  return {
    presets: [[presetStage3, { loose, useBuiltIns }]],
    plugins: [
      [
        transformDecorators,
        { legacy: decoratorsLegacy, decoratorsBeforeExport },
      ],
      transformFunctionSent,
      transformExportNamespaceFrom,
      transformNumericSeparator,
      transformThrowExpressions,
    ],
  };
};
