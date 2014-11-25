var t = require("../../types");

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  t.ensureBlock(node);

  var call = file.toArray(t.identifier("arguments"));

  if (node.params.length) {
    call.arguments.push(t.literal(node.params.length));
  }

  call._ignoreAliasFunctions = true;

  node.body.body.unshift(t.variableDeclaration("var", [
    t.variableDeclarator(rest, call)
  ]));
};
