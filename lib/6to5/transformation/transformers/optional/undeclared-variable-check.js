exports.optional = true;

exports.Identifier = function (node, parent, scope, context, file) {
  if (!scope.has(node.name, true)) {
    throw file.errorWithNode(node, "Reference to undeclared variable");
  }
};
