import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-nullish-coalescing-operator",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("nullishCoalescingOperator");
    },
  };
});
