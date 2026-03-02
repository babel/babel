/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  runtime?: boolean;
}

export default declare((api, options: Options) => {
  const { runtime } = options;
  if (runtime !== undefined && typeof runtime !== "boolean") {
    throw new Error("The 'runtime' option must be boolean");
  }

  return createRegExpFeaturePlugin({
    name: "transform-named-capturing-groups-regex",
    feature: "namedCaptureGroups",
    options: { runtime },
  });
});
