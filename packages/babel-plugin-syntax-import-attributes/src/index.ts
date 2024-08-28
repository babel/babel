import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  deprecatedAssertSyntax?: boolean;
}

export default declare((api, { deprecatedAssertSyntax }: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.22.0"));

  if (
    deprecatedAssertSyntax != null &&
    typeof deprecatedAssertSyntax !== "boolean"
  ) {
    throw new Error(
      "'deprecatedAssertSyntax' must be a boolean, if specified.",
    );
  }

  return {
    name: "syntax-import-attributes",

    manipulateOptions({ parserOpts, generatorOpts }) {
      generatorOpts.importAttributesKeyword ??= "with";

      const importAssertionsPluginIndex =
        parserOpts.plugins.indexOf("importAssertions");
      if (importAssertionsPluginIndex !== -1) {
        parserOpts.plugins.splice(importAssertionsPluginIndex, 1);
        deprecatedAssertSyntax = true;
      }

      parserOpts.plugins.push([
        "importAttributes",
        { deprecatedAssertSyntax: Boolean(deprecatedAssertSyntax) },
      ]);
    },
  };
});
