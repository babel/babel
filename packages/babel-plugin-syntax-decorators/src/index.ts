import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  let { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }
  const { decoratorsBeforeExport, version = "2018-09" } = options;
  if (
    !(version === "2021-12" || version === "2018-09" || version === "legacy")
  ) {
    throw new Error("Unsupported decorators version: " + version);
  }
  if (options.version !== undefined && options.legacy !== undefined) {
    throw new Error(
      'You can either specify `legacy: true` or `version: "legacy"` with decorators, not both.',
    );
  }
  legacy ||= version === "legacy";

  if (decoratorsBeforeExport === undefined) {
    if (!legacy) {
      throw new Error(
        "The decorators plugin requires a 'decoratorsBeforeExport' option," +
          " whose value must be a boolean. If you want to use the legacy" +
          " decorators semantics, you can set the `version: 'legacy'` option.",
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
      }
    },
  };
});
