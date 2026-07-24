/* eslint-disable @babel/development/plugin-name */
import { buildImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";

export default buildImportTypeAsDefaultPlugin(
  "proposal-text-modules",
  "text",
  ({ template, types: t }) => ({
    webFetch: fetch => template.expression.ast`${fetch}.then(r => r.text())`,
    nodeFsSync: buf => t.callExpression(t.identifier("String"), [buf]),
    nodeFsAsync: () => t.identifier("String"),
  }),
);
