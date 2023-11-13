import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  return {
    name: "transform-export-namespace-from",
    inherits: USE_ESM
      ? undefined
      : IS_STANDALONE
        ? undefined
        : // eslint-disable-next-line no-restricted-globals
          require("@babel/plugin-syntax-export-namespace-from").default,

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
        const uid = scope.generateUidIdentifier(
          // @ts-expect-error Identifier ?? StringLiteral
          exported.name ?? exported.value,
        );

        nodes.push(
          t.importDeclaration(
            [t.importNamespaceSpecifier(uid)],
            t.cloneNode(node.source),
          ),
          t.exportNamedDeclaration(null, [
            t.exportSpecifier(t.cloneNode(uid), exported),
          ]),
        );

        if (node.specifiers.length >= 1) {
          nodes.push(node);
        }

        const [importDeclaration] = path.replaceWithMultiple(nodes);
        path.scope.registerDeclaration(importDeclaration);
      },
    },
  };
});
