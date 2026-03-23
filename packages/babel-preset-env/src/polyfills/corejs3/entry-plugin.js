module.exports = function ({ api, assert }) {
  const { types: t } = api;

  // Update the shouldReplace function to handle module paths with and without .js extension
  function shouldReplace(path) {
    if (!path.isImportDeclaration()) return false;

    const source = path.node.source;
    if (!t.isStringLiteral(source)) return false;

    const specifier = source.value;
    if (specifier !== 'core-js' && !specifier.startsWith('core-js/')) return false;

    // Handle module paths with and without .js extension
    const importSpecifiers = path.node.specifiers;
    if (importSpecifiers.length === 0) return true;

    for (const importSpecifier of importSpecifiers) {
      if (t.isImportSpecifier(importSpecifier)) {
        const importSpecifierLocal = importSpecifier.local;
        if (t.isIdentifier(importSpecifierLocal)) {
          const binding = api.scope.getBinding(importSpecifierLocal.name);
          if (binding && binding.path.isMemberExpression()) {
            const object = binding.path.node.object;
            if (t.isMemberExpression(object) && object.property.name === 'default') {
              const moduleName = object.object.name;
              if (moduleName === 'core-js') return true;
            }
          }
        }
      }
    }

    return false;
  }

  return {
    name: 'corejs3-entry-plugin',
    visitor: {
      ImportDeclaration(path) {
        if (shouldReplace(path)) {
          assert.path().replaceWith(
            t.callExpression(
              t.importDefaultSpecifier(t.identifier('corePolyfill')),
              []
            )
          );
        }
      },
    },
  };
}