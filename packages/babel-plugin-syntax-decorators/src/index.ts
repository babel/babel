import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  // TODO(Babel 8): Remove
  legacy?: boolean;
  // TODO(Babel 8): Remove "2018-09", "2021-12", '2022-03', '2023-01' and '2023-05'
  version?:
    | "legacy"
    | "2018-09"
    | "2021-12"
    | "2022-03"
    | "2023-01"
    | "2023-05"
    | "2023-11";
  // TODO(Babel 8): Remove
  decoratorsBeforeExport?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  const { version } = options;

  if (version === undefined) {
    throw new Error(
      "The decorators plugin requires a 'version' option, whose value must be one of: " +
        "'2023-11', '2023-05', '2023-01', '2022-03', '2021-12', '2018-09', or 'legacy'.",
    );
  }
  if (
    version !== "2023-11" &&
    version !== "2023-05" &&
    version !== "2023-01" &&
    version !== "2022-03" &&
    version !== "2021-12" &&
    version !== "legacy"
  ) {
    throw new Error("Unsupported decorators version: " + version);
  }
  if (options.legacy !== undefined) {
    throw new Error(
      `The .legacy option has been removed in Babel 8. Use .version: "legacy" instead.`,
    );
  }
  if (options.decoratorsBeforeExport !== undefined) {
    throw new Error(
      `The .decoratorsBeforeExport option has been removed in Babel 8.`,
    );
  }

  return {
    name: "syntax-decorators",

    manipulateOptions(_opts, parserOpts) {
      if (version === "legacy") {
        parserOpts.plugins.push("decorators-legacy");
      } else {
        parserOpts.plugins.push(
          ["decorators", { allowCallParenthesized: false }],
          "decoratorAutoAccessors",
        );
      }
    },
  };
});
