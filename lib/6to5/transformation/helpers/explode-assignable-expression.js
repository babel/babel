var t = require("../../types");

var getObjRef = function (node, nodes, file, scope) {
  var ref = node.object;
  if(t.isIdentifier(ref)) return ref;

  var temp = scope.generateUidBasedOnNode(ref, file);
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(temp, ref)
  ]));
  return temp;
};

var getPropRef = function (node, nodes, file, scope) {
  var prop = node.property;
  var key = t.toComputedKey(node, prop);
  if (t.isLiteral(key)) return key;

  var temp = scope.generateUidBasedOnNode(prop, file);
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(temp, prop)
  ]));
  return temp;
};

module.exports = function (node, nodes, file, scope) {
  if (t.isIdentifier(node)) return node;

  var obj = getObjRef(node, nodes, file, scope);
  var prop = getPropRef(node, nodes, file, scope);

  var computed = node.computed || t.isLiteral(prop);
  return t.memberExpression(obj, prop, computed);
};
