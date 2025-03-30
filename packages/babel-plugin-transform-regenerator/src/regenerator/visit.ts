"use strict";

import { types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import assert from "assert";
import { hoist } from "./hoist";
import { Emitter } from "./emit";
import replaceShorthandObjectMethod from "./replaceShorthandObjectMethod";
import * as util from "./util";

interface VisitorState {
  opts: {
    asyncGenerators?: boolean;
    generators?: boolean;
    async?: boolean;
  };
}

interface Context {
  usesThis: boolean;
  usesArguments: boolean;
  getArgsId: () => t.Identifier;
}

type FunctionNode = t.FunctionDeclaration | t.FunctionExpression | t.Method;

interface MarkInfo {
  decl?: t.VariableDeclaration;
  declPath?: NodePath<t.VariableDeclaration>;
}

const markInfo = new WeakMap<t.Node, MarkInfo>();

export const getVisitor = (_t: typeof t) => ({
  Method(path: NodePath<t.Method>, state: VisitorState) {
    const node = path.node;

    if (!shouldRegenerate(node, state)) return;

    const container = t.functionExpression(
      null,
      [],
      t.cloneNode(node.body, false),
      node.generator,
      node.async
    );

    path
      .get("body")
      .set("body", [t.returnStatement(t.callExpression(container, []))]);

    node.async = false;
    node.generator = false;
    path.get("body.body.0.argument.callee").unwrapFunctionEnvironment();
  },

  Function: {
    exit: util.wrapWithTypes(t, (path: NodePath<t.Function>, state: VisitorState) => {
      let node = path.node;

      if (!shouldRegenerate(node, state)) return;

      path = replaceShorthandObjectMethod(path);
      node = path.node;

      const contextId = path.scope.generateUidIdentifier("context");
      const argsId = path.scope.generateUidIdentifier("args");

      path.ensureBlock();
      const bodyBlockPath = path.get("body");

      if (node.async) {
        bodyBlockPath.traverse(awaitVisitor);
      }

      bodyBlockPath.traverse(functionSentVisitor, {
        context: contextId,
      });

      const outerBody: t.Statement[] = [];
      const innerBody: t.Statement[] = [];

      bodyBlockPath.get("body").forEach((childPath: NodePath<t.Node>) => {
        const node = childPath.node;
        if (t.isExpressionStatement(node) && t.isStringLiteral(node.expression)) {
          outerBody.push(node);
        } else if (node?._blockHoist != null) {
          outerBody.push(node);
        } else {
          innerBody.push(node);
        }
      });

      if (outerBody.length > 0) {
        bodyBlockPath.node.body = innerBody;
      }

      const outerFnExpr = getOuterFnExpr(path);
      t.assertIdentifier(node.id);
      const innerFnId = t.identifier(node.id.name + "$");

      let vars = hoist(path);

      const context: Context = {
        usesThis: false,
        usesArguments: false,
        getArgsId: () => t.cloneNode(argsId),
      };

      path.traverse(argumentsThisVisitor, context);

      if (context.usesArguments) {
        vars = vars || t.variableDeclaration("var", []);
        vars.declarations.push(
          t.variableDeclarator(t.cloneNode(argsId), t.identifier("arguments"))
        );
      }

      const emitter = new Emitter(contextId);
      emitter.explode(path.get("body"));

      if (vars?.declarations.length > 0) {
        outerBody.push(vars);
      }

      const wrapArgs = [emitter.getContextFunction(innerFnId)];
      const tryLocsList = emitter.getTryLocsList();

      if (node.generator) {
        wrapArgs.push(outerFnExpr);
      } else if (context.usesThis || tryLocsList || node.async) {
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
        let currentScope = path.scope;
        do {
          if (currentScope.hasOwnBinding("Promise")) currentScope.rename("Promise");
        } while ((currentScope = currentScope.parent));
        wrapArgs.push(t.identifier("Promise"));
      }

      const wrapCall = t.callExpression(
        util.runtimeProperty(node.async ? "async" : "wrap"),
        wrapArgs
      );

      outerBody.push(t.returnStatement(wrapCall));
      node.body = t.blockStatement(outerBody);
      path.get("body.body").forEach(p => p.scope.registerDeclaration(p));

      const oldDirectives = bodyBlockPath.node.directives;
      if (oldDirectives) {
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
        util.replaceWithOrRemove(
          path,
          t.callExpression(util.runtimeProperty("mark"), [node])
        );
        path.addComment("leading", "#__PURE__");
      }

      const insertedLocs = emitter.getInsertedLocs();

      path.traverse({
        NumericLiteral(path: NodePath<t.NumericLiteral>) {
          if (insertedLocs.has(path.node)) {
            path.replaceWith(t.numericLiteral(path.node.value));
          }
        },
      });

      path.requeue();
    }),
  },
});

function shouldRegenerate(
  node: { generator?: boolean; async?: boolean },
  state: VisitorState
): boolean {
  if (node.generator) {
    return node.async
      ? state.opts.asyncGenerators !== false
      : state.opts.generators !== false;
  }
  return node.async ? state.opts.async !== false : false;
}

function getOuterFnExpr(funPath: NodePath<FunctionNode>): t.Expression {
  const node = funPath.node;
  t.assertFunction(node);

  if (!node.id) {
    node.id = funPath.scope.parent.generateUidIdentifier("callee");
  }

  if (node.generator && t.isFunctionDeclaration(node)) {
    return getMarkedFunctionId(funPath);
  }

  return t.cloneNode(node.id);
}

function getMarkInfo(node: t.Node): MarkInfo {
  let info = markInfo.get(node);
  if (!info) {
    info = {};
    markInfo.set(node, info);
  }
  return info;
}

function getMarkedFunctionId(funPath: NodePath<t.FunctionDeclaration>): t.Identifier {
  const node = funPath.node;
  t.assertIdentifier(node.id);

  const blockPath = funPath.findParent((path): path is NodePath<t.BlockStatement | t.Program> =>
    path.isProgram() || path.isBlockStatement()
  );

  if (!blockPath) return t.cloneNode(node.id);

  const block = blockPath.node;
  assert.ok(Array.isArray(block.body));

  const info = getMarkInfo(block);
  if (!info.decl) {
    info.decl = t.variableDeclaration("var", []);
    blockPath.unshiftContainer("body", info.decl);
    info.declPath = blockPath.get("body.0") as NodePath<t.VariableDeclaration>;
  }

  const markedId = blockPath.scope.generateUidIdentifier("marked");
  const markCallExp = t.callExpression(util.runtimeProperty("mark"), [
    t.cloneNode(node.id)
  ]);

  info.decl.declarations.push(t.variableDeclarator(markedId, markCallExp));
  const markCallExpPath = info.declPath!.get(
    `declarations.${info.decl.declarations.length - 1}.init`
  );
  markCallExpPath.addComment("leading", "#__PURE__");

  return t.cloneNode(markedId);
}

const argumentsThisVisitor = {
  "FunctionExpression|FunctionDeclaration|Method"(path: NodePath<FunctionNode>) {
    path.skip();
  },

  Identifier(path: NodePath<t.Identifier>, state: Context) {
    if (path.node.name === "arguments" && util.isReference(path)) {
      util.replaceWithOrRemove(path, state.getArgsId());
      state.usesArguments = true;
    }
  },

  ThisExpression(_path: NodePath<t.ThisExpression>, state: Context) {
    state.usesThis = true;
  }
};

const functionSentVisitor = {
  MetaProperty(path: NodePath<t.MetaProperty>, state: { context: t.Identifier }) {
    const { node } = path;
    if (node.meta.name === "function" && node.property.name === "sent") {
      util.replaceWithOrRemove(
        path,
        t.memberExpression(
          t.cloneNode(state.context),
          t.identifier("_sent")
        )
      );
    }
  }
};

const awaitVisitor = {
  Function(path: NodePath<FunctionNode>) {
    path.skip();
  },

  AwaitExpression(path: NodePath<t.AwaitExpression>) {
    util.replaceWithOrRemove(
      path,
      t.yieldExpression(
        t.callExpression(util.runtimeProperty("awrap"), [
          path.node.argument
        ]),
        false
      )
    );
  }
};
