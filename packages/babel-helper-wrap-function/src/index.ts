import type { NodePath } from "@babel/traverse";
import nameFunction from "@babel/helper-function-name";
import template from "@babel/template";
import {
  blockStatement,
  callExpression,
  functionExpression,
  isAssignmentPattern,
  isFunctionDeclaration,
  isRestElement,
  returnStatement,
  isCallExpression,
  cloneNode,
  toExpression,
  identifier,
  assignmentExpression,
  logicalExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import type { PluginPass } from "@babel/core";

type ExpressionWrapperBuilder<ExtraBody extends t.Node[]> = (
  replacements?: Parameters<ReturnType<typeof template.expression>>[0],
) => t.CallExpression & {
  callee: t.FunctionExpression & {
    body: {
      body: [
        t.VariableDeclaration & {
          declarations: [
            { init: t.FunctionExpression | t.ArrowFunctionExpression },
          ];
        },
        ...ExtraBody,
      ];
    };
  };
};

const buildAnonymousExpressionWrapper = template.expression(`
  (function () {
    var REF = FUNCTION;
    return function NAME(PARAMS) {
      return REF.apply(this, arguments);
    };
  })()
`) as ExpressionWrapperBuilder<
  [t.ReturnStatement & { argument: t.FunctionExpression }]
>;

const buildNamedExpressionWrapper = template.expression(`
  (function () {
    var REF = FUNCTION;
    function NAME(PARAMS) {
      return REF.apply(this, arguments);
    }
    return NAME;
  })()
`) as ExpressionWrapperBuilder<
  [t.FunctionDeclaration, t.ReturnStatement & { argument: t.Identifier }]
>;

const buildDeclarationWrapper = template.statements(`
  function NAME(PARAMS) { return REF.apply(this, arguments); }
  function REF() {
    REF = FUNCTION;
    return REF.apply(this, arguments);
  }
`);

const buildWrapper = template.statement(`
  function NAME(PARAMS) {
    return CALL;
  }
`) as (
  replacements: Parameters<ReturnType<typeof template.expression>>[0],
) => t.FunctionDeclaration;

function markCallWrapped(path: NodePath<t.Function>) {
  (path.get("body.body.0.argument") as NodePath).setData(
    "babel-helper-wrap-function_wrapped_function",
    (path.get("body.body.0.argument.callee") as NodePath).node,
  );
}

function classOrObjectMethod(
  path: NodePath<t.ClassMethod | t.ClassPrivateMethod | t.ObjectMethod>,
  callId: t.Expression,
) {
  const node = path.node;
  const body = node.body;

  const container = functionExpression(
    null,
    [],
    blockStatement(body.body),
    true,
  );
  body.body = [
    returnStatement(callExpression(callExpression(callId, [container]), [])),
  ];

  // Regardless of whether or not the wrapped function is a an async method
  // or generator the outer function should not be
  node.async = false;
  node.generator = false;

  // Unwrap the wrapper IIFE's environment so super and this and such still work.
  (
    path.get("body.body.0.argument.callee.arguments.0") as NodePath
  ).unwrapFunctionEnvironment();
}

function plainFunction(
  inPath: NodePath<Exclude<t.Function, t.Method>>,
  callId: t.Expression,
  noNewArrows: boolean,
  ignoreFunctionLength: boolean,
) {
  let path: NodePath<
    | t.FunctionDeclaration
    | t.FunctionExpression
    | t.CallExpression
    | t.ArrowFunctionExpression
  > = inPath;
  let node;
  let functionId = null;
  const nodeParams = inPath.node.params;

  if (path.isArrowFunctionExpression()) {
    if (process.env.BABEL_8_BREAKING) {
      path = path.arrowFunctionToExpression({ noNewArrows });
    } else {
      // arrowFunctionToExpression returns undefined in @babel/traverse < 7.18.10
      path = path.arrowFunctionToExpression({ noNewArrows }) ?? path;
    }
    node = path.node as
      | t.FunctionDeclaration
      | t.FunctionExpression
      | t.CallExpression;
  } else {
    node = path.node as t.FunctionDeclaration | t.FunctionExpression;
  }

  const isDeclaration = isFunctionDeclaration(node);

  let built = node;
  if (!isCallExpression(node)) {
    functionId = node.id;
    node.id = null;
    node.type = "FunctionExpression";
    built = callExpression(callId, [node as t.FunctionExpression]);
  }

  const params: t.Identifier[] = [];
  for (const param of nodeParams) {
    if (isAssignmentPattern(param) || isRestElement(param)) {
      break;
    }
    params.push(path.scope.generateUidIdentifier("x"));
  }

  const wrapperArgs = {
    NAME: functionId || null,
    REF: path.scope.generateUidIdentifier(functionId ? functionId.name : "ref"),
    FUNCTION: built,
    PARAMS: params,
  };

  if (isDeclaration) {
    const container = buildDeclarationWrapper(wrapperArgs);
    path.replaceWith(container[0]);
    path.insertAfter(container[1]);
  } else {
    let container;

    if (functionId) {
      container = buildNamedExpressionWrapper(wrapperArgs);
    } else {
      container = buildAnonymousExpressionWrapper(wrapperArgs);

      const returnFn = container.callee.body.body[1].argument;
      nameFunction({
        node: returnFn,
        parent: (path as NodePath<t.FunctionExpression>).parent,
        scope: path.scope,
      });
      functionId = returnFn.id;
    }

    if (functionId || (!ignoreFunctionLength && params.length)) {
      path.replaceWith(container);
    } else {
      // we can omit this wrapper as the conditions it protects for do not apply
      path.replaceWith(built);
    }
  }
}

export default function wrapFunction(
  path: NodePath<t.Function>,
  callId: t.Expression | string,
  // TODO(Babel 8): Consider defaulting to false for spec compliance
  noNewArrows: boolean = true,
  ignoreFunctionLength: boolean = false,
  callAsync?: string,
) {
  if (callAsync) {
    if (path.isMethod()) {
      const node = path.node;
      const body = node.body;

      const container = functionExpression(
        null,
        [],
        blockStatement(body.body),
        true,
      );
      body.body = [
        returnStatement(
          callExpression(path.hub.addHelper(callAsync), [container]),
        ),
      ];

      // Regardless of whether or not the wrapped function is a an async method
      // or generator the outer function should not be
      node.async = false;
      node.generator = false;

      // Unwrap the wrapper IIFE's environment so super and this and such still work.
      (
        path.get("body.body.0.argument.arguments.0") as NodePath
      ).unwrapFunctionEnvironment();
    } else {
      let node;
      let functionId = null;
      const nodeParams = path.node.params;

      if (path.isArrowFunctionExpression()) {
        let path2;
        if (process.env.BABEL_8_BREAKING) {
          path2 = path.arrowFunctionToExpression({ noNewArrows });
        } else {
          // arrowFunctionToExpression returns undefined in @babel/traverse < 7.18.10
          path2 = path.arrowFunctionToExpression({ noNewArrows }) ?? path;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        node = path2.node as
          | t.FunctionDeclaration
          | t.FunctionExpression
          | t.CallExpression;
      } else {
        node = path.node as t.FunctionDeclaration | t.FunctionExpression;
      }
      const isDeclaration = path.isFunctionDeclaration();

      let built = node;
      if (!isCallExpression(node)) {
        functionId = node.id;
        built = callExpression(path.hub.addHelper(callAsync), [
          functionExpression(null, node.params, node.body, node.generator),
          identifier("this"),
          identifier("arguments"),
        ]);
      }

      const params: t.Identifier[] = [];
      for (const param of nodeParams) {
        if (isAssignmentPattern(param) || isRestElement(param)) {
          break;
        }
        params.push(path.scope.generateUidIdentifier("x"));
      }

      let wrapper: t.Function = buildWrapper({
        NAME: functionId,
        CALL: built,
        PARAMS: params,
      });

      if (!isDeclaration) {
        wrapper = toExpression(wrapper);
        nameFunction({
          node: wrapper,
          parent: (path as NodePath<t.FunctionExpression>).parent,
          scope: path.scope,
        });
      }

      if (
        isDeclaration ||
        wrapper.id ||
        (!ignoreFunctionLength && params.length)
      ) {
        path.replaceWith(wrapper);
        markCallWrapped(path);
      } else {
        // we can omit this wrapper as the conditions it protects for do not apply
        path.replaceWith(
          callExpression(path.hub.addHelper(callId as string), [
            node as t.FunctionExpression,
          ]),
        );
      }
    }
    return;
  }

  if (path.isMethod()) {
    classOrObjectMethod(path, callId as t.Expression);
  } else {
    plainFunction(
      path as NodePath<Exclude<t.Function, t.Method>>,
      callId as t.Expression,
      noNewArrows,
      ignoreFunctionLength,
    );
  }
}

export function buildOnCallExpression(helperName: string) {
  return {
    CallExpression: {
      exit(path: NodePath<t.CallExpression>, state: PluginPass) {
        if (!state.availableHelper(helperName)) {
          return;
        }
        if (path.parentPath.isCallExpression()) {
          const wrappedFn = path.parentPath.getData(
            "babel-helper-wrap-function_wrapped_function",
          );

          if (!wrappedFn || wrappedFn === path.node.callee) return;

          const fnPath = path.findParent(p => p.isFunction());

          if (
            fnPath
              .findParent(p => p.isLoop() || p.isFunction() || p.isClass())
              ?.isLoop() !== true
          ) {
            const ref = path.scope.generateUidIdentifier("ref");
            fnPath.parentPath.scope.push({
              id: ref,
            });
            const oldNode = path.node;
            const comments = path.node.leadingComments;
            if (comments) path.node.leadingComments = undefined;
            path.replaceWith(
              assignmentExpression(
                "=",
                cloneNode(ref),
                logicalExpression("||", cloneNode(ref), oldNode),
              ),
            );
            if (comments) oldNode.leadingComments = comments;
          }
        }
      },
    },
  };
}
