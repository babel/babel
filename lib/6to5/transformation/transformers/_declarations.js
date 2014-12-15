var t = require("../../types");

exports.BlockStatement =
exports.Program = function (node) {
  var kinds = {};

  for (var i in node._declarations) {
    var declar = node._declarations[i];

    var kind = declar.kind || "var";
    var declarNode = t.variableDeclarator(declar.id, declar.init);

    if (!declar.init) {
      kinds[kind] = kinds[kind] || [];
      kinds[kind].push(declarNode);
    } else {
      node.body.unshift(t.variableDeclaration(kind, [declarNode]));
    }
  }

  for (var kind in kinds) {
    node.body.unshift(t.variableDeclaration(kind, kinds[kind]));
  }
};
