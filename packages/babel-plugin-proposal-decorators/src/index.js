import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import visitor from "./transformer";
import legacyVisitor from "./transformer-legacy";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  let { decoratorsBeforeExport } = options;
  if (decoratorsBeforeExport !== undefined) {
    if (legacy) {
      throw new Error(
        "'decoratorsBeforeExport' can't be used with legacy decorators.",
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  } else if (!legacy) {
    decoratorsBeforeExport = true;
  }

  return {
    inherits: syntaxDecorators,

    manipulateOptions({ generatorOpts }) {
      generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
    },

    visitor: legacy ? legacyVisitor : visitor,
  };
});
