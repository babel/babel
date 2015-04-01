import * as t from "../../../types";

function statementList(key, node, file) {
  for (var i = 0; i < node[key].length; i++) {
    var func = node[key][i];
    if (!t.isFunctionDeclaration(func)) continue;

    var declar = t.variableDeclaration("let", [
      t.variableDeclarator(func.id, t.toExpression(func))
    ]);

    // hoist it up above everything else
    declar._blockHoist = 2;

    // todo: name this
    func.id = null;

    node[key][i] = declar;

    file.checkNode(declar);
  }
}

export function BlockStatement(node, parent, scope, file) {
  if ((t.isFunction(parent) && parent.body === node) || t.isExportDeclaration(parent)) {
    return;
  }

  statementList("body", node, file);
}

export function SwitchCase(node, parent, scope, file) {
  statementList("consequent", node, file);
}
