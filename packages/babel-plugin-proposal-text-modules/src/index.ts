/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import { createImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^8.0.0"));

  const { types: t, template } = api;

  return createImportTypeAsDefaultPlugin({
    name: "proposal-text-modules",

    api,
    type: "text",
    transformers: {
      webFetch: fetch => template.expression.ast`${fetch}.then(r => r.text())`,
      nodeFsSync: buf => t.callExpression(t.identifier("String"), [buf]),
      nodeFsAsync: () => t.identifier("String"),
    },
  });
});
