import type { NodePath } from "@babel/traverse";
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
  memberExpression,
  identifier,
  thisExpression,
  isPattern,
} from "@babel/types";
import type * as t from "@babel/types";

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

function classOrObjectMethod(
  path: NodePath<t.ClassMethod | t.ClassPrivateMethod | t.ObjectMethod>,
  callId: t.Expression,
  ignoreFunctionLength: boolean,
) {
  const node = path.node;
  const body = node.body;

  let params: Array<t.Identifier | t.Pattern | t.RestElement> = [];

  // Errors thrown during argument evaluation must reject the resulting promise
  const shoudlForwardParams = node.params.some(p => isPattern(p));

  if (shoudlForwardParams) {
    params = node.params as typeof params;
    node.params = [];
    if (!ignoreFunctionLength) {
      for (const param of params) {
        if (isAssignmentPattern(param) || isRestElement(param)) {
          break;
        }
        node.params.push(path.scope.generateUidIdentifier("x"));
      }
    }
  }

  const container = functionExpression(
    null,
    params,
    blockStatement(body.body),
    true,
  );

  if (shoudlForwardParams) {
    // return asyncToGenerator(function*() { ... }).apply(this, arguments);
    body.body = [
      returnStatement(
        callExpression(
          memberExpression(
            callExpression(callId, [container]),
            identifier("apply"),
          ),
          [thisExpression(), identifier("arguments")],
        ),
      ),
    ];

    (
      path.get("body.body.0.argument.callee.object.arguments.0") as NodePath
    ).unwrapFunctionEnvironment();
  } else {
    // return asyncToGenerator(function*() { ... })();
    body.body = [
      returnStatement(callExpression(callExpression(callId, [container]), [])),
    ];

    // Unwrap the wrapper IIFE's environment so super and this and such still work.
    (
      path.get("body.body.0.argument.callee.arguments.0") as NodePath
    ).unwrapFunctionEnvironment();
  }

  // Regardless of whether or not the wrapped function is a an async method
  // or generator the outer function should not be
  node.async = false;
  node.generator = false;
}

function plainFunction(
  inPath: NodePath<Exclude<t.Function, t.Method>>,
  callId: t.Expression,
  noNewArrows: boolean,
  ignoreFunctionLength: boolean,
  hadName: boolean,
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
    node = path.node;
  }

  const isDeclaration = isFunctionDeclaration(node);

  let built = node;
  if (!isCallExpression(node)) {
    functionId = node.id;
    node.id = null;
    node.type = "FunctionExpression";
    built = callExpression(callId, [
      node as Exclude<typeof node, t.FunctionDeclaration>,
    ]);
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
    // TODO: Use `functionId` rather than `hadName` for the condition
    REF: path.scope.generateUidIdentifier(hadName ? functionId.name : "ref"),
    FUNCTION: built,
    PARAMS: params,
  };

  if (isDeclaration) {
    const container = buildDeclarationWrapper(wrapperArgs);
    path.replaceWith(container[0]);
    path.insertAfter(container[1]);
  } else {
    let container;

    if (hadName) {
      container = buildNamedExpressionWrapper(wrapperArgs);
    } else {
      container = buildAnonymousExpressionWrapper(wrapperArgs);
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
  callId: t.Expression,
  // TODO(Babel 8): Consider defaulting to false for spec compliance
  noNewArrows: boolean = true,
  ignoreFunctionLength: boolean = false,
) {
  if (path.isMethod()) {
    classOrObjectMethod(path, callId, ignoreFunctionLength);
  } else {
    const hadName = "id" in path.node && !!path.node.id;
    if (!process.env.BABEL_8_BREAKING && !USE_ESM && !IS_STANDALONE) {
      // polyfill when being run by an older Babel version
      path.ensureFunctionName ??=
        // eslint-disable-next-line no-restricted-globals
        require("@babel/traverse").NodePath.prototype.ensureFunctionName;
    }
    // @ts-expect-error It is invalid to call this on an arrow expression,
    // but we'll convert it to a function expression anyway.
    path = path.ensureFunctionName(false);
    plainFunction(
      path as NodePath<Exclude<t.Function, t.Method>>,
      callId,
      noNewArrows,
      ignoreFunctionLength,
      hadName,
    );
  }
}
