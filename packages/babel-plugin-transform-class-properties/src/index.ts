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
    name: "transform-class-properties",

    api,
    feature: FEATURES.fields,
    loose: options.loose,

    manipulateOptions(opts, parserOpts) {
      if (!process.env.BABEL_8_BREAKING) {
        // @ts-ignore(Babel 7 vs Babel 8) These plugins have been removed
        parserOpts.plugins.push("classProperties", "classPrivateProperties");
      }
    },
  });
});
