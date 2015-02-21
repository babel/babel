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

DestructuringTransformer.prototype.push = function (id, init) {
  if (t.isObjectPattern(id)) {
    this.pushObjectPattern(id, init);
  } else if (t.isArrayPattern(id)) {
    this.pushArrayPattern(id, init);
  } else if (t.isAssignmentPattern(id)) {
    this.pushAssignmentPattern(id, init);
  } else {
    this.nodes.push(this.buildVariableAssignment(id, init));
  }
};

DestructuringTransformer.prototype.get = function () {

};

DestructuringTransformer.prototype.pushAssignmentPattern = function (pattern, valueRef) {
  // we need to assign the current value of the assignment to avoid evaluating
  // it more than once

  var tempValueRef = this.scope.generateUidBasedOnNode(valueRef);

  var declar = t.variableDeclaration("var", [
    t.variableDeclarator(tempValueRef, valueRef)
  ]);
  declar._blockHoist = this.blockHoist;
  this.nodes.push(declar);

  //

  this.nodes.push(this.buildVariableAssignment(
    pattern.left,
    t.conditionalExpression(
      t.binaryExpression("===", tempValueRef, t.identifier("undefined")),
      pattern.right,
      tempValueRef
    )
  ));
};

DestructuringTransformer.prototype.pushObjectSpread = function (pattern, objRef, spreadProp, spreadPropIndex) {
  // get all the keys that appear in this object before the current spread

  var keys = [];

  for (var i = 0; i < pattern.properties.length; i++) {
    var prop = pattern.properties[i];

    // we've exceeded the index of the spread property to all properties to the
    // right need to be ignored
    if (i >= spreadPropIndex) break;

    // ignore other spread properties
    if (t.isSpreadProperty(prop)) continue;

    var key = prop.key;
    if (t.isIdentifier(key)) key = t.literal(prop.key.name);
    keys.push(key);
  }

  keys = t.arrayExpression(keys);

  //

  var value = t.callExpression(this.file.addHelper("object-without-properties"), [objRef, keys]);
  this.nodes.push(this.buildVariableAssignment(spreadProp.argument, value));
};

DestructuringTransformer.prototype.pushObjectProperty = function (prop, propRef) {
  if (t.isLiteral(prop.key)) prop.computed = true;

  var pattern = prop.value;
  var objRef  = t.memberExpression(propRef, prop.key, prop.computed);

  if (t.isPattern(pattern)) {
    this.push(pattern, objRef);
  } else {
    this.nodes.push(this.buildVariableAssignment(pattern, objRef));
  }
};

DestructuringTransformer.prototype.pushObjectPattern = function (pattern, objRef) {
  // https://github.com/babel/babel/issues/681

  if (!pattern.properties.length) {
    this.nodes.push(t.expressionStatement(
      t.callExpression(this.file.addHelper("object-destructuring-empty"), [objRef])
    ));
  }

  // if we have more than one properties in this pattern and the objectRef is a
  // member expression then we need to assign it to a temporary variable so it's
  // only evaluated once

  if (pattern.properties.length > 1 && t.isMemberExpression(objRef)) {
    var temp = this.scope.generateUidBasedOnNode(objRef, this.file);
    this.nodes.push(this.buildVariableDeclaration(temp, objRef));
    objRef = temp;
  }

  //

  for (var i = 0; i < pattern.properties.length; i++) {
    var prop = pattern.properties[i];
    if (t.isSpreadProperty(prop)) {
      this.pushObjectSpread(pattern, objRef, prop, i);
    } else {
      this.pushObjectProperty(prop, objRef);
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

DestructuringTransformer.prototype.canUnpackArrayPattern = function (pattern, arr) {
  // not an array so there's no way we can deal with this
  if (!t.isArrayExpression(arr)) return false;

  // pattern has less elements than the array and doesn't have a rest so some
  // elements wont be evaluated
  if (pattern.elements.length < arr.elements.length && !hasRest(pattern)) return false;

  // deopt on holes
  for (var i = 0; i < pattern.elements.length; i++) {
    if (!pattern.elements[i]) return false;
  }

  return true;
};

DestructuringTransformer.prototype.pushUnpackedArrayPattern = function (pattern, arr) {
  for (var i = 0; i < pattern.elements.length; i++) {
    var elem = pattern.elements[i];
    if (t.isRestElement(elem)) {
      this.push(elem.argument, t.arrayExpression(arr.elements.slice(i)));
    } else {
      this.push(elem, arr.elements[i]);
    }
  }
};

DestructuringTransformer.prototype.pushArrayPattern = function (pattern, arrayRef) {
  if (!pattern.elements) return;

  // optimise basic array destructuring of an array expression
  //
  // we can't do this to a pattern of unequal size to it's right hand
  // array expression as then there will be values that wont be evaluated
  //
  // eg: var [a, b] = [1, 2];

  if (this.canUnpackArrayPattern(pattern, arrayRef)) {
    return this.pushUnpackedArrayPattern(pattern, arrayRef);
  }

  // if we have a rest then we need all the elements so don't tell
  // `scope.toArray` to only get a certain amount

  var count = !hasRest(pattern) && pattern.elements.length;

  // so we need to ensure that the `arrayRef` is an array, `scope.toArray` will
  // return a locally bound identifier if it's been inferred to be an array,
  // otherwise it'll be a call to a helper that will ensure it's one

  var toArray = this.scope.toArray(arrayRef, count);

  if (t.isIdentifier(toArray)) {
    // we've been given an identifier so it must have been inferred to be an
    // array
    arrayRef = toArray;
  } else {
    arrayRef = this.scope.generateUidBasedOnNode(arrayRef);
    this.nodes.push(this.buildVariableDeclaration(arrayRef, toArray));
    this.scope.assignTypeGeneric(arrayRef.name, "Array");
  }

  //

  for (var i = 0; i < pattern.elements.length; i++) {
    var elem = pattern.elements[i];

    // hole
    if (!elem) continue;

    var elemRef;

    if (t.isRestElement(elem)) {
      elemRef = this.scope.toArray(arrayRef);

      if (i > 0) {
        elemRef = t.callExpression(t.memberExpression(elemRef, t.identifier("slice")), [t.literal(i)]);
      }

      // set the element to the rest element argument since we've dealt with it
      // being a rest already
      elem = elem.argument;
    } else {
      elemRef = t.memberExpression(arrayRef, t.literal(i), true);
    }

    this.push(elem, elemRef);
  }
};

DestructuringTransformer.prototype.init = function (pattern, ref) {
  // trying to destructure a value that we can't evaluate more than once so we
  // need to save it to a variable

  if (!t.isArrayExpression(ref) && !t.isMemberExpression(ref) && !t.isIdentifier(ref)) {
    var key = this.scope.generateUidBasedOnNode(ref);
    this.nodes.push(this.buildVariableDeclaration(key, ref));
    ref = key;
  }

  //

  this.push(pattern, ref);
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
    var ref = scope.generateUidIdentifier("ref");

    var destructuring = new DestructuringTransformer({
      blockHoist: node.params.length - i,
      nodes:      nodes,
      scope:      scope,
      file:       file,
      kind:       "var",
    });
    destructuring.init(pattern, ref);

    return ref;
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
