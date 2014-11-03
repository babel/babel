var util = require("../util");
var t    = require("../types");

exports.ForOfStatement = function (node, parent, file) {
  var left = node.left;
  var declar;

  var stepKey = t.identifier(file.generateUid("step"));
  var stepValueId = t.memberExpression(stepKey, t.identifier("value"));

  if (t.isIdentifier(left)) {
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValueId));
  } else if (t.isVariableDeclaration(left)) {
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, stepValueId)
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
