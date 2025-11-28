import * as babelPlugins from "./generated/plugins.ts";

export default (_: any, opts: any = {}) => {
  const {
    decoratorsLegacy = false,
    decoratorsVersion = "2018-09",
    decoratorsBeforeExport,
  } = opts;

  const plugins = [
    [
      babelPlugins.proposalDecorators,
      {
        version: decoratorsLegacy ? "legacy" : decoratorsVersion,
        decoratorsBeforeExport,
      },
    ],
    babelPlugins.transformExplicitResourceManagement,
    // These are Stage 4
    ...[],
  ];

  return { plugins };
};
