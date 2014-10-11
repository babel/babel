var util = require("../util");

exports.ForOfStatement = function (node, parent, opts, generateUid) {
  var left = node.left;
  var key;

  if (left.type === "Identifier") {
    key = left;
  } else if (left.type === "VariableDeclaration") {
    key = left.declarations[0].id;
  } else {
    return;
  }

  var node2 = util.template("for-of", {
    ITERATOR_KEY: generateUid("iterator"),
    STEP_KEY:     generateUid("step"),
    OBJECT:       node.right,
    KEY:          key
  });

  util.ensureBlock(node);

  var block = node2.body;
  block.body = block.body.concat(node.body.body);

  var declar  = block.body[0];
  declar.kind = declar.kind;

  return node2;
};
