import { declare } from "@babel/helper-plugin-utils";
import type { types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";

export default declare(function () {
  return {
    visitor: {
      "ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration"(
        path: NodePath<
          | t.ImportDeclaration
          | t.ExportAllDeclaration
          | t.ExportNamedDeclaration
        >,
      ) {
        const { source } = path.node;
        if (source) {
          source.value = source.value.replace(/(\.[mc]?)ts$/, "$1js");
        }
      },
    },
  };
});
