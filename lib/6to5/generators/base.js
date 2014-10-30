exports.File = function (node, print) {
  return print(node.program);
};

exports.Program = function (node, print) {
  return print.sequence(node.body);
};
