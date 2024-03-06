import { declare } from "@babel/helper-plugin-utils";
export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.22.0"));

  return {
    name: "syntax-import-source",

    manipulateOptions({ parserOpts }) {
      parserOpts.plugins.push("sourcePhaseImports");
      parserOpts.createImportExpressions = true;
    },
  };
});
