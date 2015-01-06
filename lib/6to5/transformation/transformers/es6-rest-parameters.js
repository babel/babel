var util = require("../../util");
var t    = require("../../types");

exports.Function = function (node, parent, file, scope) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  t.ensureBlock(node);

  var argsId = t.identifier("arguments");
  argsId._ignoreAliasFunctions = true;

  node.body.body.unshift(
    t.variableDeclaration("var", [
      t.variableDeclarator(rest, t.arrayExpression([]))
    ]),

    util.template("rest", {
      ARGUMENTS: argsId,
      START: t.literal(node.params.length),
      ARRAY: rest,
      KEY: file.generateUidIdentifier("key")
    })
  );
};
