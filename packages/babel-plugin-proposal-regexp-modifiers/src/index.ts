/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion("^7.19.0");

  return createRegExpFeaturePlugin({
    name: "proposal-regexp-modifiers",
    feature: "modifiers",
  });
});
