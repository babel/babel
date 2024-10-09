import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "proposal-export-default-from",
    manipulateOptions: (_, parser) => parser.plugins.push("exportDefaultFrom"),

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

        path.insertBefore(
          t.exportNamedDeclaration(
            null,
            [t.exportSpecifier(t.identifier("default"), exported)],
            t.cloneNode(source),
          ),
        );
      },
    },
  };
});
