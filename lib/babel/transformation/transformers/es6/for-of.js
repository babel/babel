"use strict";

var messages = require("../../../messages");
var util     = require("../../../util");
var t        = require("../../../types");

exports.check = t.isForOfStatement;

exports.ForOfStatement = function (node, parent, scope, file) {
  var callback = spec;
  if (file.isLoose("es6.forOf")) callback = loose;

  var build  = callback(node, parent, scope, file);
  var declar = build.declar;
  var loop   = build.loop;
  var block  = loop.body;

  // inherit comments from the original loop
  t.inheritsComments(loop, node);

  // ensure that it's a block so we can take all its statements
  t.ensureBlock(node);

  // add the value declaration to the new loop body
  if (declar) {
    block.body.push(declar);
  }

  // push the rest of the original loop body onto our new body
  block.body = block.body.concat(node.body.body);

  t.inherits(loop, node);

  // todo: find out why this is necessary? #538
  loop._scopeInfo = node._scopeInfo;

  return loop;
};

var loose = function (node, parent, scope, file) {
  var left = node.left;
  var declar, id;

  if (t.isIdentifier(left) || t.isPattern(left)) {
    // for (i of test), for ({ i } of test)
    id = left;
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    id = scope.generateUidIdentifier("ref");
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, id)
    ]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }

  var loop = util.template("for-of-loose", {
    LOOP_OBJECT:  scope.generateUidIdentifier("iterator"),
    IS_ARRAY:     scope.generateUidIdentifier("isArray"),
    OBJECT:       node.right,
    INDEX:        scope.generateUidIdentifier("i"),
    ID:           id
  });

  if (!declar) {
    // no declaration so we need to remove the variable declaration at the top of
    // the for-of-loose template
    loop.body.body.shift();
  }

  return {
    declar: declar,
    loop:   loop
  };
};

var spec = function (node, parent, scope, file) {
  var left = node.left;
  var declar;

  var stepKey   = scope.generateUidIdentifier("step");
  var stepValue = t.memberExpression(stepKey, t.identifier("value"));

  if (t.isIdentifier(left) || t.isPattern(left)) {
    // for (i of test), for ({ i } of test)
    declar = t.expressionStatement(t.assignmentExpression("=", left, stepValue));
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(left.declarations[0].id, stepValue)
    ]);
  } else {
    throw file.errorWithNode(left, messages.get("unknownForHead", left.type));
  }

  var loop = util.template("for-of", {
    ITERATOR_KEY: scope.generateUidIdentifier("iterator"),
    STEP_KEY:     stepKey,
    OBJECT:       node.right
  });

  return {
    declar: declar,
    loop:   loop
  };
};
