"use strict";

// TODO: Clean up

var t = require("../../types");

var buildVariableAssign = function (opts, id, init) {
  var op = opts.operator;
  if (t.isMemberExpression(id)) op = "=";

  var node;

  if (op) {
    node = t.expressionStatement(t.assignmentExpression(op, id, init));
  } else {
    node = t.variableDeclaration(opts.kind, [
      t.variableDeclarator(id, init)
    ]);
  }

  node._blockHoist = opts.blockHoist;

  return node;
};

var buildVariableDeclar = function (opts, id, init) {
  var declar = t.variableDeclaration("var", [
    t.variableDeclarator(id, init)
  ]);
  declar._blockHoist = opts.blockHoist;
  return declar;
};

var push = function (opts, nodes, elem, parentId) {
  if (t.isObjectPattern(elem)) {
    pushObjectPattern(opts, nodes, elem, parentId);
  } else if (t.isArrayPattern(elem)) {
    pushArrayPattern(opts, nodes, elem, parentId);
  } else if (t.isAssignmentPattern(elem)) {
    pushAssignmentPattern(opts, nodes, elem, parentId);
  } else {
    nodes.push(buildVariableAssign(opts, elem, parentId));
  }
};

var pushAssignmentPattern = function (opts, nodes, pattern, parentId) {
  var tempParentId = opts.scope.generateUidBasedOnNode(parentId, opts.file);

  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(tempParentId, parentId)
  ]));

  nodes.push(buildVariableAssign(
    opts,
    pattern.left,
    t.conditionalExpression(
      t.binaryExpression("===", tempParentId, t.identifier("undefined")),
      pattern.right,
      tempParentId
    )
  ));
};

var pushObjectPattern = function (opts, nodes, pattern, parentId) {
  for (var i = 0; i < pattern.properties.length; i++) {
    var prop = pattern.properties[i];
    if (t.isSpreadProperty(prop)) {
        // get all the keys that appear in this object before the current spread
        var keys = [];
        for (var i2 = 0; i2 < pattern.properties.length; i2++) {
          var prop2 = pattern.properties[i2];

          if (i2 >= i) break;
          if (t.isSpreadProperty(prop2)) continue;

          var key = prop2.key;
          if (t.isIdentifier(key)) {
            key = t.literal(prop2.key.name);
          }
          keys.push(key);
        }
        keys = t.arrayExpression(keys);

        var value = t.callExpression(opts.file.addHelper("object-without-properties"), [parentId, keys]);
        nodes.push(buildVariableAssign(opts, prop.argument, value));
    } else {
      if (t.isLiteral(prop.key)) prop.computed = true;

      var pattern2   = prop.value;
      var patternId2 = t.memberExpression(parentId, prop.key, prop.computed);

      if (t.isPattern(pattern2)) {
        push(opts, nodes, pattern2, patternId2);
      } else {
        nodes.push(buildVariableAssign(opts, pattern2, patternId2));
      }
    }
  }
};

var pushArrayPattern = function (opts, nodes, pattern, parentId) {
  if (!pattern.elements) return;

  var i;

  var hasSpreadElement = false;
  for (i = 0; i < pattern.elements.length; i++) {
    if (t.isSpreadElement(pattern.elements[i])) {
      hasSpreadElement = true;
      break;
    }
  }

  var toArray = opts.file.toArray(parentId, !hasSpreadElement && pattern.elements.length);

  var _parentId = opts.scope.generateUidBasedOnNode(parentId, opts.file);
  nodes.push(buildVariableDeclar(opts, _parentId, toArray));
  parentId = _parentId;

  for (i = 0; i < pattern.elements.length; i++) {
    var elem = pattern.elements[i];
    if (!elem) continue;

    i = +i;

    var newPatternId;

    if (t.isSpreadElement(elem)) {
      newPatternId = opts.file.toArray(parentId);

      if (i > 0) {
        newPatternId = t.callExpression(t.memberExpression(newPatternId, t.identifier("slice")), [t.literal(i)]);
      }

      elem = elem.argument;
    } else {
      newPatternId = t.memberExpression(parentId, t.literal(i), true);
    }

    push(opts, nodes, elem, newPatternId);
  }
};

var pushPattern = function (opts) {
  var nodes = opts.nodes;
  var pattern = opts.pattern;
  var parentId = opts.id;
  var file = opts.file;
  var scope = opts.scope;

  if (!t.isArrayExpression(parentId) && !t.isMemberExpression(parentId) && !t.isIdentifier(parentId)) {
    var key = scope.generateUidBasedOnNode(parentId, file);
    nodes.push(buildVariableDeclar(opts, key, parentId));
    parentId = key;
  }

  push(opts, nodes, pattern, parentId);
};

exports.ForInStatement =
exports.ForOfStatement = function (node, parent, scope, context, file) {
  var declar = node.left;
  if (!t.isVariableDeclaration(declar)) return;

  var pattern = declar.declarations[0].id;
  if (!t.isPattern(pattern)) return;

  var key = file.generateUidIdentifier("ref", scope);
  node.left = t.variableDeclaration(declar.kind, [
    t.variableDeclarator(key, null)
  ]);

  var nodes = [];

  push({
    kind: declar.kind,
    file: file,
    scope: scope
  }, nodes, pattern, key);

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.Function = function (node, parent, scope, context, file) {
  var nodes = [];

  var hasDestructuring = false;

  node.params = node.params.map(function (pattern, i) {
    if (!t.isPattern(pattern)) return pattern;

    hasDestructuring = true;
    var parentId = file.generateUidIdentifier("ref", scope);

    pushPattern({
      blockHoist: node.params.length - i,
      pattern:    pattern,
      nodes:      nodes,
      scope:      scope,
      file:       file,
      kind:       "var",
      id:         parentId
    });

    return parentId;
  });

  if (!hasDestructuring) return;

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.CatchClause = function (node, parent, scope, context, file) {
  var pattern = node.param;
  if (!t.isPattern(pattern)) return;

  var ref = file.generateUidIdentifier("ref", scope);
  node.param = ref;

  var nodes = [];

  push({
    kind: "var",
    file: file,
    scope: scope
  }, nodes, pattern, ref);

  node.body.body = nodes.concat(node.body.body);
};

exports.ExpressionStatement = function (node, parent, scope, context, file) {
  var expr = node.expression;
  if (expr.type !== "AssignmentExpression") return;

  if (!t.isPattern(expr.left)) return;

  var nodes = [];

  var ref = file.generateUidIdentifier("ref", scope);
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(ref, expr.right)
  ]));

  push({
    operator: expr.operator,
    file: file,
    scope: scope
  }, nodes, expr.left, ref);

  return nodes;
};

exports.AssignmentExpression = function (node, parent, scope, context, file) {
  if (parent.type === "ExpressionStatement") return;
  if (!t.isPattern(node.left)) return;

  var ref = file.generateUidIdentifier("temp", scope);
  scope.push({
    key: ref.name,
    id: ref
  });

  var nodes = [];
  nodes.push(t.assignmentExpression("=", ref, node.right));

  push({
    operator: node.operator,
    file: file,
    scope: scope
  }, nodes, node.left, ref);

  nodes.push(ref);

  return t.toSequenceExpression(nodes, scope);
};

exports.VariableDeclaration = function (node, parent, scope, context, file) {
  if (t.isForInStatement(parent) || t.isForOfStatement(parent)) return;

  var nodes = [];
  var i;
  var declar;

  var hasPattern = false;
  for (i = 0; i < node.declarations.length; i++) {
    declar = node.declarations[i];
    if (t.isPattern(declar.id)) {
      hasPattern = true;
      break;
    }
  }
  if (!hasPattern) return;

  for (i = 0; i < node.declarations.length; i++) {
    declar = node.declarations[i];

    var patternId = declar.init;
    var pattern   = declar.id;
    var opts = {
      pattern: pattern,
      nodes:   nodes,
      scope:   scope,
      kind:    node.kind,
      file:    file,
      id:      patternId,
    };

    if (t.isPattern(pattern) && patternId) {
      pushPattern(opts);

      if (+i !== node.declarations.length - 1) {
        // we aren't the last declarator so let's just make the
        // last transformed node inherit from us
        t.inherits(nodes[nodes.length - 1], declar);
      }
    } else {
      nodes.push(t.inherits(buildVariableAssign(opts, declar.id, declar.init), declar));
    }
  }

  if (!t.isProgram(parent) && !t.isBlockStatement(parent)) {
    declar = null;

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      declar = declar || t.variableDeclaration(node.kind, []);

      if (!t.isVariableDeclaration(node) && declar.kind !== node.kind) {
        throw file.errorWithNode(node, "Cannot use this node within the current parent");
      }

      declar.declarations = declar.declarations.concat(node.declarations);
    }

    return declar;
  }

  return nodes;
};
