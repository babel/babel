/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  runtime?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.19.0 || ^8.0.0-0"));

  const { runtime } = options;
  if (runtime !== undefined && typeof runtime !== "boolean") {
    throw new Error("The 'runtime' option must be boolean");
  }

  return createRegExpFeaturePlugin({
    name: "transform-duplicate-named-capturing-groups-regex",
    feature: "duplicateNamedCaptureGroups",
    options: { runtime },
  });
});
