/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import {
  createClassFeaturePlugin,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";
import legacyVisitor from "./transformer-legacy";
import transformer2021_12 from "./transformer-2021-12";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  const { decoratorsBeforeExport, version } = options;
  if (decoratorsBeforeExport === undefined) {
    if (!legacy) {
      throw new Error(
        "The decorators plugin requires a 'decoratorsBeforeExport' option," +
          " whose value must be a boolean. If you want to use the legacy" +
          " decorators semantics, you can set the 'legacy: true' option.",
      );
    }
  } else {
    if (legacy) {
      throw new Error(
        "'decoratorsBeforeExport' can't be used with legacy decorators.",
      );
    }
    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  if (legacy) {
    if (version !== undefined) {
      throw new Error("'version' can't be used with legacy decorators");
    }

    return {
      name: "proposal-decorators",
      inherits: syntaxDecorators,
      manipulateOptions({ generatorOpts }) {
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      },
      visitor: legacyVisitor,
    };
  }

  if (version === "2021-12") {
    return transformer2021_12(api, options);
  } else if (!(version === "2018-09" || version === undefined)) {
    throw new Error("Unsupported decorators version: " + version);
  }

  return createClassFeaturePlugin({
    name: "proposal-decorators",

    api,
    feature: FEATURES.decorators,
    // loose: options.loose, Not supported

    manipulateOptions({ generatorOpts, parserOpts }) {
      parserOpts.plugins.push(["decorators", { decoratorsBeforeExport }]);
      generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
    },
  });
});
