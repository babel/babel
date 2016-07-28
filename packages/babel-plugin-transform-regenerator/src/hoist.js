/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

import * as t from "babel-types";
let hasOwn = Object.prototype.hasOwnProperty;

// The hoist function takes a FunctionExpression or FunctionDeclaration
// and replaces any Declaration nodes in its body with assignments, then
// returns a VariableDeclaration containing just the names of the removed
// declarations.
exports.hoist = function(funPath) {
  t.assertFunction(funPath.node);

  let vars = {};

  function varDeclToExpr(vdec, includeIdentifiers) {
    t.assertVariableDeclaration(vdec);
    // TODO assert.equal(vdec.kind, "var");
    let exprs = [];

    vdec.declarations.forEach(function(dec) {
      // Note: We duplicate 'dec.id' here to ensure that the variable declaration IDs don't
      // have the same 'loc' value, since that can make sourcemaps and retainLines behave poorly.
      vars[dec.id.name] = t.identifier(dec.id.name);

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

  funPath.get("body").traverse({
    VariableDeclaration: {
      exit: function(path) {
        let expr = varDeclToExpr(path.node, false);
        if (expr === null) {
          path.remove();
        } else {
          // We don't need to traverse this expression any further because
          // there can't be any new declarations inside an expression.
          path.replaceWith(t.expressionStatement(expr));
        }

        // Since the original node has been either removed or replaced,
        // avoid traversing it any further.
        path.skip();
      }
    },

    ForStatement: function(path) {
      let init = path.node.init;
      if (t.isVariableDeclaration(init)) {
        path.get("init").replaceWith(varDeclToExpr(init, false));
      }
    },

    ForXStatement: function(path) {
      let left = path.get("left");
      if (left.isVariableDeclaration()) {
        left.replaceWith(varDeclToExpr(left.node, true));
      }
    },

    FunctionDeclaration: function(path) {
      let node = path.node;
      vars[node.id.name] = node.id;

      let assignment = t.expressionStatement(
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

      if (path.parentPath.isBlockStatement()) {
        // Insert the assignment form before the first statement in the
        // enclosing block.
        path.parentPath.unshiftContainer("body", assignment);

        // Remove the function declaration now that we've inserted the
        // equivalent assignment form at the beginning of the block.
        path.remove();
      } else {
        // If the parent node is not a block statement, then we can just
        // replace the declaration with the equivalent assignment form
        // without worrying about hoisting it.
        path.replaceWith(assignment);
      }

      // Don't hoist variables out of inner functions.
      path.skip();
    },

    FunctionExpression: function(path) {
      // Don't descend into nested function expressions.
      path.skip();
    }
  });

  let paramNames = {};
  funPath.get("params").forEach(function(paramPath) {
    let param = paramPath.node;
    if (t.isIdentifier(param)) {
      paramNames[param.name] = param;
    } else {
      // Variables declared by destructuring parameter patterns will be
      // harmlessly re-declared.
    }
  });

  let declarations = [];

  Object.keys(vars).forEach(function(name) {
    if (!hasOwn.call(paramNames, name)) {
      declarations.push(t.variableDeclarator(vars[name], null));
    }
  });

  if (declarations.length === 0) {
    return null; // Be sure to handle this case!
  }

  return t.variableDeclaration("var", declarations);
};
