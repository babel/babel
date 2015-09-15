export default function ({ types: t }) {
  function statementList(key, path) {
    var paths: Array = path.get(key);

    for (let path of paths) {
      var func = path.node;

      if (!path.isFunctionDeclaration()) continue;

      var declar = t.variableDeclaration("let", [
        t.variableDeclarator(func.id, t.toExpression(func))
      ]);

      // hoist it up above everything else
      declar._blockHoist = 2;

      // todo: name this
      func.id = null;

      path.replaceWith(declar);
    }
  }

  return {
    visitor: {
      BlockStatement(node, parent) {
        if ((t.isFunction(parent) && parent.body === node) || t.isExportDeclaration(parent)) {
          return;
        }

        statementList("body", this);
      },

      SwitchCase() {
        statementList("consequent", this);
      }
    }
  };
}
