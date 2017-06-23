/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

import assert from "assert";
import * as t from "babel-types";
import { hoist } from "./hoist";
import { Emitter } from "./emit";
import replaceShorthandObjectMethod from "./replaceShorthandObjectMethod";
import * as util from "./util";

let getMarkInfo = require("private").makeAccessor();

exports.name = "regenerator-transform";

exports.visitor = {
  Function: {
    exit: function(path, state) {
      let node = path.node;

      if (node.generator) {
        if (node.async) {
          // Async generator
          if (state.opts.asyncGenerators === false) return;
        } else {
          // Plain generator
          if (state.opts.generators === false) return;
        }
      } else if (node.async) {
        // Async function
        if (state.opts.async === false) return;
      } else {
        // Not a generator or async function.
        return;
      }

      // if this is an ObjectMethod, we need to convert it to an ObjectProperty
      path = replaceShorthandObjectMethod(path);
      node = path.node;

      let contextId = path.scope.generateUidIdentifier("context");
      let argsId = path.scope.generateUidIdentifier("args");

      path.ensureBlock();
      let bodyBlockPath = path.get("body");

      if (node.async) {
        bodyBlockPath.traverse(awaitVisitor);
      }

      bodyBlockPath.traverse(functionSentVisitor, {
        context: contextId
      });

      let outerBody = [];
      let innerBody = [];

      bodyBlockPath.get("body").forEach(function(childPath) {
        let node = childPath.node;
        if (t.isExpressionStatement(node) &&
            t.isStringLiteral(node.expression)) {
          // Babylon represents directives like "use strict" as elements
          // of a bodyBlockPath.node.directives array, but they could just
          // as easily be represented (by other parsers) as traditional
          // string-literal-valued expression statements, so we need to
          // handle that here. (#248)
          outerBody.push(node);
        } else if (node && node._blockHoist != null) {
          outerBody.push(node);
        } else {
          innerBody.push(node);
        }
      });

      if (outerBody.length > 0) {
        // Only replace the inner body if we actually hoisted any statements
        // to the outer body.
        bodyBlockPath.node.body = innerBody;
      }

      let outerFnExpr = getOuterFnExpr(path);
      // Note that getOuterFnExpr has the side-effect of ensuring that the
      // function has a name (so node.id will always be an Identifier), even
      // if a temporary name has to be synthesized.
      t.assertIdentifier(node.id);
      let innerFnId = t.identifier(node.id.name + "$");

      // Turn all declarations into vars, and replace the original
      // declarations with equivalent assignment expressions.
      let vars = hoist(path);

      let didRenameArguments = renameArguments(path, argsId);
      if (didRenameArguments) {
        vars = vars || t.variableDeclaration("var", []);
        const argumentIdentifier = t.identifier("arguments");
        // we need to do this as otherwise arguments in arrow functions gets hoisted
        argumentIdentifier._shadowedFunctionLiteral = path;
        vars.declarations.push(t.variableDeclarator(
          argsId, argumentIdentifier
        ));
      }

      let emitter = new Emitter(contextId);
      emitter.explode(path.get("body"));

      if (vars && vars.declarations.length > 0) {
        outerBody.push(vars);
      }

      let wrapArgs = [
        emitter.getContextFunction(innerFnId),
        // Async functions that are not generators don't care about the
        // outer function because they don't need it to be marked and don't
        // inherit from its .prototype.
        node.generator ? outerFnExpr : t.nullLiteral(),
        t.thisExpression()
      ];

      let tryLocsList = emitter.getTryLocsList();
      if (tryLocsList) {
        wrapArgs.push(tryLocsList);
      }

      let wrapCall = t.callExpression(
        util.runtimeProperty(node.async ? "async" : "wrap"),
        wrapArgs
      );

      outerBody.push(t.returnStatement(wrapCall));
      node.body = t.blockStatement(outerBody);

      const oldDirectives = bodyBlockPath.node.directives;
      if (oldDirectives) {
        // Babylon represents directives like "use strict" as elements of
        // a bodyBlockPath.node.directives array. (#248)
        node.body.directives = oldDirectives;
      }

      let wasGeneratorFunction = node.generator;
      if (wasGeneratorFunction) {
        node.generator = false;
      }

      if (node.async) {
        node.async = false;
      }

      if (wasGeneratorFunction && t.isExpression(node)) {
        path.replaceWith(t.callExpression(util.runtimeProperty("mark"), [node]));
      }

      // Generators are processed in 'exit' handlers so that regenerator only has to run on
      // an ES5 AST, but that means traversal will not pick up newly inserted references
      // to things like 'regeneratorRuntime'. To avoid this, we explicitly requeue.
      path.requeue();
    }
  }
};

// Given a NodePath for a Function, return an Expression node that can be
// used to refer reliably to the function object from inside the function.
// This expression is essentially a replacement for arguments.callee, with
// the key advantage that it works in strict mode.
function getOuterFnExpr(funPath) {
  let node = funPath.node;
  t.assertFunction(node);

  if (!node.id) {
    // Default-exported function declarations, and function expressions may not
    // have a name to reference, so we explicitly add one.
    node.id = funPath.scope.parent.generateUidIdentifier("callee");
  }

  if (node.generator && // Non-generator functions don't need to be marked.
      t.isFunctionDeclaration(node)) {
    let pp = funPath.findParent(function (path) {
      return path.isProgram() || path.isBlockStatement();
    });

    if (!pp) {
      return node.id;
    }

    let markDecl = getRuntimeMarkDecl(pp);
    let markedArray = markDecl.declarations[0].id;
    let funDeclIdArray = markDecl.declarations[0].init.callee.object;
    t.assertArrayExpression(funDeclIdArray);

    let index = funDeclIdArray.elements.length;
    funDeclIdArray.elements.push(node.id);

    return t.memberExpression(
      markedArray,
      t.numericLiteral(index),
      true
    );
  }

  return node.id;
}

function getRuntimeMarkDecl(blockPath) {
  let block = blockPath.node;
  assert.ok(Array.isArray(block.body));

  let info = getMarkInfo(block);
  if (info.decl) {
    return info.decl;
  }

  info.decl = t.variableDeclaration("var", [
    t.variableDeclarator(
      blockPath.scope.generateUidIdentifier("marked"),
      t.callExpression(
        t.memberExpression(
          t.arrayExpression([]),
          t.identifier("map"),
          false
        ),
        [util.runtimeProperty("mark")]
      )
    )
  ]);

  blockPath.unshiftContainer("body", info.decl);

  return info.decl;
}

function renameArguments(funcPath, argsId) {
  let state = {
    didRenameArguments: false,
    argsId: argsId
  };

  funcPath.traverse(argumentsVisitor, state);

  // If the traversal replaced any arguments references, then we need to
  // alias the outer function's arguments binding (be it the implicit
  // arguments object or some other parameter or variable) to the variable
  // named by argsId.
  return state.didRenameArguments;
}

let argumentsVisitor = {
  "FunctionExpression|FunctionDeclaration": function(path) {
    path.skip();
  },

  Identifier: function(path, state) {
    if (path.node.name === "arguments" && util.isReference(path)) {
      path.replaceWith(state.argsId);
      state.didRenameArguments = true;
    }
  }
};

let functionSentVisitor = {
  MetaProperty(path) {
    let { node } = path;

    if (node.meta.name === "function" && node.property.name === "sent") {
      path.replaceWith(t.memberExpression(this.context, t.identifier("_sent")));
    }
  }
};

let awaitVisitor = {
  Function: function(path) {
    path.skip(); // Don't descend into nested function scopes.
  },

  AwaitExpression: function(path) {
    // Convert await expressions to yield expressions.
    let argument = path.node.argument;

    // Transforming `await x` to `yield regeneratorRuntime.awrap(x)`
    // causes the argument to be wrapped in such a way that the runtime
    // can distinguish between awaited and merely yielded values.
    path.replaceWith(t.yieldExpression(
      t.callExpression(
        util.runtimeProperty("awrap"),
        [argument]
      ),
      false
    ));
  }
};
