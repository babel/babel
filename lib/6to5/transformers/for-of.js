var util = require("../util");
var b    = require("ast-types").builders;

exports.ForOfStatement = function (node, parent, opts, generateUid) {
  var declar;
  var isPattern = false;

  var key;
  if (node.left.type === "VariableDeclaration") {
    declar = node.left;
    key = declar.declarations[0].id;
  } else {
    isPattern = true;
    declar = node.left[0];
    key = b.identifier(generateUid("ref"));
  }

  var node2 = util.template("for-of", {
    ITERATOR_KEY: generateUid("iterator"),
    STEP_KEY:     generateUid("step"),
    OBJECT:       node.right,
    KEY:          key
  });

  var block  = node2.body;

  if (isPattern) {
    block.body.push(b.variableDeclaration(declar.kind, [
      b.variableDeclarator(declar.declarations[0].id, key)
    ]));
  }

  block.body = block.body.concat(node.body.body || []);

  var declar  = block.body[0];
  declar.kind = declar.kind;

  return node2;
};
