import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "syntax-import-reflection",

    manipulateOptions(_, parserOpts) {
      parserOpts.plugins.push("importReflection");
    },
  };
});
