import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  deprecatedAssertSyntax?: boolean;
}

export default declare((api, { deprecatedAssertSyntax }: Options) => {
  api.assertVersion("^7.22.0");

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
      parserOpts.plugins.push([
        "importAttributes",
        { deprecatedAssertSyntax: Boolean(deprecatedAssertSyntax) },
      ]);
    },
  };
});
