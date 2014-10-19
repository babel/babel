var b = require("ast-types").builders;
var _ = require("lodash");

module.exports = function (ast, file) {
  var body = ast.program.body;

  _.each(file.declarations, function (declar) {
    body.unshift(b.variableDeclaration("var", [
      b.variableDeclarator(declar.uid, declar.node)
    ]));
  });
};
