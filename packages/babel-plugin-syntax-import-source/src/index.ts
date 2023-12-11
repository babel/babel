import { declare } from "@babel/helper-plugin-utils";
export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : "^7.22.0",
  );

  return {
    name: "syntax-import-source",

    manipulateOptions({ parserOpts }) {
      parserOpts.plugins.push("sourcePhaseImports");
      parserOpts.createImportExpressions = true;
    },
  };
});
