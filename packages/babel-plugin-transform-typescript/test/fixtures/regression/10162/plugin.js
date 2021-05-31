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

      const stmt = t.expressionStatement(t.valueToNode(warnings));
      path.pushContainer("body", stmt);
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
