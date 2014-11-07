var t = require("../../types");
var _ = require("lodash");

module.exports = function (ast, file) {
  var body = ast.program.body;

  _.each(file.declarations, function (declar) {
    body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(declar.uid, declar.node)
    ]));
  });
};
