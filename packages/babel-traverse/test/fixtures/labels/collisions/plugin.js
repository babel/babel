module.exports = function(babel) {
  const t = babel.types;
  return {
    visitor: {
      Statement: {
        exit(path) {
          /* The aggressive version.  But even the mild version doesn't work...

          if (path.parentPath.isFunction()) {
            // or TryStatement or CatchClause
            return;
          }

          if (path.isVariableDeclaration()) {
            return;
          }
          */

          // A mild version.
          if (!path.isIfStatement()) {
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
