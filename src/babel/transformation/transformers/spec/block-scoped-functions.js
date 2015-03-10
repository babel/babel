import * as t from "../../../types";

export function BlockStatement(node, parent, scope, file) {
  if ((t.isFunction(parent) && parent.body === node) || t.isExportDeclaration(parent)) {
    return;
  }

  for (var i = 0; i < node.body.length; i++) {
    var func = node.body[i];
    if (!t.isFunctionDeclaration(func)) continue;

    var declar = t.variableDeclaration("let", [
      t.variableDeclarator(func.id, t.toExpression(func))
    ]);

    // hoist it up above everything else
    declar._blockHoist = 2;

    // todo: name this
    func.id = null;

    node.body[i] = declar;

    file.checkNode(declar);
  }
}
