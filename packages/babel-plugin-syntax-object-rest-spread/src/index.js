import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("objectRestSpread");
    },
  };
});
