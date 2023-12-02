import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  return {
    name: "syntax-module-blocks",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("moduleBlocks");
    },
  };
});
