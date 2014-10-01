var util = require("../util");

exports.ForOfStatement = function (node, parent, opts, generateUid) {
  var node2 = util.template("for-of", {
    ITERATOR_KEY: generateUid("iterator"),
    STEP_KEY:     generateUid("step"),
    OBJECT:       node.right,
    KEY:          node.left.declarations[0].id
  });

  var block  = node2.body;
  block.body = block.body.concat(node.body.body);

  var declar  = block.body[0];
  declar.kind = node.left.kind;

  return node2;
};
