/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";
import legacyVisitor from "./transformer-legacy";
import transformer2021_12 from "./transformer-2021-12";
import type { Options as SyntaxOptions } from "@babel/plugin-syntax-decorators";

interface Options extends SyntaxOptions {
  /** @depreated use `constantSuper` assumption instead. Only supported in 2021-12 version. */
  loose?: boolean;
}

export type { Options };

export default declare((api, options: Options) => {
  api.assertVersion(7);

  // Options are validated in @babel/plugin-syntax-decorators
  if (!process.env.BABEL_8_BREAKING) {
    // eslint-disable-next-line no-var
    var { legacy } = options;
  }
  const { version } = options;

  if (
    process.env.BABEL_8_BREAKING
      ? version === "legacy"
      : legacy || version === "legacy"
  ) {
    return {
      name: "proposal-decorators",
      inherits: syntaxDecorators,
      visitor: legacyVisitor,
    };
  } else if (version === "2021-12") {
    return transformer2021_12(api, options);
  } else if (!process.env.BABEL_8_BREAKING) {
    return createClassFeaturePlugin({
      name: "proposal-decorators",

      api,
      feature: FEATURES.decorators,
      inherits: syntaxDecorators,
      // loose: options.loose, Not supported
    });
  } else {
    throw new Error(
      "The '.version' option must be one of 'legacy' or '2021-12'",
    );
  }
});
