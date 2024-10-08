/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.19.0"));

  return createRegExpFeaturePlugin({
    name: "transform-regexp-modifiers",
    feature: "modifiers",
  });
});
