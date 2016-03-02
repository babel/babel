export default function ({ types: t }) {
  function statementList(key, path) {
    let paths = path.get(key);

    for (let path of paths) {
      let func = path.node;
      if (!path.isFunctionDeclaration()) continue;

      let declar = t.variableDeclaration("let", [
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
      BlockStatement(path) {
        let { node, parent } = path;
        if (t.isFunction(parent, { body: node })  || t.isExportDeclaration(parent)) {
          return;
        }

        statementList("body", path);
      },

      SwitchCase(path) {
        statementList("consequent", path);
      }
    }
  };
}
