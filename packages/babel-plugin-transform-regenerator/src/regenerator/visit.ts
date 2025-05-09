"use strict";

import { types as t } from "@babel/core";
import type { NodePath, Visitor } from "@babel/traverse";
import type * as tTypes from "@babel/types";
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
  file?: any;
}

interface Context {
  usesThis: boolean;
  usesArguments: boolean;
  getArgsId: () => tTypes.Identifier;
}

interface MarkInfo {
  decl?: tTypes.VariableDeclaration;
  declPath?: NodePath<tTypes.VariableDeclaration>;
}

const markInfo = new WeakMap<tTypes.Node, MarkInfo>();

export const getVisitor = (_t: typeof t) => ({
  Method(path: NodePath<tTypes.ObjectMethod>, state: VisitorState) {
    const node = path.node;

    if (!shouldRegenerate(node, state)) return;

    const container = t.functionExpression(
      null,
      [],
      t.cloneNode(node.body, false),
      node.generator,
      node.async
    );

    path.get("body")
      .set("body", [t.returnStatement(t.callExpression(container, []))]);

    node.async = false;
    node.generator = false;
    
    const calleePath = path.get("body.body.0.argument.callee") as NodePath<tTypes.FunctionExpression>;
    calleePath.unwrapFunctionEnvironment();
  },

  Function: {
    exit: util.wrapWithTypes(t, (path: NodePath<tTypes.Function>, state: VisitorState) => {
      let node = path.node;

      if (!shouldRegenerate(node, state)) return;

      path = replaceShorthandObjectMethod(path) as NodePath<tTypes.Function>;
      node = path.node;

      const contextId = path.scope.generateUidIdentifier("context");
      const argsId = path.scope.generateUidIdentifier("args");

      path.ensureBlock();
      const bodyBlockPath = path.get("body") as NodePath<tTypes.BlockStatement>;

      if (node.async) {
        bodyBlockPath.traverse(awaitVisitor);
      }

      bodyBlockPath.traverse(functionSentVisitor, {
        context: contextId,
      });

      const outerBody: tTypes.Statement[] = [];
      const innerBody: tTypes.Statement[] = [];

      (bodyBlockPath.get("body") as NodePath<tTypes.Statement>[]).forEach((childPath) => {
        const node = childPath.node;
        if (t.isExpressionStatement(node) && t.isStringLiteral(node.expression)) {
          outerBody.push(node);
        } else if ("_blockHoist" in node && node._blockHoist != null) {
          outerBody.push(node as tTypes.Statement);
        } else {
          innerBody.push(node);
        }
      });

      if (outerBody.length > 0) {
        bodyBlockPath.node.body = innerBody;
      }

      const outerFnExpr = getOuterFnExpr(path);
      let functionId: tTypes.Identifier;
      if (t.isFunctionDeclaration(node)) {
        if (!node.id) {
          node.id = path.scope.parent.generateUidIdentifier("callee");
        }
        functionId = node.id;
      } else {
        functionId = path.scope.parent.generateUidIdentifier("callee");
      }
      const innerFnId = t.identifier(functionId.name + "$");

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

      const emitter = new (Emitter as any)(contextId);
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
      (path.get("body.body") as NodePath[]).forEach(p => p.scope.registerDeclaration(p));

      const oldDirectives = (bodyBlockPath.node as tTypes.BlockStatement & { directives?: any[] }).directives;
      if (oldDirectives) {
        (node.body as tTypes.BlockStatement & { directives?: any[] }).directives = oldDirectives;
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
        NumericLiteral(path: NodePath<tTypes.NumericLiteral>) {
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

function getOuterFnExpr(funPath: NodePath<tTypes.Function>): tTypes.Expression {
  const node = funPath.node;

  if (t.isFunctionDeclaration(node)) {
    if (!node.id) {
      node.id = funPath.scope.parent.generateUidIdentifier("callee");
    }
    if (node.generator) {
      return getMarkedFunctionId(funPath as NodePath<tTypes.FunctionDeclaration>);
    }
    return t.cloneNode(node.id);
  }

  return funPath.scope.parent.generateUidIdentifier("callee");
}

function getMarkInfo(node: tTypes.Node): MarkInfo {
  let info = markInfo.get(node);
  if (!info) {
    info = {};
    markInfo.set(node, info);
  }
  return info;
}

function getMarkedFunctionId(funPath: NodePath<tTypes.FunctionDeclaration>): tTypes.Identifier {
  const node = funPath.node;
  if (!node.id) {
    throw new Error("FunctionDeclaration must have an id");
  }

  const blockPath = funPath.findParent((path): path is NodePath<tTypes.BlockStatement | tTypes.Program> =>
    path.isProgram() || path.isBlockStatement()
  );

  if (!blockPath) return t.cloneNode(node.id);

  const block = blockPath.node;
  assert.ok(Array.isArray((block as tTypes.BlockStatement).body));

  const info = getMarkInfo(block);
  if (!info.decl) {
    info.decl = t.variableDeclaration("var", []);
    blockPath.unshiftContainer("body" as any, info.decl);
    info.declPath = blockPath.get("body.0") as NodePath<tTypes.VariableDeclaration>;
  }

  const markedId = blockPath.scope.generateUidIdentifier("marked");
  const markCallExp = t.callExpression(util.runtimeProperty("mark"), [
    t.cloneNode(node.id)
  ]);

  info.decl.declarations.push(t.variableDeclarator(markedId, markCallExp));
  const markCallExpPath = info.declPath!.get(
    `declarations.${info.decl.declarations.length - 1}.init`
  ) as NodePath<tTypes.CallExpression>;
  markCallExpPath.addComment("leading", "#__PURE__");

  return t.cloneNode(markedId);
}

const argumentsThisVisitor: Visitor = {
  FunctionExpression(path: NodePath<tTypes.FunctionExpression>) {
    path.skip();
  },
  FunctionDeclaration(path: NodePath<tTypes.FunctionDeclaration>) {
    path.skip();
  },
  Method(path: NodePath<tTypes.ObjectMethod>) {
    path.skip();
  },
  Identifier(path: NodePath<tTypes.Identifier>, state: Context) {
    if (path.node.name === "arguments" && util.isReference(path)) {
      util.replaceWithOrRemove(path, state.getArgsId());
      state.usesArguments = true;
    }
  },
  ThisExpression(path: NodePath<tTypes.ThisExpression>, state: Context) {
    state.usesThis = true;
  }
};

const functionSentVisitor: Visitor = {
  MetaProperty(path: NodePath<tTypes.MetaProperty>, state: { context: tTypes.Identifier }) {
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

const awaitVisitor: Visitor = {
  Function(path: NodePath<tTypes.Function>) {
    path.skip();
  },
  AwaitExpression(path: NodePath<tTypes.AwaitExpression>) {
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
