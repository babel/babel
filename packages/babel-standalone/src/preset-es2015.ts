import * as babelPlugins from "./generated/plugins.ts";

export default (_: any, opts: any): any => {
  const { loose, modules = "commonjs", spec } = opts ?? {};

  // `loose` and `spec` are deprecated plugin options, and the plugins warn
  // whenever they are present: only forward them when they are set.
  const optsLoose = loose === undefined ? {} : { loose };
  const optsSpec = spec === undefined ? {} : { spec };

  return {
    plugins: [
      [babelPlugins.transformTemplateLiterals, optsLoose],
      babelPlugins.transformLiterals,
      babelPlugins.transformFunctionName,
      [babelPlugins.transformArrowFunctions, optsSpec],
      babelPlugins.transformBlockScopedFunctions,
      [babelPlugins.transformClasses, optsLoose],
      babelPlugins.transformObjectSuper,
      babelPlugins.transformShorthandProperties,
      babelPlugins.transformDuplicateKeys,
      [babelPlugins.transformComputedProperties, optsLoose],
      [babelPlugins.transformForOf, optsLoose],
      babelPlugins.transformStickyRegex,
      babelPlugins.transformUnicodeEscapes,
      babelPlugins.transformUnicodeRegex,
      [babelPlugins.transformSpread, optsLoose],
      [babelPlugins.transformParameters, optsLoose],
      [babelPlugins.transformDestructuring, optsLoose],
      babelPlugins.transformBlockScoping,
      babelPlugins.transformTypeofSymbol,
      babelPlugins.transformInstanceof,
      (modules === "commonjs" || modules === "cjs") && [
        babelPlugins.transformModulesCommonjs,
        optsLoose,
      ],
      modules === "systemjs" && [
        babelPlugins.transformModulesSystemjs,
        optsLoose,
      ],
      modules === "amd" && [babelPlugins.transformModulesAmd, optsLoose],
      modules === "umd" && [babelPlugins.transformModulesUmd, optsLoose],
      [
        babelPlugins.transformRegenerator,
        { async: false, asyncGenerators: false },
      ],
    ].filter(Boolean), // filter out falsy values
  };
};
