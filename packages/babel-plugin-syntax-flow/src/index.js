import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  // When enabled and plugins includes flow, all files should be parsed as if
  // the @flow pragma was provided.
  const { all } = options;

  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["flow", { all }]);
    },
  };
});
