import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import visitor from "./transformer";
import legacyVisitor from "./transformer-legacy";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false, decoratorsBeforeExport } = options;

  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  if (legacy !== true && false) {
    throw new Error(
      "The new decorators proposal is not supported yet." +
        ' You must pass the `"legacy": true` option to' +
        " @babel/plugin-proposal-decorators",
    );
  }

  if (decoratorsBeforeExport !== undefined) {
    if (legacy) {
      throw new Error(
        "'decoratorsBeforeExport' can't be used with legacy decorators.",
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  return {
    inherits: syntaxDecorators,

    manipulateOptions({ generatorOpts }) {
      generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
    },

    visitor: legacy ? legacyVisitor : visitor,
  };
});
