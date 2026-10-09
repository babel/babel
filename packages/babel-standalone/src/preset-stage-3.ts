import * as babelPlugins from "./generated/plugins.ts";

export default (_: any, opts: any = {}) => {
  const { decoratorsVersion = "2023-11" } = opts;

  const plugins = [
    [
      babelPlugins.proposalDecorators,
      {
        version: decoratorsVersion,
      },
    ],
    babelPlugins.transformExplicitResourceManagement,
    // These are Stage 4
    ...[],
  ];

  return { plugins };
};
