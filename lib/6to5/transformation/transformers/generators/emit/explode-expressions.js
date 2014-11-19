/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var loc    = require("../util").loc;
var t      = require("../../../../types");

exports.ParenthesizedExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(this.explodeExpression(path.get("expression")));
};

exports.MemberExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.memberExpression(
    this.explodeExpression(path.get("object")),
    expr.computed ? explodeViaTempVar(null, path.get("property")) : expr.property,
    expr.computed
  ));
};

exports.CallExpression = function (expr, path, explodeViaTempVar, finish) {
  var oldCalleePath = path.get("callee");
  var newCallee = this.explodeExpression(oldCalleePath);

  // If the callee was not previously a MemberExpression, then the
  // CallExpression was "unqualified," meaning its `this` object should
  // be the global object. If the exploded expression has become a
  // MemberExpression, then we need to force it to be unqualified by
  // using the (0, object.property)(...) trick; otherwise, it will
  // receive the object of the MemberExpression as its `this` object.
  if (!t.isMemberExpression(oldCalleePath.node) && t.isMemberExpression(newCallee)) {
    newCallee = t.sequenceExpression([
      t.literal(0),
      newCallee
    ]);
  }

  return finish(t.callExpression(
    newCallee,
    path.get("arguments").map(function (argPath) {
      return explodeViaTempVar(null, argPath);
    })
  ));
};

exports.NewExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.newExpression(
    explodeViaTempVar(null, path.get("callee")),
    path.get("arguments").map(function (argPath) {
      return explodeViaTempVar(null, argPath);
    })
  ));
};

exports.ObjectExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.objectExpression(
    path.get("properties").map(function (propPath) {
      return t.property(
        propPath.value.kind,
        propPath.value.key,
        explodeViaTempVar(null, propPath.get("value"))
      );
    })
  ));
};

exports.ArrayExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.arrayExpression(
    path.get("elements").map(function (elemPath) {
      return explodeViaTempVar(null, elemPath);
    })
  ));
};

exports.SequenceExpression = function (expr, path, explodeViaTempVar, finish, ignoreResult) {
  var lastIndex = expr.expressions.length - 1;
  var self = this;
  var result;

  path.get("expressions").each(function (exprPath) {
    if (exprPath.name === lastIndex) {
      result = self.explodeExpression(exprPath, ignoreResult);
    } else {
      self.explodeExpression(exprPath, true);
    }
  });

  return result;
};

exports.LogicalExpression = function (expr, path, explodeViaTempVar, finish, ignoreResult) {
  var after = loc();
  var result;

  if (!ignoreResult) {
    result = this.makeTempVar();
  }

  var left = explodeViaTempVar(result, path.get("left"));

  if (expr.operator === "&&") {
    this.jumpIfNot(left, after);
  } else {
    assert.strictEqual(expr.operator, "||");
    this.jumpIf(left, after);
  }

  explodeViaTempVar(result, path.get("right"), ignoreResult);

  this.mark(after);

  return result;
};

exports.ConditionalExpression = function (expr, path, explodeViaTempVar, finish, ignoreResult) {
  var elseLoc = loc();
  var after = loc();
  var test = this.explodeExpression(path.get("test"));
  var result;

  this.jumpIfNot(test, elseLoc);

  if (!ignoreResult) {
    result = this.makeTempVar();
  }

  explodeViaTempVar(result, path.get("consequent"), ignoreResult);
  this.jump(after);

  this.mark(elseLoc);
  explodeViaTempVar(result, path.get("alternate"), ignoreResult);

  this.mark(after);

  return result;
};

exports.UnaryExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.unaryExpression(
    expr.operator,
    // Can't (and don't need to) break up the syntax of the argument.
    // Think about delete a[b].
    this.explodeExpression(path.get("argument")),
    !!expr.prefix
  ));
};

exports.BinaryExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.binaryExpression(
    expr.operator,
    explodeViaTempVar(null, path.get("left")),
    explodeViaTempVar(null, path.get("right"))
  ));
};

exports.AssignmentExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.assignmentExpression(
    expr.operator,
    this.explodeExpression(path.get("left")),
    this.explodeExpression(path.get("right"))
  ));
};

exports.UpdateExpression = function (expr, path, explodeViaTempVar, finish) {
  return finish(t.updateExpression(
    expr.operator,
    this.explodeExpression(path.get("argument")),
    expr.prefix
  ));
};

exports.YieldExpression = function (expr, path) {
  var after = loc();
  var arg = expr.argument && this.explodeExpression(path.get("argument"));
  var result;

  if (arg && expr.delegate) {
    result = this.makeTempVar();

    this.emit(t.returnStatement(t.callExpression(
      this.contextProperty("delegateYield"), [
        arg,
        t.literal(result.property.name),
        after
      ]
    )));

    this.mark(after);

    return result;
  }

  this.emitAssign(this.contextProperty("next"), after);
  this.emit(t.returnStatement(arg || null));
  this.mark(after);

  return this.contextProperty("sent");
};
