"use strict";

var util = require("../../util");
var t    = require("../../types");

exports.ForOfStatement = function (node, parent, scope, context, file) {
  var callback = spec;
  if (file.isLoose("forOf")) callback = loose;

  var build  = callback(node, parent, scope, context, file);
  var declar = build.declar;
  var loop   = build.loop;
  var block  = loop.body;

  // inherit comments from the original loop
  t.inheritsComments(loop, node);

  // ensure that it's a block so we can take all it's statemetns
  t.ensureBlock(node);

  // add the value declaration to the new loop body
  if (declar){
    if (build.shouldUnshift) {
      block.body.unshift(declar);
    } else {
      block.body.push(declar);
    }
  }

  // push the rest of the original loop body onto our new body
  block.body = block.body.concat(node.body.body);

  // todo: find out why this is necessary? #538
  loop._scopeInfo = node._scopeInfo;

  return loop;
};

var loose = function (node, parent, scope, context, file) {
  var left = node.left;
  var declar, id;

  if (t.isIdentifier(left) || t.isPattern(left)) {
    // for (i of test), for ({ i } of test)
    id = left;
  } else if (t.isVariableDeclaration(left)) {
    // for (var i of test)
    id = left.declarations[0].id;
    declar = t.variableDeclaration(left.kind, [
      t.variableDeclarator(id)
    ]);
  } else {
    throw file.errorWithNode(left, "Unknown node type " + left.type + " in ForOfStatement");
  }

  var loop = util.template("for-of-loose", {
    LOOP_OBJECT:  file.generateUidIdentifier("iterator", scope),
    IS_ARRAY:     file.generateUidIdentifier("isArray", scope),
    OBJECT:       node.right,
    INDEX:        file.generateUidIdentifier("i", scope),
    ID:           id
  });

  return {
    shouldUnshift: true,
    declar:        declar,
    loop:          loop
  };
};

var spec = function (node, parent, scope, context, file) {
  var left = node.left;
  var declar;

  var stepKey   = file.generateUidIdentifier("step", scope);
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
    throw file.errorWithNode(left, "Unknown node type " + left.type + " in ForOfStatement");
  }

  var loop = util.template("for-of", {
    ITERATOR_KEY: file.generateUidIdentifier("iterator", scope),
    STEP_KEY:     stepKey,
    OBJECT:       node.right
  });

  return {
    declar: declar,
    loop:   loop
  };
};
