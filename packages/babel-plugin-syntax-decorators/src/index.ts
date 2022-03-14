import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  const {
    legacy, // TODO: Remove in Babel 8

    version = legacy ? "legacy" : "2018-09",
    decoratorsBeforeExport = version === "2021-12" ? false : undefined,
  } = options;
  if (version !== "2021-12" && version !== "2018-09" && version !== "legacy") {
    throw new Error("Unsupported decorators version: " + version);
  }
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

  if (decoratorsBeforeExport === undefined) {
    if (version === "2018-09") {
      throw new Error(
        "The decorators plugin, when .version is '2018-09' or not specified," +
          " requires a 'decoratorsBeforeExport' option, whose value must be a boolean.",
      );
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
      } else if (version === "2018-09") {
        parserOpts.plugins.push(["decorators", { decoratorsBeforeExport }]);
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      } else {
        // version === "2021-12"
        parserOpts.plugins.push(
          ["decorators", { decoratorsBeforeExport }],
          "decoratorAutoAccessors",
        );
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      }
    },
  };
});
