var util = require("../util");
var t    = require("../types");
var b    = require("../builders");

exports.ForOfStatement = function (node, parent, file) {
  var left = node.left;
  var declar;

  var stepKey = b.identifier(file.generateUid("step"));
  var stepValueId = b.memberExpression(stepKey, b.identifier("value"));

  if (t.isIdentifier(left)) {
    declar = b.expressionStatement(b.assignmentExpression("=", left, stepValueId));
  } else if (t.isVariableDeclaration(left)) {
    declar = b.variableDeclaration(left.kind, [
      b.variableDeclarator(left.declarations[0].id, stepValueId)
    ]);
  } else {
    return;
  }

  var node2 = util.template("for-of", {
    ITERATOR_KEY: file.generateUid("iterator"),
    STEP_KEY:     stepKey,
    OBJECT:       node.right
  });

  t.ensureBlock(node);

  var block = node2.body;
  block.body.push(declar);
  block.body = block.body.concat(node.body.body);

  return node2;
};
