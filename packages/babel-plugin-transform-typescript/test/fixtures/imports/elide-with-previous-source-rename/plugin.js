"use strict";

const t = require("@babel/types");

module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      const library = path.node.source.value;

      if (library !== "./lib") {
        return;
      }

      const newSpecifiers = [];
      for (let i = 0; i < path.node.specifiers.length; i++) {
        const specifier = path.node.specifiers[i];
        newSpecifiers.push(t.importSpecifier(specifier.local, specifier.imported));
      }

      path.replaceWith(t.importDeclaration(newSpecifiers, t.stringLiteral(library + "-mod")));
    }
  }
});
