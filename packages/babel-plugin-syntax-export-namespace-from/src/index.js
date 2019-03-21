import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-export-namespace-from",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("exportNamespaceFrom");
    },
  };
});
