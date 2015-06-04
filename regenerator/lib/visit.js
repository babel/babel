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
var getMarkInfo = require("private").makeAccessor();

exports.transform = function transform(node, options) {
  options = options || {};

  var path = node instanceof NodePath ? node : new NodePath(node);
  visitor.visit(path, options);
  node = path.value;

  if (options.includeRuntime === true ||
      (options.includeRuntime === 'if used' && visitor.wasChangeReported())) {
    injectRuntime(n.File.check(node) ? node.program : node);
  }

  options.madeChanges = visitor.wasChangeReported();

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
  reset: function(node, options) {
    this.options = options;
  },

  visitFunction: function(path) {
    // Calling this.traverse(path) first makes for a post-order traversal.
    this.traverse(path);

    var node = path.value;
    var shouldTransformAsync = node.async && !this.options.disableAsync;

    if (!node.generator && !shouldTransformAsync) {
      return;
    }

    this.reportChanged();

    if (node.expression) {
      // Transform expression lambdas into normal functions.
      node.expression = false;
      node.body = b.blockStatement([
        b.returnStatement(node.body)
      ]);
    }

    if (shouldTransformAsync) {
      awaitVisitor.visit(path.get("body"));
    }

    var outerBody = [];
    var innerBody = [];
    var bodyPath = path.get("body", "body");

    bodyPath.each(function(childPath) {
      var node = childPath.value;
      if (node && node._blockHoist != null) {
        outerBody.push(node);
      } else {
        innerBody.push(node);
      }
    });

    if (outerBody.length > 0) {
      // Only replace the inner body if we actually hoisted any statements
      // to the outer body.
      bodyPath.replace(innerBody);
    }

    var outerFnExpr = getOuterFnExpr(path);
    // Note that getOuterFnExpr has the side-effect of ensuring that the
    // function has a name (so node.id will always be an Identifier), even
    // if a temporary name has to be synthesized.
    n.Identifier.assert(node.id);
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

    if (vars && vars.declarations.length > 0) {
      outerBody.push(vars);
    }

    var wrapArgs = [
      emitter.getContextFunction(innerFnId),
      // Async functions that are not generators don't care about the
      // outer function because they don't need it to be marked and don't
      // inherit from its .prototype.
      node.generator ? outerFnExpr : b.literal(null),
      b.thisExpression()
    ];

    var tryLocsList = emitter.getTryLocsList();
    if (tryLocsList) {
      wrapArgs.push(tryLocsList);
    }

    var wrapCall = b.callExpression(
      runtimeProperty(shouldTransformAsync ? "async" : "wrap"),
      wrapArgs
    );

    outerBody.push(b.returnStatement(wrapCall));
    node.body = b.blockStatement(outerBody);

    var wasGeneratorFunction = node.generator;
    if (wasGeneratorFunction) {
      node.generator = false;
    }

    if (shouldTransformAsync) {
      node.async = false;
    }

    if (wasGeneratorFunction &&
        n.Expression.check(node)) {
      return b.callExpression(runtimeProperty("mark"), [node]);
    }
  },

  visitForOfStatement: function(path) {
    this.traverse(path);

    var node = path.value;
    var tempIterId = path.scope.declareTemporary("t$");
    var tempIterDecl = b.variableDeclarator(
      tempIterId,
      b.callExpression(
        runtimeProperty("values"),
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

// Given a NodePath for a Function, return an Expression node that can be
// used to refer reliably to the function object from inside the function.
// This expression is essentially a replacement for arguments.callee, with
// the key advantage that it works in strict mode.
function getOuterFnExpr(funPath) {
  var node = funPath.value;
  n.Function.assert(node);

  if (node.generator && // Non-generator functions don't need to be marked.
      n.FunctionDeclaration.check(node)) {
    var pp = funPath.parent;

    while (pp && !(n.BlockStatement.check(pp.value) ||
                   n.Program.check(pp.value))) {
      pp = pp.parent;
    }

    if (!pp) {
      return node.id;
    }

    var markDecl = getRuntimeMarkDecl(pp);
    var markedArray = markDecl.declarations[0].id;
    var funDeclIdArray = markDecl.declarations[0].init.callee.object;
    n.ArrayExpression.assert(funDeclIdArray);

    var index = funDeclIdArray.elements.length;
    funDeclIdArray.elements.push(node.id);

    return b.memberExpression(
      markedArray,
      b.literal(index),
      true
    );
  }

  return node.id || (
    node.id = funPath.scope.parent.declareTemporary("callee$")
  );
}

function getRuntimeMarkDecl(blockPath) {
  assert.ok(blockPath instanceof NodePath);
  var block = blockPath.node;
  isArray.assert(block.body);

  var info = getMarkInfo(block);
  if (info.decl) {
    return info.decl;
  }

  info.decl = b.variableDeclaration("var", [
    b.variableDeclarator(
      blockPath.scope.declareTemporary("marked"),
      b.callExpression(
        b.memberExpression(
          b.arrayExpression([]),
          b.identifier("map"),
          false
        ),
        [runtimeProperty("mark")]
      )
    )
  ]);

  for (var i = 0; i < block.body.length; ++i) {
    if (!shouldNotHoistAbove(blockPath.get("body", i))) {
      break;
    }
  }

  blockPath.get("body").insertAt(i, info.decl);

  return info.decl;
}

function shouldNotHoistAbove(stmtPath) {
  var value = stmtPath.value;
  n.Statement.assert(value);

  // If the first statement is a "use strict" declaration, make sure to
  // insert hoisted declarations afterwards.
  return n.ExpressionStatement.check(value) &&
    n.Literal.check(value.expression) &&
    value.expression.value === "use strict";
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
    // Convert await and await* expressions to yield expressions.
    var argument = path.value.argument;

    // If the parser supports await* syntax using a boolean .all property
    // (#171), desugar that syntax to yield Promise.all(argument).
    if (path.value.all) {
      argument = b.callExpression(
        b.memberExpression(
          b.identifier("Promise"),
          b.identifier("all"),
          false
        ),
        [argument]
      );
    }

    // Transforming `await x` to `yield regeneratorRuntime.awrap(x)`
    // causes the argument to be wrapped in such a way that the runtime
    // can distinguish between awaited and merely yielded values.
    return b.yieldExpression(
      b.callExpression(
        runtimeProperty("awrap"),
        [argument]
      ),
      false
    );
  }
});
