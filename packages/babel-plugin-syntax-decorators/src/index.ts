import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false, version } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  const { decoratorsBeforeExport } = options;
  if (decoratorsBeforeExport === undefined) {
    if (!legacy) {
      throw new Error(
        "The '@babel/plugin-syntax-decorators' plugin requires a" +
          " 'decoratorsBeforeExport' option, whose value must be a boolean." +
          " If you want to use the legacy decorators semantics, you can set" +
          " the 'legacy: true' option.",
      );
    }
  } else {
    if (legacy) {
      throw new Error(
        "'decoratorsBeforeExport' can't be used with legacy decorators.",
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  if (
    !(version === "2021-12" || version === "2018-09" || version === undefined)
  ) {
    throw new Error("Unsupported decorators version: " + version);
  }

  return {
    name: "syntax-decorators",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(
        legacy
          ? "decorators-legacy"
          : ["decorators", { decoratorsBeforeExport }],
      );

      if (version === "2021-12") {
        parserOpts.plugins.push("decoratorAutoAccessors");
        parserOpts.plugins.push("classStaticBlock");
      }
    },
  };
});
