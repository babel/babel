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
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  return createClassFeaturePlugin({
    name: "transform-private-methods",

    api,
    feature: FEATURES.privateMethods,
    loose: options.loose,
  });
});
