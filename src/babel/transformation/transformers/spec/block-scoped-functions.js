import * as t from "../../../types";

function statementList(key, path, file) {
  var paths = path.get(key);

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];

    var func = path.node;
    if (!t.isFunctionDeclaration(func)) continue;

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

export function BlockStatement(node, parent, scope, file) {
  if ((t.isFunction(parent) && parent.body === node) || t.isExportDeclaration(parent)) {
    return;
  }

  statementList("body", this, file);
}

export function SwitchCase(node, parent, scope, file) {
  statementList("consequent", this, file);
}
