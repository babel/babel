import { declare } from "@babel/helper-plugin-utils";

export default declare((api, options) => {
  api.assertVersion(7);

  const { all } = options;

  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("flow");
      parserOpts.flowAll = all;
    },
  };
});
