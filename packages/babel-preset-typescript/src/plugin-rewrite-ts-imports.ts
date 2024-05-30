import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath } from "@babel/core";

export default declare(function ({ types: t }) {
  return {
    name: "preset-typescript/plugin-rewrite-ts-imports",
    visitor: {
      "ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration"({
        node,
      }: NodePath<
        t.ImportDeclaration | t.ExportAllDeclaration | t.ExportNamedDeclaration
      >) {
        const { source } = node;
        const kind = t.isImportDeclaration(node)
          ? node.importKind
          : node.exportKind;
        if (kind === "value" && source && /[\\/]/.test(source.value)) {
          source.value = source.value
            .replace(/(\.[mc]?)ts$/, "$1js")
            .replace(/\.tsx$/, ".js");
        }
      },
    },
  };
});
