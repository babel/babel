const t = require('@babel/types');

module.exports = () => ({
  visitor: {
    ImportDeclaration(path) {
      const {
        specifiers,
        source: {value: library},
      } = path.node;

      if (library !== './lib' || path.node.skip) {
        return;
      }

      const newSpecifiers1 = [];
      const newSpecifiers2 = [];
      for (const specifier of specifiers) {
        if (specifier.local.name === 'd' || specifier.local.name === 'A') {
          newSpecifiers1.push(t.importSpecifier(specifier.local, specifier.imported));
          continue;
        }

        newSpecifiers2.push(specifier);
      }

      const newDeclaration = t.importDeclaration(newSpecifiers2, t.stringLiteral(library));
      newDeclaration.skip = true;

      path.replaceWithMultiple([
        t.importDeclaration(newSpecifiers1, t.stringLiteral(`${library}/foo`)),
        newDeclaration,
      ]);
    },
  },
});
