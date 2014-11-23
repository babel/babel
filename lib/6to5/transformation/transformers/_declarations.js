var t = require("../../types");
var _ = require("lodash");

exports.BlockStatement =
exports.Program = function (node, parent, file) {
  _.each(node._declarations, function (declar) {
    node.body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(declar.id, declar.init)
    ]));
  });
};
