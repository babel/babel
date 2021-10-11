import { declare } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";
import normalizeOptions from "./normalize-options";

export default declare((api, opts) => {
  api.assertVersion(7);

  const {
    allExtensions,
    allowNamespaces,
    disallowJSXAmbiguity,
    isTSX,
    jsxPragma,
    jsxPragmaFrag,
    onlyRemoveTypeImports,
    optimizeConstEnums,
  } = normalizeOptions(opts);

  const pluginOptions = process.env.BABEL_8_BREAKING
    ? (isTSX, disallowJSXAmbiguity) => ({
        allowNamespaces,
        disallowJSXAmbiguity,
        isTSX,
        jsxPragma,
        jsxPragmaFrag,
        onlyRemoveTypeImports,
        optimizeConstEnums,
      })
    : (isTSX, disallowJSXAmbiguity) => ({
        allowDeclareFields: opts.allowDeclareFields,
        allowNamespaces,
        disallowJSXAmbiguity,
        isTSX,
        jsxPragma,
        jsxPragmaFrag,
        onlyRemoveTypeImports,
        optimizeConstEnums,
      });

  return {
    overrides: allExtensions
      ? [
          {
            plugins: [
              [transformTypeScript, pluginOptions(isTSX, disallowJSXAmbiguity)],
            ],
          },
        ]
      : // Only set 'test' if explicitly requested, since it requires that
        // Babel is being called`
        [
          {
            test: /\.ts$/,
            plugins: [[transformTypeScript, pluginOptions(false, false)]],
          },
          {
            test: /\.mts$/,
            sourceType: "module",
            plugins: [[transformTypeScript, pluginOptions(false, true)]],
          },
          {
            test: /\.cts$/,
            sourceType: "script",
            plugins: [[transformTypeScript, pluginOptions(false, true)]],
          },
          {
            test: /\.tsx$/,
            // disallowJSXAmbiguity is a no-op when parsing TSX, since it's
            // always disallowed.
            plugins: [[transformTypeScript, pluginOptions(true, false)]],
          },
        ],
  };
});
