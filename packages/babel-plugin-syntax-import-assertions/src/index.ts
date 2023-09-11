import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(process.env.BABEL_8_BREAKING ? PACKAGE_JSON.version : 7);

  return {
    name: "syntax-import-assertions",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("importAssertions");
    },
  };
});
