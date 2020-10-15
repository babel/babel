import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-module-string-names",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("moduleStringNames");
    },
  };
});
