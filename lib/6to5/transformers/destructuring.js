var b = require("../builders");
var t = require("../types");
var _ = require("lodash");

var buildVariableAssign = function (kind, id, init) {
  if (kind === false) {
    return b.expressionStatement(b.assignmentExpression("=", id, init));
  } else {
    return b.variableDeclaration(kind, [
      b.variableDeclarator(id, init)
    ]);
  }
};

var push = function (kind, nodes, elem, parentId) {
  if (elem.type === "ObjectPattern") {
    pushObjectPattern(kind, nodes, elem, parentId);
  } else if (elem.type === "ArrayPattern") {
    pushArrayPattern(kind, nodes, elem, parentId);
  } else if (elem.type === "MemberExpression") {
    nodes.push(buildVariableAssign(false, elem, parentId));
  } else {
    nodes.push(buildVariableAssign(kind, elem, parentId));
  }
};

var pushObjectPattern = function (kind, nodes, pattern, parentId) {
  _.each(pattern.properties, function (prop) {
    var pattern2   = prop.value;
    var patternId2 = b.memberExpression(parentId, prop.key);

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

    var newPatternId = b.memberExpression(parentId, b.literal(i), true);
    push(kind, nodes, elem, newPatternId);
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
  if (!t.isPattern(pattern)) return;

  var key = b.identifier(file.generateUid("ref"));
  node.left = b.variableDeclaration(declar.kind, [
    b.variableDeclarator(key, null)
  ]);

  var nodes = [];

  push(declar.kind, nodes, pattern, key);

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.Function = function (node, parent, file) {
  var nodes = [];

  var hasDestructuring = false;

  node.params = node.params.map(function (pattern) {
    if (!t.isPattern(pattern)) return pattern;

    hasDestructuring = true;
    var parentId = b.identifier(file.generateUid("ref"));
    pushPattern("var", nodes, pattern, parentId, file);
    return parentId;
  });

  if (!hasDestructuring) return;

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.ExpressionStatement = function (node, parent, file) {
  var expr = node.expression;
  if (expr.type !== "AssignmentExpression") return;

  if (!t.isPattern(expr.left)) return;

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
      pushPattern(node.kind, nodes, pattern, patternId, file);
    } else {
      nodes.push(buildVariableAssign(node.kind, declar.id, declar.init));
    }
  });

  if (parent.type !== "Program" && parent.type !== "BlockStatement") {
    var declar;

    _.each(nodes, function (node) {
      declar = declar || b.variableDeclaration(node.kind, []);

      if (node.type !== "VariableDeclaration" && declar.kind !== node.kind) {
        throw file.errorWithNode(node, "Cannot use this node within the current parent");
      }

      declar.declarations = declar.declarations.concat(node.declarations);
    });

    return declar;
  }

  return nodes;
};

