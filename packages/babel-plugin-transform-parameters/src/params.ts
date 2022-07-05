import { template, types as t } from "@babel/core";
import type { NodePath, Scope, Visitor } from "@babel/traverse";

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

const iifeVisitor: Visitor<State> = {
  "ReferencedIdentifier|BindingIdentifier"(
    path: NodePath<t.Identifier>,
    state,
  ) {
    const { scope, node } = path;
    const { name } = node;

    if (
      name === "eval" ||
      (scope.getBinding(name) === state.scope.parent.getBinding(name) &&
        state.scope.hasOwnBinding(name))
    ) {
      state.needsOuterBinding = true;
      path.stop();
    }
  },
  // type annotations don't use or introduce "real" bindings
  "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration":
    (path: NodePath) => path.skip(),
};

type State = {
  stop: boolean;
  needsOuterBinding: boolean;
  scope: Scope;
};

// last 2 parameters are optional -- they are used by proposal-object-rest-spread/src/index.js
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

  const state = {
    stop: false,
    needsOuterBinding: false,
    scope,
  };

  const body = [];
  const shadowedParams = new Set<string>();

  for (const param of params) {
    for (const name of Object.keys(param.getBindingIdentifiers())) {
      const constantViolations = scope.bindings[name]?.constantViolations;
      if (constantViolations) {
        for (const redeclarator of constantViolations.slice()) {
          const node = redeclarator.node;
          // If a constant violation is a var or a function declaration,
          // we first check to see if it's a var without an init.
          // If so, we remove that declarator.
          // Otherwise, we have to wrap it in an IIFE.
          switch (node.type) {
            case "VariableDeclarator": {
              if (node.init === null) {
                const declaration = redeclarator.parentPath;
                // The following uninitialized var declarators should not be removed
                // for (var x in {})
                // for (var x;;)
                if (
                  !declaration.parentPath.isFor() ||
                  declaration.parentPath.get("body") === declaration
                ) {
                  redeclarator.remove();
                  break;
                }
              }

              shadowedParams.add(name);
              break;
            }
            case "FunctionDeclaration":
              shadowedParams.add(name);
              break;
          }
        }
      }
    }
  }

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

  if (state.needsOuterBinding || shadowedParams.size > 0) {
    body.push(
      buildScopeIIFE(
        shadowedParams,
        (path.get("body") as NodePath<t.BlockStatement>).node,
      ),
    );

    path.set("body", t.blockStatement(body as t.Statement[]));

    // We inject an arrow and then transform it to a normal function, to be
    // sure that we correctly handle this and arguments.
    const bodyPath = path.get("body.body") as NodePath<t.Statement>[];
    const arrowPath = bodyPath[bodyPath.length - 1].get(
      "argument.callee",
    ) as NodePath<t.ArrowFunctionExpression>;

    // This is an IIFE, so we don't need to worry about the noNewArrows assumption
    arrowPath.arrowFunctionToExpression();

    arrowPath.node.generator = path.node.generator;
    arrowPath.node.async = path.node.async;

    // We don't reset "async" because if the default value of a parameter
    // throws, it must reject asynchronously.
    path.node.generator = false;
  } else {
    path.get("body").unshiftContainer("body", body);
  }

  return true;
}

function buildScopeIIFE(shadowedParams: Set<string>, body: t.BlockStatement) {
  const args = [];
  const params = [];

  for (const name of shadowedParams) {
    // We create them twice; the other option is to use t.cloneNode
    args.push(t.identifier(name));
    params.push(t.identifier(name));
  }

  return t.returnStatement(
    t.callExpression(t.arrowFunctionExpression(params, body), args),
  );
}
