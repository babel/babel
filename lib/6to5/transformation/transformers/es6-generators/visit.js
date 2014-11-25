/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.githut.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

var runtimeProperty = require("./util").runtimeProperty;
var Emitter         = require("./emit").Emitter;
var hoist           = require("./hoist").hoist;
var types           = require("ast-types");
var t               = require("../../../types");

var runtimeAsyncMethod = runtimeProperty("async");
var runtimeWrapMethod  = runtimeProperty("wrap");
var runtimeMarkMethod  = runtimeProperty("mark");

exports.transform = function transform(node, file) {
  return types.visit(node, {
    visitFunction: function (path) {
      return visitor.call(this, path, file);
    }
  });
};

var visitor = function (path, file) {
  // Calling this.traverse(path) first makes for a post-order traversal.
  this.traverse(path);

  var node = path.value;
  var scope; // we need to actually get the current scope

  if (!node.generator && !node.async) {
    return;
  }

  node.generator = false;

  if (node.expression) {
    // Transform expression lambdas into normal functions.
    node.expression = false;
    node.body = t.blockStatement([
      t.returnStatement(node.body)
    ]);
  }

  if (node.async) {
    awaitVisitor.visit(path.get("body"));
  }

  var outerFnId = node.id || (
    node.id = file.generateUidIdentifier("callee", scope)
  );

  var innerFnId = t.identifier(node.id.name + "$");
  var contextId = file.generateUidIdentifier("context", scope);
  var vars = hoist(path);

  var emitter = new Emitter(contextId);
  emitter.explode(path.get("body"));

  var outerBody = [];

  if (vars && vars.declarations.length > 0) {
    outerBody.push(vars);
  }

  var wrapArgs = [
    emitter.getContextFunction(innerFnId),
    // Async functions don't care about the outer function because they
    // don't need it to be marked and don't inherit from its .prototype.
    node.async ? t.literal(null) : outerFnId,
    t.thisExpression()
  ];

  var tryEntryList = emitter.getTryEntryList();
  if (tryEntryList) {
    wrapArgs.push(tryEntryList);
  }

  var wrapCall = t.callExpression(
    node.async ? runtimeAsyncMethod : runtimeWrapMethod,
    wrapArgs
  );

  outerBody.push(t.returnStatement(wrapCall));
  node.body = t.blockStatement(outerBody);

  if (node.async) {
    node.async = false;
    return;
  }

  if (t.isFunctionDeclaration(node)) {
    var pp = path.parent;

    while (pp && !(t.isBlockStatement(pp.value) || t.isProgram(pp.value))) {
      pp = pp.parent;
    }

    if (!pp) {
      return;
    }

    // Here we turn the FunctionDeclaration into a named
    // FunctionExpression that will be assigned to a variable of the
    // same name at the top of the enclosing block. This is important
    // for a very subtle reason: named function expressions can refer to
    // themselves by name without fear that the binding may change due
    // to code executing outside the function, whereas function
    // declarations are vulnerable to the following rebinding:
    //
    //   function f() { return f }
    //   var g = f;
    //   f = "asdf";
    //   g(); // "asdf"
    //
    // One way to prevent the problem illustrated above is to transform
    // the function declaration thus:
    //
    //   var f = function f() { return f };
    //   var g = f;
    //   f = "asdf";
    //   g(); // f
    //   g()()()()(); // f
    //
    // In the code below, we transform generator function declarations
    // in the following way:
    //
    //   gen().next(); // { value: gen, done: true }
    //   function *gen() {
    //     return gen;
    //   }
    //
    // becomes something like
    //
    //   var gen = runtime.mark(function *gen() {
    //     return gen;
    //   });
    //   gen().next(); // { value: gen, done: true }
    //
    // which ensures that the generator body can always reliably refer
    // to gen by name.

    // Remove the FunctionDeclaration so that we can add it back as a
    // FunctionExpression passed to runtime.mark.
    path.replace();

    // Change the type of the function to be an expression instead of a
    // declaration. Note that all the other fields are the same.
    node.type = "FunctionExpression";

    var varDecl = t.variableDeclaration("var", [
      t.variableDeclarator(
        node.id,
        t.callExpression(runtimeMarkMethod, [node])
      )
    ]);

    // Copy any comments preceding the function declaration to the
    // variable declaration, to avoid weird formatting consequences.
    t.inheritsComments(varDecl, node);
    t.removeComments(node);

    varDecl._blockHoist = true;

    var bodyPath = pp.get("body");
    var bodyLen = bodyPath.value.length;

    for (var i = 0; i < bodyLen; ++i) {
      var firstStmtPath = bodyPath.get(i);
      if (!shouldNotHoistAbove(firstStmtPath)) {
        firstStmtPath.insertBefore(varDecl);
        return;
      }
    }

    bodyPath.push(varDecl);
  } else {
    t.assertFunctionExpression(node);
    return t.callExpression(runtimeMarkMethod, [node]);
  }
};

function shouldNotHoistAbove(stmtPath) {
  var value = stmtPath.value;
  t.assertStatement(value);

  // If the first statement is a "use strict" declaration, make sure to
  // insert hoisted declarations afterwards.
  if (t.isExpressionStatement(value) &&
      t.isLiteral(value.expression) &&
      value.expression.value === "use strict") {
    return true;
  }

  if (t.isVariableDeclaration(value)) {
    for (var i = 0; i < value.declarations.length; ++i) {
      var decl = value.declarations[i];
      if (t.isCallExpression(decl.init) && types.astNodesAreEquivalent(decl.init.callee, runtimeMarkMethod)) {
        return true;
      }
    }
  }

  return false;
}

var awaitVisitor = types.PathVisitor.fromMethodsObject({
  visitFunction: function () {
    return false; // Don't descend into nested function scopes.
  },

  visitAwaitExpression: function (path) {
    // Convert await expressions to yield expressions.
    return t.yieldExpression(path.value.argument, false);
  }
});
