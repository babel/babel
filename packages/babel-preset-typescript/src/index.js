import { declare } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";
import syntaxJSX from "@babel/plugin-syntax-jsx";

export default declare(
  (
    api,
    {
      ignoreExtensions = false,
      allowNamespaces,
      jsxPragma,
      onlyRemoveTypeImports,

      // Removed
      allExtensions,
      isTSX,
    },
  ) => {
    api.assertVersion(7);

    if (typeof allExtensions !== "undefined" || typeof isTSX !== "undefined") {
      throw new Error(
        "The .allExtensions and .isTSX options have been removed.\n" +
          "If you want to disable file extension-based JSX detection, " +
          "you can set the .ignoreExtensions option to true.\n" +
          "If you want to force JSX parsing, you can enable the " +
          "@babel/plugin-syntax-jsx plugin.",
      );
    }

    if (typeof ignoreExtensions !== "boolean") {
      throw new Error("The .ignoreExtensions option must be a boolean.");
    }

    const pluginOptions = {
      allowNamespaces,
      jsxPragma,
      onlyRemoveTypeImports,
    };

    const tsPlugins = [[transformTypeScript, pluginOptions]];
    const tsxPlugins = [[transformTypeScript, pluginOptions], syntaxJSX];

    if (ignoreExtensions) {
      return { plugins: tsPlugins };
    }

    return {
      overrides: [
        {
          test: filename => filename == null || filename.endsWith(".ts"),
          plugins: tsPlugins,
        },
        {
          test: filename => filename?.endsWith(".tsx"),
          plugins: tsxPlugins,
        },
      ],
    };
  },
);
