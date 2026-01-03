import { declarePreset } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";
import transformModulesCommonJS from "@babel/plugin-transform-modules-commonjs";
import normalizeOptions from "./normalize-options.ts";
import type { Options } from "./normalize-options.ts";
import pluginRewriteTSImports from "./plugin-rewrite-ts-imports.ts";
import type { PluginItem } from "@babel/core";

export default declarePreset((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const {
    ignoreExtensions,
    allowNamespaces,
    disallowAmbiguousJSXLike,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
    optimizeConstEnums,
    rewriteImportExtensions,
  } = normalizeOptions(opts);

  const pluginOptions = (disallowAmbiguousJSXLike: boolean) => ({
    allowNamespaces,
    disallowAmbiguousJSXLike,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
    optimizeConstEnums,
  });

  const getPlugins = (disallowAmbiguousJSXLike: boolean) => {
    const tsPlugin: PluginItem = [
      transformTypeScript,
      pluginOptions(disallowAmbiguousJSXLike),
    ];
    return [tsPlugin];
  };

  const disableExtensionDetect = ignoreExtensions;

  return {
    plugins: rewriteImportExtensions ? [pluginRewriteTSImports] : [],
    overrides: disableExtensionDetect
      ? [{ plugins: getPlugins(disallowAmbiguousJSXLike) }]
      : // Only set 'test' if explicitly requested, since it requires that
        // Babel is being called with a filename.
        [
          {
            test: filename => filename == null || filename.endsWith(".ts"),
            plugins: getPlugins(false),
          },
          {
            test: filename => filename?.endsWith(".mts"),
            sourceType: "module",
            plugins: getPlugins(true),
          },
          {
            test: filename => filename?.endsWith(".cts"),
            sourceType: "unambiguous",
            plugins: [
              [transformModulesCommonJS, { allowTopLevelThis: true }],
              [transformTypeScript, pluginOptions(true)],
            ],
          },
          {
            test: filename => filename?.endsWith(".tsx"),
            // disallowAmbiguousJSXLike is a no-op when parsing TSX, since it's
            // always disallowed.
            plugins: getPlugins(false),
          },
        ],
  };
});
