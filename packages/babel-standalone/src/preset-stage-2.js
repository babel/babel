// @flow
import presetStage3 from "./preset-stage-3";
import * as babelPlugins from "./plugins";

export default (_: any, opts: Object = {}) => {
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
        babelPlugins.transformDecorators,
        { legacy: decoratorsLegacy, decoratorsBeforeExport },
      ],
      babelPlugins.transformFunctionSent,
      babelPlugins.transformExportNamespaceFrom,
      babelPlugins.transformNumericSeparator,
      babelPlugins.transformThrowExpressions,
    ],
  };
};
