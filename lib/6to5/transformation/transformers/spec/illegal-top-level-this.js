exports.FunctionDeclaration =
exports.FunctionExpression = function (node, parent, scope, context) {
  context.skip();
};

exports.ThisExpression = function (node, parent, scope, context, file) {
  throw file.errorWithNode(node, "Top level `this` is not allowed", ReferenceError);
};
