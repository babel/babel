var t = require("../types");
var _ = require("lodash");

var buildVariableAssign = function (kind, id, init) {
  if (kind === false) {
    return t.expressionStatement(t.assignmentExpression("=", id, init));
  } else {
    return t.variableDeclaration(kind, [
      t.variableDeclarator(id, init)
    ]);
  }
};

var push = function (kind, nodes, elem, parentId) {
  if (t.isObjectPattern(elem)) {
    pushObjectPattern(kind, nodes, elem, parentId);
  } else if (t.isArrayPattern(elem)) {
    pushArrayPattern(kind, nodes, elem, parentId);
  } else if (t.isMemberExpression(elem)) {
    nodes.push(buildVariableAssign(false, elem, parentId));
  } else {
    nodes.push(buildVariableAssign(kind, elem, parentId));
  }
};

var pushObjectPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.properties, function (prop) {
    var pattern2   = prop.value;
    var patternId2 = t.memberExpression(parentId, prop.key);

    if (t.isPattern(pattern2)) {
      push(kind, nodes, pattern2, patternId2);
    } else {
      nodes.push(buildVariableAssign(kind, pattern2, patternId2));
    }
  });
};

var pushArrayPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.elements, function (elem, i) {
    if (!elem) return;

    var newPatternId = t.memberExpression(parentId, t.literal(i), true);
    push(kind, nodes, elem, newPatternId);
  });
};

var pushPattern = function (kind, nodes, pattern, parentId, file, scope) {
  if (parentId.type !== "MemberExpression" && parentId.type !== "Identifier") {
    var key = t.identifier(file.generateUid("ref"));

    nodes.push(t.variableDeclaration("var", [
      t.variableDeclarator(key, parentId)
    ]));

    parentId = key;
  }

  push(kind, nodes, pattern, parentId);
};

exports.ForInStatement =
exports.ForOfStatement = function (node, parent, file, scope) {
  var declar = node.left;
  if (declar.type !== "VariableDeclaration") return;

  var pattern = declar.declarations[0].id;
  if (!t.isPattern(pattern)) return;

  var key = t.identifier(file.generateUid("ref", scope));
  node.left = t.variableDeclaration(declar.kind, [
    t.variableDeclarator(key, null)
  ]);

  var nodes = [];

  push(declar.kind, nodes, pattern, key);

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.Function = function (node, parent, file, scope) {
  var nodes = [];

  var hasDestructuring = false;

  node.params = node.params.map(function (pattern) {
    if (!t.isPattern(pattern)) return pattern;

    hasDestructuring = true;
    var parentId = t.identifier(file.generateUid("ref", scope));
    pushPattern("var", nodes, pattern, parentId, file, scope);
    return parentId;
  });

  if (!hasDestructuring) return;

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.ExpressionStatement = function (node, parent, file, scope) {
  var expr = node.expression;
  if (expr.type !== "AssignmentExpression") return;

  if (!t.isPattern(expr.left)) return;

  var nodes = [];

  var ref = t.identifier(file.generateUid("ref", scope));
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(ref, expr.right)
  ]));

  push(false, nodes, expr.left, ref);

  return nodes;
};

exports.VariableDeclaration = function (node, parent, file, scope) {
  if (t.isForInStatement(parent)) return;

  var nodes = [];

  var hasPattern = false;
  _.each(node.declarations, function (declar) {
    if (t.isPattern(declar.id)) {
      hasPattern = true;
      return false;
    }
  });
  if (!hasPattern) return;

  _.each(node.declarations, function (declar) {
    var patternId = declar.init;
    var pattern   = declar.id;
    if (t.isPattern(pattern) && patternId) {
      pushPattern(node.kind, nodes, pattern, patternId, file, scope);
    } else {
      nodes.push(buildVariableAssign(node.kind, declar.id, declar.init));
    }
  });

  if (parent.type !== "Program" && parent.type !== "BlockStatement") {
    var declar;

    _.each(nodes, function (node) {
      declar = declar || t.variableDeclaration(node.kind, []);

      if (node.type !== "VariableDeclaration" && declar.kind !== node.kind) {
        throw file.errorWithNode(node, "Cannot use this node within the current parent");
      }

      declar.declarations = declar.declarations.concat(node.declarations);
    });

    return declar;
  }

  return nodes;
};

