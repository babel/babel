const t = require('@babel/types');

module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      const library = path.node.source.value;

      if (library !== './lib') {
        return;
      }

      const newSpecifiers = [];
      for (const specifier of path.node.specifiers) {
        newSpecifiers.push(t.importSpecifier(specifier.local, specifier.imported));
      }

      path.replaceWith(t.importDeclaration(newSpecifiers, t.stringLiteral(`${library}-mod`)));
    }
  }
});
