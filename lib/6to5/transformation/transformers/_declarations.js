var t = require("../../types");

module.exports = function (ast, file) {
  var body = ast.program.body;

  for (var i in file.declarations) {
    var declar = file.declarations[i];
    body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(declar.uid, declar.node)
    ]));
  }
};
