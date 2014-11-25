var t = require("../../types");
var _ = require("lodash");

exports.BlockStatement =
exports.Program = function (node) {
  var kinds = {};

  _.each(node._declarations, function (declar) {
    var kind = declar.kind || "var";
    var declarNode = t.variableDeclarator(declar.id, declar.init);

    if (!declar.init) {
      kinds[kind] = kinds[kind] || [];
      kinds[kind].push(declarNode);
    } else {
      node.body.unshift(t.variableDeclaration(kind, [declarNode]));
    }
  });

  _.each(kinds, function (declars, kind) {
    node.body.unshift(t.variableDeclaration(kind, declars));
  });
};
