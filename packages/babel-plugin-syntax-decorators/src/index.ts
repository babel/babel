import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  // TODO(Babel 8): Remove
  legacy?: boolean;
  // TODO(Babel 8): Remove "2018-09", "2021-12", '2022-03', and '2023-01'
  version?:
    | "legacy"
    | "2018-09"
    | "2021-12"
    | "2022-03"
    | "2023-01"
    | "2023-05";
  // TODO(Babel 8): Remove
  decoratorsBeforeExport?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(7);

  let { version } = options;

  if (process.env.BABEL_8_BREAKING) {
    if (version === undefined) {
      throw new Error(
        "The decorators plugin requires a 'version' option, whose value must be one of: " +
          "'2023-05', '2023-01', '2022-03', '2021-12', '2018-09', or 'legacy'.",
      );
    }
    if (
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
  } else {
    const { legacy } = options;

    if (legacy !== undefined) {
      if (typeof legacy !== "boolean") {
        throw new Error(".legacy must be a boolean.");
      }
      if (version !== undefined) {
        throw new Error(
          "You can either use the .legacy or the .version option, not both.",
        );
      }
    }

    if (version === undefined) {
      version = legacy ? "legacy" : "2018-09";
    } else if (
      version !== "2023-05" &&
      version !== "2023-01" &&
      version !== "2022-03" &&
      version !== "2021-12" &&
      version !== "2018-09" &&
      version !== "legacy"
    ) {
      throw new Error("Unsupported decorators version: " + version);
    }

    // eslint-disable-next-line no-var
    var { decoratorsBeforeExport } = options;
    if (decoratorsBeforeExport === undefined) {
      if (version === "2021-12" || version === "2022-03") {
        decoratorsBeforeExport = false;
      } else if (version === "2018-09") {
        throw new Error(
          "The decorators plugin, when .version is '2018-09' or not specified," +
            " requires a 'decoratorsBeforeExport' option, whose value must be a boolean.",
        );
      }
    } else {
      if (
        version === "legacy" ||
        version === "2022-03" ||
        version === "2023-01"
      ) {
        throw new Error(
          `'decoratorsBeforeExport' can't be used with ${version} decorators.`,
        );
      }
      if (typeof decoratorsBeforeExport !== "boolean") {
        throw new Error("'decoratorsBeforeExport' must be a boolean.");
      }
    }
  }

  return {
    name: "syntax-decorators",

    manipulateOptions({ generatorOpts }, parserOpts) {
      if (version === "legacy") {
        parserOpts.plugins.push("decorators-legacy");
      } else if (process.env.BABEL_8_BREAKING) {
        parserOpts.plugins.push(
          ["decorators", { allowCallParenthesized: false }],
          "decoratorAutoAccessors",
        );
      } else {
        if (version === "2023-01" || version === "2023-05") {
          parserOpts.plugins.push(
            ["decorators", { allowCallParenthesized: false }],
            "decoratorAutoAccessors",
          );
        } else if (version === "2022-03") {
          parserOpts.plugins.push(
            [
              "decorators",
              { decoratorsBeforeExport: false, allowCallParenthesized: false },
            ],
            "decoratorAutoAccessors",
          );
        } else if (version === "2021-12") {
          parserOpts.plugins.push(
            ["decorators", { decoratorsBeforeExport }],
            "decoratorAutoAccessors",
          );
          generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
        } else if (version === "2018-09") {
          parserOpts.plugins.push(["decorators", { decoratorsBeforeExport }]);
          generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
        }
      }
    },
  };
});
