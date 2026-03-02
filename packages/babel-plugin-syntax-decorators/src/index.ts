import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  version?: "legacy" | "2023-11";
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  const { version } = options;

  if (version === undefined) {
    throw new Error(
      "The decorators plugin requires a 'version' option, whose value must be one of: " +
        "'2023-11' or 'legacy'.",
    );
  }
  if (version !== "2023-11" && version !== "legacy") {
    throw new Error(
      "Unsupported decorators version: " + JSON.stringify(version),
    );
  }
  if ("legacy" in options) {
    throw new Error(
      `The .legacy option has been removed in Babel 8. Use .version: "legacy" instead.`,
    );
  }
  if ("decoratorsBeforeExport" in options) {
    throw new Error(
      `The .decoratorsBeforeExport option has been removed in Babel 8. The decorators can come either before or after exports.`,
    );
  }

  return {
    name: "syntax-decorators",

    manipulateOptions(_opts, parserOpts) {
      if (version === "legacy") {
        parserOpts.plugins.push("decorators-legacy");
      } else {
        parserOpts.plugins.push("decorators", "decoratorAutoAccessors");
      }
    },
  };
});
