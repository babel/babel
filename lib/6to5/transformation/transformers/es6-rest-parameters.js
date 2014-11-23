var t = require("../../types");

exports.Function = function (node, parent, file) {
  if (!node.rest) return;

  var rest = node.rest;
  delete node.rest;

  t.ensureBlock(node);

  var call = t.callExpression(
    file.addDeclaration("arguments-to-array"),
    [t.identifier("arguments")]
  );

  if (node.params.length) {
    call = t.callExpression(t.memberExpression(call, t.identifier("slice")), [t.literal(node.params.length)]);
  }

  call._ignoreAliasFunctions = true;

  node.body.body.unshift(t.variableDeclaration("var", [
    t.variableDeclarator(rest, call)
  ]));
};
