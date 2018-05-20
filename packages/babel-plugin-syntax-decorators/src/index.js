import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  let { decoratorsBeforeExport } = options;
  if (decoratorsBeforeExport !== undefined) {
    if (legacy) {
      throw new Error(
        "'decoratorsBeforeExport' can't be used with legacy decorators.",
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  } else if (!legacy) {
    decoratorsBeforeExport = true;
  }

  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(
        legacy
          ? "decorators-legacy"
          : ["decorators", { decoratorsBeforeExport }],
      );
    },
  };
});
