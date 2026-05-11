/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";

export interface Options {
  /** @deprecated Use the `privateFieldsAsProperties`(or `privateFieldsAsSymbols`), and `setPublicClassFields` assumptions instead. */
  loose?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("loose" in options) {
    console.warn(
      "@babel/plugin-transform-private-methods: The 'loose' option has been deprecated, " +
        "use the `privateFieldsAsProperties`(or `privateFieldsAsSymbols`), and `setPublicClassFields` assumptions instead (https://babeljs.io/assumptions).",
    );
  }

  return createClassFeaturePlugin({
    name: "transform-private-methods",

    api,
    feature: FEATURES.privateMethods,
    loose: options.loose,
  });
});
