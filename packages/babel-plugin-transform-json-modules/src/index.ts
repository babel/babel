/* eslint-disable @babel/development/plugin-name */

import { buildImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";

export interface Options {
  uncheckedRequire: boolean;
}

export default buildImportTypeAsDefaultPlugin(
  "transform-json-modules",
  "json",
  ({ template, types: t }, options: Options) => ({
    commonJS: options.uncheckedRequire
      ? (require, specifier) => t.callExpression(require, [specifier])
      : undefined,
    webFetch: fetch => template.expression.ast`${fetch}.then(r => r.json())`,
    nodeFsSync: read => template.expression.ast`JSON.parse(${read})`,
    nodeFsAsync: () => template.expression.ast`JSON.parse`,
  }),
);
