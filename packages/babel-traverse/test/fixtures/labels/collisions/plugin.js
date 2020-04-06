module.exports = function(babel) {
  const t = babel.types;
  return {
    visitor: {
      Statement: {
        exit(path) {
          if (path.parentPath.isFunction()) {
            // or TryStatement or CatchClause
            return;
          }

          if (path.isVariableDeclaration()) {
            return;
          }

          const label = path.scope.generateUidIdentifier("label");
          path.replaceWith(t.labeledStatement(label, path.node));
          path.skip();
        }
      }
    }
  };
};
