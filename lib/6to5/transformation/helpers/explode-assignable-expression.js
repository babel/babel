"use strict";

var t = require("../../types");

var getObjRef = function (node, nodes, file, scope) {
  var ref;
  if (t.isIdentifier(node)) {
    ref = node;
  } else if (t.isMemberExpression(node)) {
    ref = node.object;
  } else {
    throw new Error("We can't explode this node type " + node.type);
  }

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

module.exports = function (node, nodes, file, scope, allowedSingleIdent) {
  var obj;
  if (t.isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, file, scope);
  }

  var ref, uid;

  if (t.isIdentifier(node)) {
    ref = node;
    uid = obj;
  } else {
    var prop = getPropRef(node, nodes, file, scope);
    var computed = node.computed || t.isLiteral(prop);
    uid = ref = t.memberExpression(obj, prop, computed);
  }

  return {
    uid: uid,
    ref: ref
  };
};
