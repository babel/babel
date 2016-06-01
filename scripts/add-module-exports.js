// "add-module-exports"
module.exports = function (babel) {
  var t = babel.types;
  return {
    visitor: {
      Program: {
        exit: function(path) {
          if (path.BABEL_PLUGIN_ADD_MODULE_EXPORTS) {
            return;
          }

          var hasExportDefault = false;
          var hasExportNamed = false;
          var body = path.get("body");

          path.get('body').forEach(function (path) {
            if (path.isExportDefaultDeclaration()) {
              hasExportDefault = true;
              return;
            }

            if (path.isExportNamedDeclaration()) {
              if (path.node.specifiers.length === 1 && path.node.specifiers[0].exported.name === "default") {
                hasExportDefault = true;
              } else {
                hasExportNamed = true;
              }
              return;
            }
          });

          if (hasExportDefault && !hasExportNamed) {
            path.pushContainer("body", [
              t.expressionStatement(t.assignmentExpression(
                "=",
                t.memberExpression(t.identifier("module"), t.identifier("exports")),
                t.memberExpression(t.identifier("exports"), t.stringLiteral("default"), true)
              ))
            ]);
          }

          path.BABEL_PLUGIN_ADD_MODULE_EXPORTS = true;
        }
      }
    }
  }
}
