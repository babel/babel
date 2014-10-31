exports.File = function (node, print) {
  print(node.program);
};

exports.Program = function (node, print) {
  print.sequence(node.body);
};
