import syntaxExportExtensions from "@babel/plugin-syntax-export-extensions";
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    inherits: syntaxExportExtensions,

    visitor: {
      ExportNamedDeclaration(path) {
        const { node, scope } = path;
        const { specifiers } = node;
        if (!t.isExportDefaultSpecifier(specifiers[0])) return;

        const specifier = specifiers.shift();
        const { exported } = specifier;
        const uid = scope.generateUidIdentifier(exported.name);

        const nodes = [
          t.importDeclaration([t.importDefaultSpecifier(uid)], node.source),
          t.exportNamedDeclaration(null, [t.exportSpecifier(uid, exported)]),
        ];

        if (specifiers.length >= 1) {
          nodes.push(node);
        }

        path.replaceWithMultiple(nodes);
      },
    },
  };
}
