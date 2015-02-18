"use strict";

var useStrict = require("../../helpers/use-strict");
var t         = require("../../../types");

exports.secondPass = true;

exports.BlockStatement =
exports.Program = function (node, parent, scope, file) {
  if (!node._declarations) return;

  var kinds = {};
  var kind;

  useStrict.wrap(node, function () {
    for (var i in node._declarations) {
      var declar = node._declarations[i];

      kind = declar.kind || "var";
      var declarNode = t.variableDeclarator(declar.id, declar.init);

      if (declar.init) {
        node.body.unshift(file.attachAuxiliaryComment(t.variableDeclaration(kind, [declarNode])));
      } else {
        kinds[kind] = kinds[kind] || [];
        kinds[kind].push(declarNode);
      }
    }

    for (kind in kinds) {
      node.body.unshift(file.attachAuxiliaryComment(t.variableDeclaration(kind, kinds[kind])));
    }
  });

  node._declarations = null;
};
