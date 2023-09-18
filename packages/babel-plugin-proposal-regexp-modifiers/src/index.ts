/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : "^7.19.0",
  );

  return createRegExpFeaturePlugin({
    name: "proposal-regexp-modifiers",
    feature: "modifiers",
  });
});
