// checkScopeInfo.js
module.exports = () => {
  return {
    visitor: {
      Program: {
        exit(programPath) {
          // so that this plugin is always called after the transform-destructuring plugin
          programPath.traverse({
            VariableDeclarator(path) {
              const b = path.scope.getBinding(path.get("id").node.name);
              if (!b) {
                throw new Error(
                  `No original binding for ${path.get("id").node.name}`
                );
              }
            },
          });
        },
      },
    },
  };
};
