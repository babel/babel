import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath } from "@babel/core";

export default declare(function ({ types: t }) {
  function maybeReplace(source: t.Node) {
    if (!t.isStringLiteral(source)) return;

    if (/[\\/]/.test(source.value)) {
      source.value = source.value
        .replace(/(\.[mc]?)ts$/, "$1js")
        .replace(/\.tsx$/, ".js");
    }
  }

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
        if (kind === "value" && source) {
          maybeReplace(source);
        }
      },
      CallExpression(path) {
        if (t.isImport(path.node.callee)) {
          maybeReplace(path.node.arguments[0]);
        }
      },
      ImportExpression(path) {
        maybeReplace(path.node.source);
      },
    },
  };
});
