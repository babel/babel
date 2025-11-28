"use strict";

import assert from "node:assert";
import { hoist } from "./hoist.ts";
import { Emitter } from "./emit.ts";
import replaceShorthandObjectMethod from "./replaceShorthandObjectMethod.ts";
import * as util from "./util.ts";
import type { NodePath, PluginPass, Visitor } from "@babel/core";
import { types as t } from "@babel/core";

export const getVisitor = (): Visitor<PluginPass> => ({
  Method(path, state) {
    const node = path.node;

    if (!shouldRegenerate(node, state)) return;

    const container = t.functionExpression(
      null,
      [],
      t.cloneNode(node.body, false),
      node.generator,
      node.async,
    );

    path
      .get("body")
      .set("body", [t.returnStatement(t.callExpression(container, []))]);

    // Regardless of whether or not the wrapped function is a an async method
    // or generator the outer function should not be
    node.async = false;
    node.generator = false;

    // Unwrap the wrapper IIFE's environment so super and this and such still work.
    (
      path.get("body.body.0.argument.callee") as NodePath
    ).unwrapFunctionEnvironment();
  },
  Function: {
    exit(
      path: NodePath<Exclude<t.Function, t.ArrowFunctionExpression>>,
      state,
    ) {
      let node = path.node;

      if (!shouldRegenerate(node, state)) return;

      // if this is an ObjectMethod, we need to convert it to an ObjectProperty
      path = replaceShorthandObjectMethod(path) as any;
      node = path.node;

      const contextId = path.scope.generateUidIdentifier("context");
      const argsId = path.scope.generateUidIdentifier("args");

      path.ensureBlock();
      const bodyBlockPath = path.get("body");

      if (node.async) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        bodyBlockPath.traverse(awaitVisitor, this);
      }

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      bodyBlockPath.traverse(functionSentVisitor, {
        context: contextId,
        pluginPass: this,
      });

      const outerBody: any[] = [];
      const innerBody: any[] = [];

      bodyBlockPath.get("body").forEach(function (childPath: any) {
        const node = childPath.node;
        if (
          t.isExpressionStatement(node) &&
          t.isStringLiteral(node.expression)
        ) {
          // Babylon represents directives like "use strict" as elements
          // of a bodyBlockPath.node.directives array, but they could just
          // as easily be represented (by other parsers) as traditional
          // string-literal-valued expression statements, so we need to
          // handle that here. (#248)
          outerBody.push(node);
        } else if (node?._blockHoist != null) {
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

      const outerFnExpr = getOuterFnExpr(
        this,
        path as NodePath<
          Exclude<t.Function, t.ArrowFunctionExpression | t.Method>
        >,
      );
      // Note that getOuterFnExpr has the side-effect of ensuring that the
      // function has a name (so node.id will always be an Identifier), even
      // if a temporary name has to be synthesized.
      t.assertIdentifier(
        (node as t.FunctionDeclaration | t.FunctionExpression).id,
      );

      // Turn all declarations into vars, and replace the original
      // declarations with equivalent assignment expressions.
      const vars = hoist(
        path as NodePath<t.FunctionDeclaration | t.FunctionExpression>,
      );

      const context = {
        usesThis: false,
        usesArguments: false,
        getArgsId: () => t.cloneNode(argsId),
      };
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      path.traverse(argumentsThisVisitor, context);

      if (context.usesArguments) {
        vars.push(
          t.variableDeclarator(t.cloneNode(argsId), t.identifier("arguments")),
        );
      }

      const emitter = new Emitter(contextId, path.scope, vars, this);
      emitter.explode(path.get("body"));

      if (vars.length > 0) {
        outerBody.push(t.variableDeclaration("var", vars));
      }

      const wrapArgs: any[] = [emitter.getContextFunction()];
      const tryLocsList = emitter.getTryLocsList();

      if (node.generator) {
        wrapArgs.push(outerFnExpr);
      } else if (context.usesThis || tryLocsList || node.async) {
        // Async functions that are not generators don't care about the
        // outer function because they don't need it to be marked and don't
        // inherit from its .prototype.
        wrapArgs.push(t.nullLiteral());
      }
      if (context.usesThis) {
        wrapArgs.push(t.thisExpression());
      } else if (tryLocsList || node.async) {
        wrapArgs.push(t.nullLiteral());
      }
      if (tryLocsList) {
        wrapArgs.push(tryLocsList);
      } else if (node.async) {
        wrapArgs.push(t.nullLiteral());
      }

      if (node.async) {
        // Rename any locally declared "Promise" variable,
        // to use the global one.
        let currentScope = path.scope;
        do {
          if (currentScope.hasOwnBinding("Promise"))
            currentScope.rename("Promise");
        } while ((currentScope = currentScope.parent));

        wrapArgs.push(t.identifier("Promise"));
      }

      const wrapCall = t.callExpression(
        !node.async
          ? t.memberExpression(
              t.callExpression(this.addHelper("regenerator"), []),
              t.identifier("w"),
            )
          : node.generator
            ? this.addHelper("regeneratorAsyncGen")
            : this.addHelper("regeneratorAsync"),
        wrapArgs,
      );
      outerBody.push(t.returnStatement(wrapCall));
      node.body = t.blockStatement(outerBody);
      // We injected a few new variable declarations (for every hoisted var),
      // so we need to add them to the scope.
      path.get("body.body").forEach((p: any) => p.scope.registerDeclaration(p));

      const oldDirectives = bodyBlockPath.node.directives;
      if (oldDirectives) {
        // Babylon represents directives like "use strict" as elements of
        // a bodyBlockPath.node.directives array. (#248)
        node.body.directives = oldDirectives;
      }

      const wasGeneratorFunction = node.generator;
      if (wasGeneratorFunction) {
        node.generator = false;
      }

      if (node.async) {
        node.async = false;
      }

      if (wasGeneratorFunction && t.isExpression(node)) {
        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.callExpression(this.addHelper("regenerator"), []),
              t.identifier("m"),
            ),
            [node],
          ),
        );
        path.addComment("leading", "#__PURE__");
      }

      const insertedLocs = emitter.getInsertedLocs();

      path.traverse({
        NumericLiteral(path: any) {
          if (!insertedLocs.has(path.node)) {
            return;
          }

          path.replaceWith(t.numericLiteral(path.node.value));
        },
      });

      // Generators are processed in 'exit' handlers so that regenerator only has to run on
      // an ES5 AST, but that means traversal will not pick up newly inserted references
      // to things like 'regeneratorRuntime'. To avoid this, we explicitly requeue.
      path.requeue();
    },
  },
});

// Check if a node should be transformed by regenerator
function shouldRegenerate(node: t.Function, state: any) {
  if (node.generator) {
    if (node.async) {
      // Async generator
      return state.opts.asyncGenerators !== false;
    } else {
      // Plain generator
      return state.opts.generators !== false;
    }
  } else if (node.async) {
    // Async function
    return state.opts.async !== false;
  } else {
    // Not a generator or async function.
    return false;
  }
}

// Given a NodePath for a Function, return an Expression node that can be
// used to refer reliably to the function object from inside the function.
// This expression is essentially a replacement for arguments.callee, with
// the key advantage that it works in strict mode.
function getOuterFnExpr(
  state: PluginPass,
  funPath: NodePath<Exclude<t.Function, t.ArrowFunctionExpression | t.Method>>,
) {
  const node = funPath.node;
  t.assertFunction(node);

  if (!node.id) {
    // Default-exported function declarations, and function expressions may not
    // have a name to reference, so we explicitly add one.
    node.id = funPath.scope.parent.generateUidIdentifier("callee");
  }

  if (
    node.generator && // Non-generator functions don't need to be marked.
    t.isFunctionDeclaration(node)
  ) {
    // Return the identifier returned by runtime.mark(<node.id>).
    return getMarkedFunctionId(state, funPath);
  }

  return t.cloneNode(node.id);
}

const markInfo = new WeakMap();

function getMarkInfo(node: any) {
  if (!markInfo.has(node)) {
    markInfo.set(node, {});
  }
  return markInfo.get(node);
}

function getMarkedFunctionId(
  state: PluginPass,
  funPath: NodePath<Exclude<t.Function, t.ArrowFunctionExpression | t.Method>>,
) {
  const node = funPath.node;
  t.assertIdentifier(node.id);

  const blockPath = funPath.findParent(function (path) {
    return path.isProgram() || path.isBlockStatement();
  }) as NodePath<t.Program | t.BlockStatement>;

  if (!blockPath) {
    return node.id;
  }

  const block = blockPath.node;
  assert.ok(Array.isArray(block.body));

  const info = getMarkInfo(block);
  if (!info.decl) {
    info.decl = t.variableDeclaration("var", []);
    blockPath.unshiftContainer("body", info.decl);
    info.declPath = blockPath.get("body.0");
  }

  assert.strictEqual(info.declPath.node, info.decl);

  // Get a new unique identifier for our marked variable.
  const markedId = blockPath.scope.generateUidIdentifier("marked");
  const markCallExp = t.callExpression(
    t.memberExpression(
      t.callExpression(state.addHelper("regenerator"), []),
      t.identifier("m"),
    ),
    [t.cloneNode(node.id)],
  );
  const index =
    info.decl.declarations.push(t.variableDeclarator(markedId, markCallExp)) -
    1;

  const markCallExpPath = info.declPath.get("declarations." + index + ".init");

  assert.strictEqual(markCallExpPath.node, markCallExp);

  markCallExpPath.addComment("leading", "#__PURE__");

  return t.cloneNode(markedId);
}

const argumentsThisVisitor: Visitor<{
  usesThis: boolean;
  usesArguments: boolean;
  getArgsId: () => t.Identifier;
}> = {
  "FunctionExpression|FunctionDeclaration|Method": function (path) {
    path.skip();
  },

  Identifier: function (path, state) {
    if (path.node.name === "arguments" && util.isReference(path)) {
      path.replaceWith(state.getArgsId());
      state.usesArguments = true;
    }
  },

  ThisExpression: function (path, state) {
    state.usesThis = true;
  },
};

const functionSentVisitor: Visitor<{
  context: t.Identifier;
  pluginPass: PluginPass;
}> = {
  MetaProperty(path, state) {
    const { node } = path;

    if (node.meta.name === "function" && node.property.name === "sent") {
      path.replaceWith(
        t.memberExpression(t.cloneNode(state.context), t.identifier("v")),
      );
    }
  },
};

const awaitVisitor: Visitor<PluginPass> = {
  Function: function (path) {
    path.skip(); // Don't descend into nested function scopes.
  },

  AwaitExpression: function (path) {
    // Convert await expressions to yield expressions.
    const argument = path.node.argument;

    const helper =
      // This is slightly tricky: newer versions of the `regeneratorRuntime`
      // helper support using `awaitAsyncGenerator` as an alternative to
      // `regeneratorRuntime().awrap`. There is no direct way to test if we
      // have that part of the helper available, but we know that it has been
      // introduced in the same version as `regeneratorKeys`.

      this.addHelper("awaitAsyncGenerator");
    // Transforming `await x` to `yield regeneratorRuntime.awrap(x)`
    // causes the argument to be wrapped in such a way that the runtime
    // can distinguish between awaited and merely yielded values.
    path.replaceWith(
      t.yieldExpression(t.callExpression(helper, [argument]), false),
    );
  },
};
