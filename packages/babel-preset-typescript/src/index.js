import { declare } from "@babel/helper-plugin-utils";
import transformTypeScript from "@babel/plugin-transform-typescript";

export default declare(
  (
    api,
    {
      allExtensions = false,
      allowDeclareFields,
      allowNamespaces,
      jsxPragma,
      jsxPragmaFrag = "React.Fragment",
      isTSX = false,
      onlyRemoveTypeImports,
    },
  ) => {
    api.assertVersion(7);

    // Technically we could use the "semver" package here, but (for exmaple)
    // parseFloat("4.23.6") returns 4.23 so it's "good enough"
    const BABEL_SUPPORTS_EXTENSIONS_OPTION = parseFloat(api.version) >= 7.12;

    if (typeof jsxPragmaFrag !== "string") {
      throw new Error(".jsxPragmaFrag must be a string, or undefined");
    }

    if (typeof allExtensions !== "boolean") {
      throw new Error(".allExtensions must be a boolean, or undefined");
    }

    if (typeof isTSX !== "boolean") {
      throw new Error(".isTSX must be a boolean, or undefined");
    }

    if (isTSX && !allExtensions) {
      throw new Error("isTSX:true requires allExtensions:true");
    }

    const pluginOptions = isTSX => ({
      allowDeclareFields,
      allowNamespaces,
      isTSX,
      jsxPragma,
      jsxPragmaFrag,
      onlyRemoveTypeImports,
    });

    return {
      ...(BABEL_SUPPORTS_EXTENSIONS_OPTION && {
        extensions: [".ts", ".tsx"],
      }),
      overrides: allExtensions
        ? [
            {
              plugins: [[transformTypeScript, pluginOptions(isTSX)]],
            },
          ]
        : [
            {
              // Only set 'test' if explicitly requested, since it requires that
              // Babel is being called`
              test: /\.ts$/,
              plugins: [[transformTypeScript, pluginOptions(false)]],
            },
            {
              // Only set 'test' if explicitly requested, since it requires that
              // Babel is being called`
              test: /\.tsx$/,
              plugins: [[transformTypeScript, pluginOptions(true)]],
            },
          ],
    };
  },
);
