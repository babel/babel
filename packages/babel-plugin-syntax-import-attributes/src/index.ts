import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  deprecatedAssertSyntax?: boolean;
}

export default declare((api, { deprecatedAssertSyntax }: Options) => {
  api.assertVersion(7);

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

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push([
        "importAttributes",
        { deprecatedAssertSyntax: Boolean(deprecatedAssertSyntax) },
      ]);
    },
  };
});
