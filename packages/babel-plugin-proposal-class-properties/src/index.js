import { declare } from "@babel/helper-plugin-utils";
import proposalEnhancedClasses, {
  enableFeature,
  FEATURES,
  setLoose,
} from "@babel/plugin-proposal-enhanced-classes";

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;

  return {
    inherits: proposalEnhancedClasses,

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classProperties", "classPrivateProperties");
    },

    pre() {
      setLoose(this.file, loose);
      enableFeature(this.file, FEATURES.instanceFields);
      enableFeature(this.file, FEATURES.staticFields);
    },
  };
});
