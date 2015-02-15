"use strict";

var messages = require("../../../messages");
var t        = require("../../../types");

exports.check = t.isPattern;

function DestructuringTransformer(opts) {
  this.blockHoist = opts.blockHoist;
  this.operator   = opts.operator;
  this.nodes      = opts.nodes;
  this.scope      = opts.scope;
  this.file       = opts.file;
  this.kind       = opts.kind;
}

DestructuringTransformer.prototype.buildVariableAssignment = function (id, init) {
  var op = this.operator;
  if (t.isMemberExpression(id)) op = "=";

  var node;

  if (op) {
    node = t.expressionStatement(t.assignmentExpression(op, id, init));
  } else {
    node = t.variableDeclaration(this.kind, [
      t.variableDeclarator(id, init)
    ]);
  }

  node._blockHoist = this.blockHoist;

  return node;
};

DestructuringTransformer.prototype.buildVariableDeclaration = function (id, init) {
  var declar = t.variableDeclaration("var", [
    t.variableDeclarator(id, init)
  ]);
  declar._blockHoist = this.blockHoist;
  return declar;
};

DestructuringTransformer.prototype.push = function (elem, parentId) {
  if (t.isObjectPattern(elem)) {
    this.pushObjectPattern(elem, parentId);
  } else if (t.isArrayPattern(elem)) {
    this.pushArrayPattern(elem, parentId);
  } else if (t.isAssignmentPattern(elem)) {
    this.pushAssignmentPattern(elem, parentId);
  } else {
    this.nodes.push(this.buildVariableAssignment(elem, parentId));
  }
};

DestructuringTransformer.prototype.pushAssignmentPattern = function (pattern, parentId) {
  var tempParentId = this.scope.generateUidBasedOnNode(parentId);

  var declar = t.variableDeclaration("var", [
    t.variableDeclarator(tempParentId, parentId)
  ]);
  declar._blockHoist = this.blockHoist;
  this.nodes.push(declar);

  this.nodes.push(this.buildVariableAssignment(
    pattern.left,
    t.conditionalExpression(
      t.binaryExpression("===", tempParentId, t.identifier("undefined")),
      pattern.right,
      tempParentId
    )
  ));
};

DestructuringTransformer.prototype.pushObjectSpread = function (pattern, parentId, prop, i) {
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

  var value = t.callExpression(this.file.addHelper("object-without-properties"), [parentId, keys]);
  this.nodes.push(this.buildVariableAssignment(prop.argument, value));
};

DestructuringTransformer.prototype.pushObjectProperty = function (prop, parentId) {
  if (t.isLiteral(prop.key)) prop.computed = true;

  var pattern2   = prop.value;
  var patternId2 = t.memberExpression(parentId, prop.key, prop.computed);

  if (t.isPattern(pattern2)) {
    this.push(pattern2, patternId2);
  } else {
    this.nodes.push(this.buildVariableAssignment(pattern2, patternId2));
  }
};

DestructuringTransformer.prototype.pushObjectPattern = function (pattern, parentId) {
  if (!pattern.properties.length) {
    this.nodes.push(t.expressionStatement(
      t.callExpression(this.file.addHelper("object-destructuring-empty"), [parentId])
    ));
  }

  if (pattern.properties.length > 1 && t.isMemberExpression(parentId)) {
    var temp = this.scope.generateUidBasedOnNode(parentId, this.file);
    this.nodes.push(this.buildVariableDeclaration(temp, parentId));
    parentId = temp;
  }

  for (var i = 0; i < pattern.properties.length; i++) {
    var prop = pattern.properties[i];
    if (t.isSpreadProperty(prop)) {
      this.pushObjectSpread(pattern, parentId, prop, i);
    } else {
      this.pushObjectProperty(prop, parentId);
    }
  }
};

var hasRest = function (pattern) {
  for (var i = 0; i < pattern.elements.length; i++) {
    if (t.isRestElement(pattern.elements[i])) {
      return true;
    }
  }
  return false;
};

DestructuringTransformer.prototype.pushArrayPattern = function (pattern, parentId) {
  if (!pattern.elements) return;

  // if we have a rest then we need all the elements
  var count = !hasRest(pattern) && pattern.elements.length;

  var toArray = this.scope.toArray(parentId, count);

  var _parentId = this.scope.generateUidBasedOnNode(parentId);
  this.nodes.push(this.buildVariableDeclaration(_parentId, toArray));
  parentId = _parentId;

  this.scope.assignTypeGeneric(parentId.name, "Array");

  for (var i = 0; i < pattern.elements.length; i++) {
    var elem = pattern.elements[i];

    // hole
    if (!elem) continue;

    var newPatternId;

    if (t.isRestElement(elem)) {
      newPatternId = this.scope.toArray(parentId);

      if (i > 0) {
        newPatternId = t.callExpression(t.memberExpression(newPatternId, t.identifier("slice")), [t.literal(i)]);
      }

      elem = elem.argument;
    } else {
      newPatternId = t.memberExpression(parentId, t.literal(i), true);
    }

    this.push(elem, newPatternId);
  }
};

DestructuringTransformer.prototype.init = function (pattern, parentId) {
  if (!t.isArrayExpression(parentId) && !t.isMemberExpression(parentId) && !t.isIdentifier(parentId)) {
    var key = this.scope.generateUidBasedOnNode(parentId);
    this.nodes.push(this.buildVariableDeclaration(key, parentId));
    parentId = key;
  }

  this.push(pattern, parentId);
};

exports.ForInStatement =
exports.ForOfStatement = function (node, parent, scope, file) {
  var left = node.left;

  if (t.isPattern(left)) {
    // for ({ length: k } in { abc: 3 });

    var temp = scope.generateUidIdentifier("ref");

    node.left = t.variableDeclaration("var", [
      t.variableDeclarator(temp)
    ]);

    t.ensureBlock(node);

    node.body.body.unshift(t.variableDeclaration("var", [
      t.variableDeclarator(left, temp)
    ]));

    return;
  }

  if (!t.isVariableDeclaration(left)) return;

  var pattern = left.declarations[0].id;
  if (!t.isPattern(pattern)) return;

  var key = scope.generateUidIdentifier("ref");
  node.left = t.variableDeclaration(left.kind, [
    t.variableDeclarator(key, null)
  ]);

  var nodes = [];

  var destructuring = new DestructuringTransformer({
    kind: left.kind,
    file: file,
    scope: scope,
    nodes: nodes
  });

  destructuring.init(pattern, key);

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.Function = function (node, parent, scope, file) {
  var nodes = [];

  var hasDestructuringTransformer = false;

  node.params = node.params.map(function (pattern, i) {
    if (!t.isPattern(pattern)) return pattern;

    hasDestructuringTransformer = true;
    var parentId = scope.generateUidIdentifier("ref");

    var destructuring = new DestructuringTransformer({
      blockHoist: node.params.length - i,
      nodes:      nodes,
      scope:      scope,
      file:       file,
      kind:       "var",
    });
    destructuring.init(pattern, parentId);

    return parentId;
  });

  if (!hasDestructuringTransformer) return;

  t.ensureBlock(node);

  var block = node.body;
  block.body = nodes.concat(block.body);
};

exports.CatchClause = function (node, parent, scope, file) {
  var pattern = node.param;
  if (!t.isPattern(pattern)) return;

  var ref = scope.generateUidIdentifier("ref");
  node.param = ref;

  var nodes = [];

  var destructuring = new DestructuringTransformer({
    kind: "let",
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(pattern, ref);

  node.body.body = nodes.concat(node.body.body);

  return node;
};

exports.ExpressionStatement = function (node, parent, scope, file) {
  var expr = node.expression;
  if (expr.type !== "AssignmentExpression") return;
  if (!t.isPattern(expr.left)) return;
  if (file.isConsequenceExpressionStatement(node)) return;

  var nodes = [];

  var ref = scope.generateUidIdentifier("ref");
  nodes.push(t.variableDeclaration("var", [
    t.variableDeclarator(ref, expr.right)
  ]));

  var destructuring = new DestructuringTransformer({
    operator: expr.operator,
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(expr.left, ref);

  return nodes;
};

exports.AssignmentExpression = function (node, parent, scope, file) {
  if (!t.isPattern(node.left)) return;

  var ref = scope.generateUidIdentifier("temp");
  scope.push({
    key: ref.name,
    id: ref
  });

  var nodes = [];
  nodes.push(t.assignmentExpression("=", ref, node.right));

  var destructuring = new DestructuringTransformer({
    operator: node.operator,
    file: file,
    scope: scope,
    nodes: nodes
  });
  destructuring.init(node.left, ref);

  nodes.push(ref);

  return t.toSequenceExpression(nodes, scope);
};

var variableDeclarationhasPattern = function (node) {
  for (var i = 0; i < node.declarations.length; i++) {
    if (t.isPattern(node.declarations[i].id)) {
      return true;
    }
  }
  return false;
};

exports.VariableDeclaration = function (node, parent, scope, file) {
  if (t.isForInStatement(parent) || t.isForOfStatement(parent)) return;
  if (!variableDeclarationhasPattern(node)) return;

  var nodes = [];
  var declar;

  for (var i = 0; i < node.declarations.length; i++) {
    declar = node.declarations[i];

    var patternId = declar.init;
    var pattern   = declar.id;

    var destructuring = new DestructuringTransformer({
      nodes: nodes,
      scope: scope,
      kind:  node.kind,
      file:  file
    });

    if (t.isPattern(pattern) && patternId) {
      destructuring.init(pattern, patternId);

      if (+i !== node.declarations.length - 1) {
        // we aren't the last declarator so let's just make the
        // last transformed node inherit from us
        t.inherits(nodes[nodes.length - 1], declar);
      }
    } else {
      nodes.push(t.inherits(destructuring.buildVariableAssignment(declar.id, declar.init), declar));
    }
  }

  if (!t.isProgram(parent) && !t.isBlockStatement(parent)) {
    // https://github.com/babel/babel/issues/113
    // for (let [x] = [0]; false;) {}

    declar = null;

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      declar = declar || t.variableDeclaration(node.kind, []);

      if (!t.isVariableDeclaration(node) && declar.kind !== node.kind) {
        throw file.errorWithNode(node, messages.get("invalidParentForThisNode"));
      }

      declar.declarations = declar.declarations.concat(node.declarations);
    }

    return declar;
  }

  return nodes;
};
