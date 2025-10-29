import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0-0"));

  return {
    name: "syntax-function-sent",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("functionSent");
    },
  };
});
