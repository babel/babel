import { declare } from "@babel/helper-plugin-utils";
import type { types as t, NodePath } from "@babel/core";
import syntaxImportAttributes from "@babel/plugin-syntax-import-attributes";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "proposal-import-attributes-to-assertions",

    inherits: syntaxImportAttributes,

    manipulateOptions({ generatorOpts }) {
      generatorOpts.importAttributesKeyword = "assert";
    },

    visitor: {
      "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration"(
        path: NodePath<
          | t.ImportDeclaration
          | t.ExportNamedDeclaration
          | t.ExportAllDeclaration
        >,
      ) {
        const { node } = path;
        if (!node.attributes) return;
        node.assertions = node.attributes;
        node.attributes = null;
      },
    },
  };
});
