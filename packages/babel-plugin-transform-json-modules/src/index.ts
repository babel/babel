/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import { createImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";

export interface Options {
  uncheckedRequire: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.22.0 || ^8.0.0"));

  const { types: t, template } = api;

  return createImportTypeAsDefaultPlugin({
    name: "transform-json-modules",

    api,
    type: "json",
    transformers: {
      commonJS: options.uncheckedRequire
        ? (require, specifier) => t.callExpression(require, [specifier])
        : undefined,
      webFetch: fetch => template.expression.ast`${fetch}.then(r => r.json())`,
      nodeFsSync: read => template.expression.ast`JSON.parse(${read})`,
      nodeFsAsync: () => template.expression.ast`JSON.parse`,
    },
  });
});
