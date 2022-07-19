import { declare } from "@babel/helper-plugin-utils";
import syntaxExportDefaultFrom from "@babel/plugin-syntax-export-default-from";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "proposal-export-default-from",
    inherits: syntaxExportDefaultFrom,

    visitor: {
      ExportNamedDeclaration(path) {
        const { node } = path;
        const { specifiers, source } = node;
        if (!t.isExportDefaultSpecifier(specifiers[0])) return;

        const { exported } = specifiers.shift();

        if (specifiers.every(s => t.isExportSpecifier(s))) {
          specifiers.unshift(
            t.exportSpecifier(t.identifier("default"), exported),
          );
          return;
        }

        const nodes = [
          t.exportNamedDeclaration(
            null,
            [t.exportSpecifier(t.identifier("default"), exported)],
            t.cloneNode(source),
          ),
        ];

        if (specifiers.length >= 1) {
          nodes.push(node);
        }

        path.replaceWithMultiple(nodes);
      },
    },
  };
});
