import { template, types as t, type NodePath } from "@babel/core";

import {
  iifeVisitor,
  collectShadowedParamsNames,
  buildScopeIIFE,
} from "./shadow-utils.ts";

const buildDefaultParam = template.statement(`
  let VARIABLE_NAME =
    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?
      arguments[ARGUMENT_KEY]
    :
      DEFAULT_VALUE;
`);

const buildLooseDefaultParam = template.statement(`
  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {
    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;
  }
`);

const buildLooseDestructuredDefaultParam = template.statement(`
  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;
`);

const buildSafeArgumentsAccess = template.statement(`
  let $0 = arguments.length > $1 ? arguments[$1] : undefined;
`);

// last 2 parameters are optional -- they are used by transform-object-rest-spread/src/index.js
export default function convertFunctionParams(
  path: NodePath<t.Function>,
  ignoreFunctionLength: boolean | void,
  shouldTransformParam?: (index: number) => boolean,
  replaceRestElement?: (
    path: NodePath<t.Function>,
    paramPath: NodePath<t.Function["params"][number]>,
    transformedRestNodes: t.Statement[],
  ) => void,
) {
  const params = path.get("params");

  const isSimpleParameterList = params.every(param => param.isIdentifier());
  if (isSimpleParameterList) return false;

  const { node, scope } = path;

  const body = [];
  const shadowedParams = new Set<string>();

  for (const param of params) {
    collectShadowedParamsNames(param, scope, shadowedParams);
  }

  const state = {
    needsOuterBinding: false,
    scope,
  };
  if (shadowedParams.size === 0) {
    for (const param of params) {
      if (!param.isIdentifier()) param.traverse(iifeVisitor, state);
      if (state.needsOuterBinding) break;
    }
  }

  let firstOptionalIndex = null;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (shouldTransformParam && !shouldTransformParam(i)) {
      continue;
    }
    const transformedRestNodes: t.Statement[] = [];
    if (replaceRestElement) {
      replaceRestElement(path, param, transformedRestNodes);
    }

    const paramIsAssignmentPattern = param.isAssignmentPattern();
    if (
      paramIsAssignmentPattern &&
      (ignoreFunctionLength || t.isMethod(node, { kind: "set" }))
    ) {
      const left = param.get("left");
      const right = param.get("right");

      const undefinedNode = scope.buildUndefinedNode();

      if (left.isIdentifier()) {
        body.push(
          buildLooseDefaultParam({
            ASSIGNMENT_IDENTIFIER: t.cloneNode(left.node),
            DEFAULT_VALUE: right.node,
            UNDEFINED: undefinedNode,
          }),
        );
        param.replaceWith(left.node);
      } else if (left.isObjectPattern() || left.isArrayPattern()) {
        const paramName = scope.generateUidIdentifier();
        body.push(
          buildLooseDestructuredDefaultParam({
            ASSIGNMENT_IDENTIFIER: left.node,
            DEFAULT_VALUE: right.node,
            PARAMETER_NAME: t.cloneNode(paramName),
            UNDEFINED: undefinedNode,
          }),
        );
        param.replaceWith(paramName);
      }
    } else if (paramIsAssignmentPattern) {
      if (firstOptionalIndex === null) firstOptionalIndex = i;

      const left = param.get("left");
      const right = param.get("right");

      const defNode = buildDefaultParam({
        VARIABLE_NAME: left.node,
        DEFAULT_VALUE: right.node,
        ARGUMENT_KEY: t.numericLiteral(i),
      });
      body.push(defNode);
    } else if (firstOptionalIndex !== null) {
      const defNode = buildSafeArgumentsAccess([
        param.node,
        t.numericLiteral(i),
      ]);
      body.push(defNode);
    } else if (param.isObjectPattern() || param.isArrayPattern()) {
      const uid = path.scope.generateUidIdentifier("ref");
      uid.typeAnnotation = param.node.typeAnnotation;

      const defNode = t.variableDeclaration("let", [
        t.variableDeclarator(param.node, uid),
      ]);
      body.push(defNode);

      param.replaceWith(t.cloneNode(uid));
    }

    if (transformedRestNodes) {
      for (const transformedNode of transformedRestNodes) {
        body.push(transformedNode);
      }
    }
  }

  // we need to cut off all trailing parameters
  if (firstOptionalIndex !== null) {
    node.params = node.params.slice(0, firstOptionalIndex);
  }

  // ensure it's a block, useful for arrow functions
  path.ensureBlock();
  const path2 = path as NodePath<typeof path.node & { body: t.BlockStatement }>;

  const { async, generator } = node;
  if (generator || state.needsOuterBinding || shadowedParams.size > 0) {
    body.push(buildScopeIIFE(shadowedParams, path2.node.body));

    path.set("body", t.blockStatement(body as t.Statement[]));

    // We inject an arrow and then transform it to a normal function, to be
    // sure that we correctly handle this and arguments.
    const bodyPath = path2.get("body.body");
    const arrowPath = bodyPath[bodyPath.length - 1].get(
      "argument.callee",
    ) as NodePath<t.ArrowFunctionExpression>;

    // This is an IIFE, so we don't need to worry about the noNewArrows assumption
    arrowPath.arrowFunctionToExpression();

    arrowPath.node.generator = generator;
    arrowPath.node.async = async;

    node.generator = false;
    node.async = false;
    if (async) {
      // If the default value of a parameter throws, it must reject asynchronously.
      path2.node.body = template.statement.ast`{
        try {
          ${path2.node.body.body}
        } catch (e) {
          return Promise.reject(e);
        }
      }` as t.BlockStatement;
    }
  } else {
    path2.get("body").unshiftContainer("body", body);
  }

  return true;
}
