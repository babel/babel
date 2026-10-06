/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import { createImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^8.0.0"));

  const { types: t, template } = api;

  return createImportTypeAsDefaultPlugin({
    name: "proposal-bytes-modules",

    api,
    type: "bytes",
    transformers: {
      webFetch: (fetch, file) =>
        template.expression.ast`
          ${fetch}.then(r => r.bytes()).then(${file.addHelper("immutableUint8Array")})
        `,
      nodeFsSync: (buf, file) =>
        t.callExpression(file.addHelper("immutableUint8Array"), [buf]),
      nodeFsAsync: file => file.addHelper("immutableUint8Array"),
    },
  });
});
