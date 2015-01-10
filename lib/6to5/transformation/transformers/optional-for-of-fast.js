var util = require("../../util");
var t    = require("../../types");

exports.optional = true;

exports.ForOfStatement = function (node, parent, file, scope) {
  var left = node.left;
  var declar, id;

  if (t.isIdentifier(left)) {
    id = left;
  } else if (t.isVariableDeclaration(left)) {
    id = left.declarations[0].id;
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(id)
    ]);
  } else  {
    throw file.errorWithNode(left, "Unknown node type " + left.type + " in ForOfStatement");
  }

  var node2 = util.template("for-of-fast", {
    LOOP_OBJECT:  file.generateUidIdentifier("loopObject", scope),
    IS_ARRAY:     file.generateUidIdentifier("isArray", scope),
    INDEX:        file.generateUidIdentifier("i", scope),
    ID:           id,
    OBJECT:       node.right
  });

  t.inheritsComments(node2, node);
  t.ensureBlock(node);

  var block = node2.body;
  if (declar) {
    block.body.unshift(declar);
  }
  block.body = block.body.concat(node.body.body);
  
  return node2;
};
