/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createDestructuringPlugin,
  FEATURES,
} from "@babel/helper-create-destructuring-plugin";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.17.0 || ^8.0.0"));

  const ignoreFunctionLength = api.assumption("ignoreFunctionLength");
  const objectRestNoSymbols = api.assumption("objectRestNoSymbols");

  return createDestructuringPlugin({
    name: "proposal-destructuring-private",
    api,
    feature: FEATURES.privateDestructuring,
    manipulateOptions: (_, parserOpts) =>
      parserOpts.plugins.push("destructuringPrivate"),
    options: {
      useBuiltIns: true,
      ignoreFunctionLength,
      objectRestNoSymbols,
    },
  });
});
