/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return createRegExpFeaturePlugin({
    name: "transform-unicode-sets-regex",
    feature: "unicodeSetsFlag",
    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        // @ts-ignore(Babel 7 vs Babel 8) This plugin has been removed
        parserOpts.plugins.push("regexpUnicodeSets");
      }
    },
  });
});
