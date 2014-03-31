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
var types = require("recast").types;
var n = types.namedTypes;
var b = types.builders;
var hasOwn = Object.prototype.hasOwnProperty;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function(funPath) {
  assert.ok(funPath instanceof types.NodePath);
  n.Function.assert(funPath.value);

  var vars = {};

  function varDeclToExpr(vdec, includeIdentifiers) {
    n.VariableDeclaration.assert(vdec);
    var exprs = [];

    vdec.declarations.forEach(function(dec) {
      vars[dec.id.name] = dec.id;

      if (dec.init) {
        exprs.push(b.assignmentExpression(
          "=", dec.id, dec.init
        ));
      } else if (includeIdentifiers) {
        exprs.push(dec.id);
      }
    });

    if (exprs.length === 0)
      return null;

    if (exprs.length === 1)
      return exprs[0];

    return b.sequenceExpression(exprs);
  }

  types.traverse(funPath.get("body"), function(node) {
    if (n.VariableDeclaration.check(node)) {
      var expr = varDeclToExpr(node, false);
      if (expr === null) {
        this.replace();
      } else {
        // We don't need to traverse this expression any further because
        // there can't be any new declarations inside an expression.
        this.replace(b.expressionStatement(expr));
      }

      // Since the original node has been either removed or replaced,
      // avoid traversing it any further.
      return false;

    } else if (n.ForStatement.check(node)) {
      if (n.VariableDeclaration.check(node.init)) {
        var expr = varDeclToExpr(node.init, false);
        this.get("init").replace(expr);
      }

    } else if (n.ForInStatement.check(node)) {
      if (n.VariableDeclaration.check(node.left)) {
        var expr = varDeclToExpr(node.left, true);
        this.get("left").replace(expr);
      }

    } else if (n.FunctionDeclaration.check(node)) {
      vars[node.id.name] = node.id;

      var parentNode = this.parent.node;
      var assignment = b.expressionStatement(
        b.assignmentExpression(
          "=",
          node.id,
          b.functionExpression(
            node.id,
            node.params,
            node.body,
            node.generator,
            node.expression
          )
        )
      );

      if (n.BlockStatement.check(this.parent.node)) {
        // Note that the function declaration we want to remove might be
        // the same node that firstStmtPath refers to, in case the
        // function declaration was already the first statement in the
        // enclosing block statement.
        var firstStmtPath = this.parent.get("body", 0);

        // Insert the assignment form before the first statement in the
        // enclosing block.
        firstStmtPath.replace(assignment, firstStmtPath.value);

        // Remove the function declaration now that we've inserted the
        // equivalent assignment form at the beginning of the block.
        this.replace();

      } else {
        // If the parent node is not a block statement, then we can just
        // replace the declaration with the equivalent assignment form
        // without worrying about hoisting it.
        this.replace(assignment);
      }

      // Don't hoist variables out of inner functions.
      return false;

    } else if (n.FunctionExpression.check(node)) {
      // Don't descend into nested function expressions.
      return false;
    }
  });

  var paramNames = {};
  funPath.get("params").each(function(paramPath) {
    var param = paramPath.value;
    if (n.Identifier.check(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  var declarations = [];

  Object.keys(vars).forEach(function(name) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(b.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return b.variableDeclaration("var", declarations);
};
