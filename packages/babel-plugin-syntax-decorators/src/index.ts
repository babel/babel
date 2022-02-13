import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  legacy?: boolean;
  // TODO(Babel 8): Remove "2018-09"
  version?: "legacy" | "2018-09" | "2021-12";
  decoratorsBeforeExport?: boolean;
}

const VALID_VERSIONS = process.env.BABEL_8_BREAKING
  ? new Set(["2021-12", "legacy"])
  : new Set(["2021-12", "2018-09", "legacy"]);

export default declare((api, options: Options) => {
  api.assertVersion(7);

  if (!process.env.BABEL_8_BREAKING) {
    const { legacy } = options;
    // eslint-disable-next-line no-var
    var { version = legacy ? "legacy" : "2018-09" } = options;

    if (legacy !== undefined) {
      if (typeof legacy !== "boolean") {
        throw new Error(".legacy must be a boolean.");
      }
      if (options.version !== undefined) {
        throw new Error(
          "You can either use the .legacy or the .version option, not both.",
        );
      }
    }
  } else {
    // eslint-disable-next-line no-var
    var { version } = options;
  }
  if (version === undefined) {
    throw new Error(
      "The decorators plugin requires a 'version' option, whose value must be one of: " +
        Array.from(VALID_VERSIONS, v => `'${v}'`).join(", "),
    );
  }
  if (!VALID_VERSIONS.has(version)) {
    throw new Error("Unsupported decorators version: " + version);
  }

  let { decoratorsBeforeExport } = options;
  if (decoratorsBeforeExport === undefined) {
    if (version === "2021-12") {
      decoratorsBeforeExport = false;
    }
    if (!process.env.BABEL_8_BREAKING) {
      if (version === "2018-09") {
        throw new Error(
          "The decorators plugin, when .version is '2018-09' or not specified," +
            " requires a 'decoratorsBeforeExport' option, whose value must be a boolean.",
        );
      }
    }
  } else {
    if (version === "legacy") {
      throw new Error(
        "'decoratorsBeforeExport' can't be used with legacy decorators.",
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  return {
    name: "syntax-decorators",

    manipulateOptions({ generatorOpts }, parserOpts) {
      if (version === "legacy") {
        parserOpts.plugins.push("decorators-legacy");
      } else if (version === "2021-12") {
        parserOpts.plugins.push(
          ["decorators", { decoratorsBeforeExport }],
          "decoratorAutoAccessors",
        );
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      } else if (!process.env.BABEL_8_BREAKING) {
        if (version === "2018-09") {
          parserOpts.plugins.push(["decorators", { decoratorsBeforeExport }]);
          generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
        }
      }
    },
  };
});
