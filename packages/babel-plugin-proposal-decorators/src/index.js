import { declare } from "@babel/helper-plugin-utils";
import legacyVisitor from "./transformer-legacy";
import proposalEnhancedClasses, {
  enableFeature,
  FEATURES,
} from "@babel/plugin-proposal-enhanced-classes";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  const { decoratorsBeforeExport } = options;
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
    inherits: legacy ? undefined : proposalEnhancedClasses,

    manipulateOptions({ generatorOpts, parserOpts }) {
      parserOpts.plugins.push(legacy ? "decorators-legacy" : "decorators");
      generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
    },

    pre() {
      if (!legacy) {
        enableFeature(this.file, FEATURES.decorators);
      }
    },

    visitor: legacy ? legacyVisitor : undefined,
  };
});
