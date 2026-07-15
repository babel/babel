/* eslint-disable @babel/development/plugin-name */

import { buildImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";

export default buildImportTypeAsDefaultPlugin(
  "proposal-bytes-modules",
  "bytes",
  ({ template, types: t }) => ({
    webFetch: (fetch, file) =>
      template.expression.ast`
        ${fetch}.then(r => r.bytes()).then(${file.addHelper("immutableUint8Array")})
      `,
    nodeFsSync: (buf, file) =>
      t.callExpression(file.addHelper("immutableUint8Array"), [buf]),
    nodeFsAsync: file => file.addHelper("immutableUint8Array"),
  }),
);
