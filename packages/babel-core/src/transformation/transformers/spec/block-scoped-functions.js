import * as t from "babel-types";

/**
 * [Please add a description.]
 */

function statementList(key, path) {
  var paths = path.get(key);

  for (var i = 0; i < paths.length; i++) {
    let path = paths[i];

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

/**
 * [Please add a description.]
 */

export var visitor = {

  /**
   * [Please add a description.]
   */

  BlockStatement(node, parent) {
    if ((t.isFunction(parent) && parent.body === node) || t.isExportDeclaration(parent)) {
      return;
    }

    statementList("body", this);
  },

  /**
   * [Please add a description.]
   */

  SwitchCase() {
    statementList("consequent", this);
  }
};
