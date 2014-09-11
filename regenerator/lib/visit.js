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
var fs = require("fs");
var recast = require("recast");
var types = recast.types;
var n = types.namedTypes;
var b = types.builders;
var isArray = types.builtInTypes.array;
var isObject = types.builtInTypes.object;
var NodePath = types.NodePath;
var hoist = require("./hoist").hoist;
var Emitter = require("./emit").Emitter;
var runtimeProperty = require("./util").runtimeProperty;
var runtimeWrapMethod = runtimeProperty("wrap");
var runtimeMarkMethod = runtimeProperty("mark");
var runtimeValuesMethod = runtimeProperty("values");
var runtimeAsyncMethod = runtimeProperty("async");

exports.transform = function transform(node, options) {
  node = recast.visit(node, visitor);

  if (options && options.includeRuntime) {
    injectRuntime(n.File.check(node) ? node.program : node);
  }

  return node;
};

function injectRuntime(program) {
  n.Program.assert(program);

  // Include the runtime by modifying the AST rather than by concatenating
  // strings. This technique will allow for more accurate source mapping.
  var runtimePath = require("..").runtime.path;
  var runtime = fs.readFileSync(runtimePath, "utf8");
  var runtimeBody = recast.parse(runtime, {
    sourceFileName: runtimePath
  }).program.body;

  var body = program.body;
  body.unshift.apply(body, runtimeBody);
}

var visitor = types.PathVisitor.fromMethodsObject({
  visitFunction: function(path) {
    // Calling this.traverse(path) first makes for a post-order traversal.
    this.traverse(path);

    var node = path.value;

    if (!node.generator && !node.async) {
      return;
    }

    node.generator = false;

    if (node.expression) {
      // Transform expression lambdas into normal functions.
      node.expression = false;
      node.body = b.blockStatement([
        b.returnStatement(node.body)
      ]);
    }

    if (node.async) {
      awaitVisitor.visit(path.get("body"));
    }

    var outerFnId = node.id || (
      node.id = path.scope.parent.declareTemporary("callee$")
    );

    var innerFnId = b.identifier(node.id.name + "$");
    var contextId = path.scope.declareTemporary("context$");
    var argsId = path.scope.declareTemporary("args$");
    var shouldAliasArguments = renameArguments(path, argsId);
    var vars = hoist(path);

    if (shouldAliasArguments) {
      vars = vars || b.variableDeclaration("var", []);
      vars.declarations.push(b.variableDeclarator(
        argsId, b.identifier("arguments")
      ));
    }

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
      node.async ? b.literal(null) : outerFnId,
      b.thisExpression()
    ];

    var tryEntryList = emitter.getTryEntryList();
    if (tryEntryList) {
      wrapArgs.push(tryEntryList);
    }

    var wrapCall = b.callExpression(
      node.async ? runtimeAsyncMethod : runtimeWrapMethod,
      wrapArgs
    );

    outerBody.push(b.returnStatement(wrapCall));
    node.body = b.blockStatement(outerBody);

    if (node.async) {
      node.async = false;
      return;
    }

    if (n.FunctionDeclaration.check(node)) {
      var pp = path.parent;

      while (pp && !(n.BlockStatement.check(pp.value) ||
                     n.Program.check(pp.value))) {
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

      var varDecl = b.variableDeclaration("var", [
        b.variableDeclarator(
          node.id,
          b.callExpression(runtimeMarkMethod, [node])
        )
      ]);

      if (node.comments) {
        // Copy any comments preceding the function declaration to the
        // variable declaration, to avoid weird formatting consequences.
        varDecl.comments = node.comments;
        node.comments = null;
      }

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
      n.FunctionExpression.assert(node);
      return b.callExpression(runtimeMarkMethod, [node]);
    }
  },

  visitForOfStatement: function(path) {
    this.traverse(path);

    var node = path.value;
    var tempIterId = path.scope.declareTemporary("t$");
    var tempIterDecl = b.variableDeclarator(
      tempIterId,
      b.callExpression(
        runtimeValuesMethod,
        [node.right]
      )
    );

    var tempInfoId = path.scope.declareTemporary("t$");
    var tempInfoDecl = b.variableDeclarator(tempInfoId, null);

    var init = node.left;
    var loopId;
    if (n.VariableDeclaration.check(init)) {
      loopId = init.declarations[0].id;
      init.declarations.push(tempIterDecl, tempInfoDecl);
    } else {
      loopId = init;
      init = b.variableDeclaration("var", [
        tempIterDecl,
        tempInfoDecl
      ]);
    }
    n.Identifier.assert(loopId);

    var loopIdAssignExprStmt = b.expressionStatement(
      b.assignmentExpression(
        "=",
        loopId,
        b.memberExpression(
          tempInfoId,
          b.identifier("value"),
          false
        )
      )
    );

    if (n.BlockStatement.check(node.body)) {
      node.body.body.unshift(loopIdAssignExprStmt);
    } else {
      node.body = b.blockStatement([
        loopIdAssignExprStmt,
        node.body
      ]);
    }

    return b.forStatement(
      init,
      b.unaryExpression(
        "!",
        b.memberExpression(
          b.assignmentExpression(
            "=",
            tempInfoId,
            b.callExpression(
              b.memberExpression(
                tempIterId,
                b.identifier("next"),
                false
              ),
              []
            )
          ),
          b.identifier("done"),
          false
        )
      ),
      null,
      node.body
    );
  }
});

function shouldNotHoistAbove(stmtPath) {
  var value = stmtPath.value;
  n.Statement.assert(value);

  // If the first statement is a "use strict" declaration, make sure to
  // insert hoisted declarations afterwards.
  if (n.ExpressionStatement.check(value) &&
      n.Literal.check(value.expression) &&
      value.expression.value === "use strict") {
    return true;
  }

  if (n.VariableDeclaration.check(value)) {
    for (var i = 0; i < value.declarations.length; ++i) {
      var decl = value.declarations[i];
      if (n.CallExpression.check(decl.init) &&
          types.astNodesAreEquivalent(decl.init.callee,
                                      runtimeMarkMethod)) {
        return true;
      }
    }
  }

  return false;
}

function renameArguments(funcPath, argsId) {
  assert.ok(funcPath instanceof types.NodePath);
  var func = funcPath.value;
  var didReplaceArguments = false;
  var hasImplicitArguments = false;

  recast.visit(funcPath, {
    visitFunction: function(path) {
      if (path.value === func) {
        hasImplicitArguments = !path.scope.lookup("arguments");
        this.traverse(path);
      } else {
        return false;
      }
    },

    visitIdentifier: function(path) {
      if (path.value.name === "arguments") {
        var isMemberProperty =
          n.MemberExpression.check(path.parent.node) &&
          path.name === "property" &&
          !path.parent.node.computed;

        if (!isMemberProperty) {
          path.replace(argsId);
          didReplaceArguments = true;
          return false;
        }
      }

      this.traverse(path);
    }
  });

  // If the traversal replaced any arguments identifiers, and those
  // identifiers were free variables, then we need to alias the outer
  // function's arguments object to the variable named by argsId.
  return didReplaceArguments && hasImplicitArguments;
}

var awaitVisitor = types.PathVisitor.fromMethodsObject({
  visitFunction: function(path) {
    return false; // Don't descend into nested function scopes.
  },

  visitAwaitExpression: function(path) {
    // Convert await expressions to yield expressions.
    return b.yieldExpression(path.value.argument, false);
  }
});
