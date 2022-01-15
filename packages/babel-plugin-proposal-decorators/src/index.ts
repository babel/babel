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

  const { legacy, decoratorsBeforeExport, version } = options;

  if (legacy) {
    return {
      name: "proposal-decorators",
      inherits: syntaxDecorators,
      manipulateOptions({ generatorOpts }) {
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      },
      visitor: legacyVisitor,
    };
  } else if (version === "2021-12") {
    return transformer2021_12(api, options);
  } else {
    const plugin = createClassFeaturePlugin({
      name: "proposal-decorators",

      api,
      feature: FEATURES.decorators,
      // loose: options.loose, Not supported

      manipulateOptions({ generatorOpts }) {
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      },
    });
    plugin.inherits = syntaxDecorators;
    return plugin;
  }
});
