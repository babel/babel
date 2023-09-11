/* eslint-disable @babel/development/plugin-name */
import { createRegExpFeaturePlugin } from "@babel/helper-create-regexp-features-plugin";
import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  runtime?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING ? PACKAGE_JSON.version : "^7.19.0",
  );

  const { runtime } = options;
  if (runtime !== undefined && typeof runtime !== "boolean") {
    throw new Error("The 'runtime' option must be boolean");
  }

  return createRegExpFeaturePlugin({
    name: "proposal-duplicate-named-capturing-groups-regex",
    feature: "duplicateNamedCaptureGroups",
    options: { runtime },
  });
});
