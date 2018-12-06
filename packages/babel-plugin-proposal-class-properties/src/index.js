/* eslint-disable local-rules/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createClassFeaturePlugin,
  FEATURES,
  OPTIONS,
} from "@babel/helper-create-class-features-plugin";

export default declare((api, options) => {
  api.assertVersion(7);

  const { ignoreUninitialized = false, loose = false } = options;

  return createClassFeaturePlugin({
    name: "proposal-class-properties",

    feature: FEATURES.fields,
    loose,
    options: [[OPTIONS.fields.ignoreUninitialized, ignoreUninitialized]],

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("classProperties", "classPrivateProperties");
    },
  });
});
