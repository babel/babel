/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";
import legacyVisitor from "./transformer-legacy.ts";
import type { Options } from "@babel/plugin-syntax-decorators";

export type { Options };

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  // Options are validated in @babel/plugin-syntax-decorators

  const { version } = options;

  if (version === "legacy") {
    return {
      name: "proposal-decorators",
      inherits: syntaxDecorators,
      visitor: legacyVisitor,
    };
  } else if (!version || version === "2023-11") {
    api.assertVersion(REQUIRED_VERSION("^7.0.2 || ^8.0.0"));
    return createClassFeaturePlugin({
      name: "proposal-decorators",

      api,
      feature: FEATURES.decorators,
      inherits: syntaxDecorators,
      decoratorVersion: version,
    });
  } else {
    throw new Error(
      "The '.version' option must be one of 'legacy' or '2023-11'.",
    );
  }
});
