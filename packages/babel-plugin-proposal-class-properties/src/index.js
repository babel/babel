/* eslint-disable local-rules/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-class-features-plugin";

export default declare((api, options) => {
  api.assertVersion(7);

  return createClassFeaturePlugin({
    name: "proposal-class-properties",

    feature: FEATURES.fields,
    loose: options.loose,

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classProperties", "classPrivateProperties");
    },
  });
});
