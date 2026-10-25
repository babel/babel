/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import { createImportTypeAsDefaultPlugin } from "@babel/helper-import-to-platform-api";
import type { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^8.0.0"));

  const { types: t, template } = api;

  const toStringStripBOM = (buf: t.Node) => template.expression.ast`
    String(${buf}).replace(/^\\xEF\\xBB\\xBF/, "")
  `;

  return createImportTypeAsDefaultPlugin({
    name: "proposal-text-modules",

    api,
    type: "text",
    transformers: {
      webFetch: (fetch, file) =>
        template.expression
          .ast`${file.addHelper("processResponse")}(${fetch}, "text")`,
      nodeFsSync: toStringStripBOM,
      nodeFsAsync: () =>
        template.expression.ast`_ => ${toStringStripBOM(t.identifier("_"))}`,
    },
  });
});
