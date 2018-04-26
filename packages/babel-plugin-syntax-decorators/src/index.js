import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(legacy ? "decorators-legacy" : "decorators");
    },
  };
});
