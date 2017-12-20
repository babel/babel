const t = require('@babel/types');

module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      const {
        specifiers,
        source: {value: library},
      } = path.node;

      if (library !== './lib') {
        return;
      }

      const newSpecifiers = [];
      for (const specifier of specifiers) {
        newSpecifiers.push(t.importSpecifier(specifier.local, specifier.imported));
      }

      path.replaceWith(t.importDeclaration(newSpecifiers, t.stringLiteral(`${library}-mod`)));
    }
  }
});
