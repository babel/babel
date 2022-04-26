// checkScopeInfo.js
module.exports = () => {
  return {
    visitor: {
      Program: {
        exit(programPath) {
          // so that this plugin is always called after the transform-destructuring plugin
          programPath.traverse({
            VariableDeclarator(path) {
              const names = Object.keys(path.getBindingIdentifiers());
              for (const name of names) {
                const b = path.scope.getBinding(name);
                if (!b) {
                  throw new Error(`No binding for ${name}`);
                }
              }
            },
          });
        },
      },
    },
  };
};
