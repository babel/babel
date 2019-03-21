import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-async-generators",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("asyncGenerators");
    },
  };
});
