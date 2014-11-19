/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.githut.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var assert = require("assert");
var types  = require("ast-types");
var t      = require("../../../types");
var _      = require("lodash");

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function (funPath) {
  assert.ok(funPath instanceof types.NodePath);
  t.assertFunction(funPath.value);

  var vars = {};

  function varDeclToExpr(vdec, includeIdentifiers) {
    t.assertVariableDeclaration(vdec);
    var exprs = [];

    vdec.declarations.forEach(function (dec) {
      vars[dec.id.name] = dec.id;

      if (dec.init) {
        exprs.push(t.assignmentExpression(
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

    return t.sequenceExpression(exprs);
  }

  types.visit(funPath.get("body"), {
    visitVariableDeclaration: function (path) {
      var expr = varDeclToExpr(path.value, false);
      if (expr === null) {
        path.replace();
      } else {
        // We don't need to traverse this expression any further because
        // there can't be any new declarations inside an expression.
        return t.expressionStatement(expr);
      }

      // Since the original node has been either removed or replaced,
      // avoid traversing it any further.
      return false;
    },

    visitForStatement: function (path) {
      var init = path.value.init;
      if (t.isVariableDeclaration(init)) {
        path.get("init").replace(varDeclToExpr(init, false));
      }
      this.traverse(path);
    },

    visitForInStatement: function (path) {
      var left = path.value.left;
      if (t.isVariableDeclaration(left)) {
        path.get("left").replace(varDeclToExpr(left, true));
      }
      this.traverse(path);
    },

    visitFunctionDeclaration: function (path) {
      var node = path.value;
      vars[node.id.name] = node.id;

      var assignment = t.expressionStatement(
        t.assignmentExpression(
          "=",
          node.id,
          t.functionExpression(
            node.id,
            node.params,
            node.body,
            node.generator,
            node.expression
          )
        )
      );

      if (t.isBlockStatement(path.parent.node)) {
        // Insert the assignment form before the first statement in the
        // enclosing block.
        path.parent.get("body").unshift(assignment);

        // Remove the function declaration now that we've inserted the
        // equivalent assignment form at the beginning of the block.
        path.replace();

      } else {
        // If the parent node is not a block statement, then we can just
        // replace the declaration with the equivalent assignment form
        // without worrying about hoisting it.
        path.replace(assignment);
      }

      // Don't hoist variables out of inner functions.
      return false;
    },

    visitFunctionExpression: function () {
      // Don't descend into nested function expressions.
      return false;
    }
  });

  var paramNames = {};
  funPath.get("params").each(function (paramPath) {
    var param = paramPath.value;
    if (t.isIdentifier(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  var declarations = [];

  Object.keys(vars).forEach(function (name) {
    if (!_.has(paramNames, name)) {
      declarations.push(t.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return t.variableDeclaration("var", declarations);
};
