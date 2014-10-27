var traverse = require("../traverse");
var util     = require("../util");
var b        = require("acorn-ast-types").builders;
var _        = require("lodash");

var buildVariableAssign = function (kind, id, init) {
  if (kind === false) {
    return b.expressionStatement(b.assignmentExpression("=", id, init));
  } else {
    return b.variableDeclaration(kind, [
      b.variableDeclarator(id, init)
    ]);
  }
};

var push = function (kind, nodes, pattern, parentId) {
  if (pattern.type === "ObjectPattern") {
    pushObjectPattern(kind, nodes, pattern, parentId);
  } else if (pattern.type === "ArrayPattern") {
    pushArrayPattern(kind, nodes, pattern, parentId);
  }
};

var pushObjectPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.properties, function (prop) {
    var pattern2   = prop.value;
    var patternId2 = b.memberExpression(parentId, prop.key, false);

    if (traverse.isPattern(pattern2)) {
      push(kind, nodes, pattern2, patternId2);
    } else {
      nodes.push(buildVariableAssign(kind, pattern2, patternId2));
    }
  });
};

var pushArrayPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.elements, function (elem, i) {
    if (!elem) return;

    var newPatternId = b.memberExpression(parentId, b.literal(i), true);

    if (elem.type === "Identifier") {
      nodes.push(buildVariableAssign(kind, elem, newPatternId));
    } else if (elem.type === "MemberExpression") {
      nodes.push(buildVariableAssign(false, elem, newPatternId));
    } else {
      push(kind, nodes, elem, newPatternId);
    }
  });
};

var pushPattern = function (kind, nodes, pattern, parentId, file) {
  if (parentId.type !== "MemberExpression" && parentId.type !== "Identifier") {
    var key = b.identifier(file.generateUid("ref"));

    nodes.push(b.variableDeclaration("var", [
      b.variableDeclarator(key, parentId)
    ]));

    parentId = key;
  }

  push(kind, nodes, pattern, parentId);
};

exports.ForInStatement =
exports.ForOfStatement = function (node, parent, file) {
  var declar = node.left;
  if (declar.type !== "VariableDeclaration") return;

  var pattern = declar.declarations[0].id;
  if (!traverse.isPattern(pattern)) return;

  var key = b.identifier(file.generateUid("ref"));
  node.left = b.variableDeclaration(declar.kind, [
    b.variableDeclarator(key, null)
  ]);

  var nodes = [];

  push(declar.kind, nodes, pattern, key);

  util.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.Function = function (node, parent, file) {
  var nodes = [];

  var hasDestructuring = false;

  node.params = node.params.map(function (pattern) {
    if (!traverse.isPattern(pattern)) return pattern;

    hasDestructuring = true;
    var parentId = b.identifier(file.generateUid("ref"));
    pushPattern("var", nodes, pattern, parentId, file);
    return parentId;
  });

  if (!hasDestructuring) return;

  util.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.ExpressionStatement = function (node, parent, file) {
  var expr = node.expression;
  if (expr.type !== "AssignmentExpression") return;

  if (!traverse.isPattern(expr.left)) return;

  var nodes = [];

  var ref = b.identifier(file.generateUid("ref"));
  nodes.push(b.variableDeclaration("var", [
    b.variableDeclarator(ref, expr.right)
  ]));

  push(false, nodes, expr.left, ref);

  return nodes;
};

exports.VariableDeclaration = function (node, parent, file) {
  if (parent.type === "ForInStatement") return;

  var nodes = [];

  var hasPattern = false;
  _.each(node.declarations, function (declar) {
    if (traverse.isPattern(declar.id)) {
      hasPattern = true;
      return false;
    }
  });
  if (!hasPattern) return;

  _.each(node.declarations, function (declar) {
    var patternId = declar.init;
    var pattern   = declar.id;
    if (traverse.isPattern(pattern) && patternId) {
      pushPattern(node.kind, nodes, pattern, patternId, file);
    } else {
      nodes.push(buildVariableAssign(node.kind, declar.id, declar.init));
    }
  });

  return nodes;
};
