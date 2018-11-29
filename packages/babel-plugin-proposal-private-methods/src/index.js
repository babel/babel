import { declare } from "@babel/helper-plugin-utils";
import pluginClassFeatures, {
  enableFeature,
  FEATURES,
} from "@babel/plugin-class-features";

export default declare((api, options) => {
  api.assertVersion(7);

  const { loose } = options;

  return {
    name: "proposal-private-methods",

    inherits: pluginClassFeatures,

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classPrivateMethods");
    },

    pre() {
      enableFeature(this.file, FEATURES.privateMethods, loose);
    },
  };
});
