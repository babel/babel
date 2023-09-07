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
} from "@babel/types";
import type * as t from "@babel/types";

const buildWrapper = template.statement(`
  function NAME(PARAMS) {
    return (REF = REF || FUNCTION).apply(this, arguments);
  }
`) as (
  replacements: Parameters<ReturnType<typeof template.expression>>[0],
) => t.FunctionDeclaration;

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

  const ref = path.scope.generateUidIdentifier(
    functionId ? functionId.name : "ref",
  );

  let wrapper: t.Function = buildWrapper({
    NAME: functionId,
    REF: ref,
    FUNCTION: built,
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

  if (isDeclaration || wrapper.id || (!ignoreFunctionLength && params.length)) {
    path.replaceWith(wrapper);
    path.parentPath.scope.push({ id: cloneNode(ref) });
  } else {
    // we can omit this wrapper as the conditions it protects for do not apply
    path.replaceWith(built);
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
    classOrObjectMethod(path, callId);
  } else {
    plainFunction(
      path as NodePath<Exclude<t.Function, t.Method>>,
      callId,
      noNewArrows,
      ignoreFunctionLength,
    );
  }
}
