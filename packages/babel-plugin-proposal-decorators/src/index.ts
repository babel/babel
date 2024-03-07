/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";
import legacyVisitor from "./transformer-legacy.ts";
import type { Options as SyntaxOptions } from "@babel/plugin-syntax-decorators";

interface Options extends SyntaxOptions {
  /** @deprecated use `constantSuper` assumption instead. Only supported in 2021-12 version. */
  loose?: boolean;
}

export type { Options };

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

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
  } else if (
    !version ||
    version === "2018-09" ||
    version === "2021-12" ||
    version === "2022-03" ||
    version === "2023-01" ||
    version === "2023-05" ||
    version === "2023-11"
  ) {
    api.assertVersion(REQUIRED_VERSION("^7.0.2"));
    return createClassFeaturePlugin({
      name: "proposal-decorators",

      api,
      feature: FEATURES.decorators,
      inherits: syntaxDecorators,
      // @ts-expect-error version must not be "legacy" here
      decoratorVersion: version,
      // loose: options.loose, Not supported
    });
  } else {
    throw new Error(
      "The '.version' option must be one of 'legacy', '2023-11', '2023-05', '2023-01', '2022-03', or '2021-12'.",
    );
  }
});
