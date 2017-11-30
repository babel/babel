import syntaxExportNamespaceFrom from "@babel/plugin-syntax-export-namespace-from";
import { types as t } from "@babel/core";

export default function() {
  return {
    inherits: syntaxExportNamespaceFrom,

    visitor: {
      ExportNamedDeclaration(path) {
        const { node, scope } = path;
        const { specifiers } = node;

        const index = t.isExportDefaultSpecifier(specifiers[0]) ? 1 : 0;
        if (!t.isExportNamespaceSpecifier(specifiers[index])) return;

        const nodes = [];

        if (index === 1) {
          nodes.push(
            t.exportNamedDeclaration(null, [specifiers.shift()], node.source),
          );
        }

        const specifier = specifiers.shift();
        const { exported } = specifier;
        const uid = scope.generateUidIdentifier(exported.name);

        nodes.push(
          t.importDeclaration([t.importNamespaceSpecifier(uid)], node.source),
          t.exportNamedDeclaration(null, [t.exportSpecifier(uid, exported)]),
        );

        if (node.specifiers.length >= 1) {
          nodes.push(node);
        }

        path.replaceWithMultiple(nodes);
      },
    },
  };
}
