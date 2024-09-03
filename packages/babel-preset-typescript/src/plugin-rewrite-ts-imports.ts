import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath } from "@babel/core";

export default declare(function ({ types: t }) {
  function maybeReplace(
    source: t.ArgumentPlaceholder | t.SpreadElement | t.Expression,
    path: NodePath,
  ) {
    if (!source) return;
    if (t.isStringLiteral(source)) {
      if (/[\\/]/.test(source.value)) {
        source.value = source.value
          .replace(/(\.[mc]?)ts$/, "$1js")
          .replace(/\.tsx$/, ".js");
      }
      return;
    }

    try {
      path.replaceWith(
        t.callExpression(path.hub.addHelper("replaceTsImportExt"), [source]),
      );
    } catch {
      // replaceTsImportExt may not be available
    }
  }

  return {
    name: "preset-typescript/plugin-rewrite-ts-imports",
    visitor: {
      "ImportDeclaration|ExportAllDeclaration|ExportNamedDeclaration"(
        path: NodePath<
          | t.ImportDeclaration
          | t.ExportAllDeclaration
          | t.ExportNamedDeclaration
        >,
      ) {
        const node = path.node;
        const kind = t.isImportDeclaration(node)
          ? node.importKind
          : node.exportKind;
        if (kind === "value") {
          maybeReplace(node.source, path.get("source"));
        }
      },
      CallExpression(path) {
        if (t.isImport(path.node.callee)) {
          maybeReplace(path.node.arguments[0], path.get("arguments.0"));
        }
      },
      ImportExpression(path) {
        maybeReplace(path.node.source, path.get("source"));
      },
    },
  };
});
