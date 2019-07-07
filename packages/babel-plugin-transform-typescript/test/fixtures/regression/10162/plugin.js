"use strict";

module.exports = function({ template, types: t }) {
  const warnings = [];
  let consoleWarn;

  return {
    pre() {
      consoleWarn = console.warn;
      console.warn = msg => warnings.push(msg);
    },

    post({ path }) {
      console.warn = consoleWarn;

      path.pushContainer(
        "body",
        t.expressionStatement(t.valueToNode(warnings)),
      );
    },

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
