/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";
import legacyVisitor from "./transformer-legacy";
import transformer2022_03 from "./transformer-2022-03";
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
  } else if (version === "2021-12" || version === "2022-03") {
    return transformer2022_03(api, options, version);
  } else if (!process.env.BABEL_8_BREAKING) {
    api.assertVersion("^7.0.2");
    return createClassFeaturePlugin({
      name: "proposal-decorators",

      api,
      feature: FEATURES.decorators,
      inherits: syntaxDecorators,
      // loose: options.loose, Not supported
    });
  } else {
    throw new Error(
      "The '.version' option must be one of 'legacy', '2021-12' or '2022-03'.",
    );
  }
});
