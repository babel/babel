"use strict";

module.exports = function ({ template, types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        path.insertBefore(template.statement.ast`
          const foo = ${path.node.declaration};
        `);

        path.node.declaration = t.identifier("foo");
      },
    },
  };
};
