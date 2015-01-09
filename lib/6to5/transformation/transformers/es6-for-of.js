var util = require("../../util");
var t    = require("../../types");

function useArrayOptimization(node) {
  if (!node.leadingComments) {
    return false;
  }
  for (var i = 0; i < node.leadingComments.length; i++) {
    var comment = node.leadingComments[i].value;
    if (comment.match(/^\s*6to5: always array\s*$/)) {
      return true;
    }
  }
  return false;
}

exports.ForOfStatement = function (node, parent, file, scope) {
  var left = node.left;
  var value, node2;
  
  if (useArrayOptimization(node)) {
    var arr;
    var index = file.generateUidIdentifier("i", scope);
    var init = t.variableDeclaration("var", [t.variableDeclarator(index, t.literal(0))]);
    if (t.isIdentifier(node.right) || t.isMemberExpression(node.right)) {
      arr = node.right;
    } else {
      arr = scope.generateUidBasedOnNode(node.right, file);
      init.declarations.push(t.variableDeclarator(arr, node.right));
    }
    node2 = util.template("for-traditional", {
      INIT: init,
      INDEX: index,
      ARR: arr,
    });
    value = t.memberExpression(arr, index, true);
  } else {
    var stepKey = file.generateUidIdentifier("step", scope);
    node2 = util.template("for-of", {
      ITERATOR_KEY: file.generateUidIdentifier("iterator", scope),
      STEP_KEY:     stepKey,
      OBJECT:       node.right
    });
    value = t.memberExpression(stepKey, t.identifier("value"));
  }

  var declar;
  
  if (t.isIdentifier(left)) {
    declar = t.expressionStatement(t.assignmentExpression("=", left, value));
  } else if (t.isVariableDeclaration(left)) {
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, value)
    ]);
  } else {
    throw file.errorWithNode(left, "Unknown node type " + left.type + " in ForOfStatement");
  }
  
  t.inheritsComments(node2, node);
  t.ensureBlock(node);

  var block = node2.body;
  block.body.push(declar);
  block.body = block.body.concat(node.body.body);

  return node2;
};
