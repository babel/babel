/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";

export interface Options {
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  return createClassFeaturePlugin({
    name: "transform-private-methods",

    api,
    feature: FEATURES.privateMethods,
    loose: options.loose,

    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        // @ts-ignore(Babel 7 vs Babel 8) This plugin has been removed
        parserOpts.plugins.push("classPrivateMethods");
      }
    },
  });
});
