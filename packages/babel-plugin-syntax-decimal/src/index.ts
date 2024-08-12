import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "syntax-decimal",

    manipulateOptions(opts, parserOpts) {
      // @ts-ignore(Babel 7 vs Babel 8) Removed in Babel 8
      parserOpts.plugins.push("decimal");
    },
  };
});
