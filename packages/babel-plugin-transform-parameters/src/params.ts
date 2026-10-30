import {
  template,
  types as t,
  type NodePath,
  type Scope,
  type Visitor,
} from "@babel/core";
import convertFunctionRest from "./rest.ts";

import {
  collectShadowedParamsNames,
  declareMovedParams,
  getGlobalsUsage,
  getParamNames,
  getParamsInitBlock,
  moveParamToTemporary,
  redeclaresArguments,
  referencesBodyDeclaration,
  wrapBodyInScopeIIFE,
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

const buildUnmappedArguments = template.statement(
  `
    arguments = function () {
      "use strict";
      return arguments;
    }.apply(void 0, arguments);
  `,
  { sourceType: "script" },
);

/** Whether a default can be evaluated earlier without effects or errors. */
export function isDefaultEvaluationObservable(
  node: t.Node,
  scope: Scope,
): boolean {
  if (t.isPureish(node)) return false;
  if (t.isIdentifier(node)) {
    // Even a constant binding may still be in its TDZ.
    return !(
      ["undefined", "Infinity", "NaN"].includes(node.name) &&
      !scope.hasBinding(node.name, { noGlobals: true })
    );
  }
  if (t.isUnaryExpression(node)) {
    return (
      !["void", "typeof", "!"].includes(node.operator) ||
      isDefaultEvaluationObservable(node.argument, scope)
    );
  }
  if (t.isArrayExpression(node)) {
    return node.elements.some(
      element => element && isDefaultEvaluationObservable(element, scope),
    );
  }
  if (t.isObjectExpression(node)) {
    return node.properties.some(
      prop =>
        !t.isObjectProperty(prop) ||
        prop.computed ||
        isDefaultEvaluationObservable(prop.value, scope),
    );
  }
  if (t.isSequenceExpression(node)) {
    return node.expressions.some(expr =>
      isDefaultEvaluationObservable(expr, scope),
    );
  }
  if (t.isTemplateLiteral(node)) {
    // Converting a primitive to a string doesn't run user code
    return node.expressions.some(
      expr =>
        !(
          t.isLiteral(expr) ||
          t.isIdentifier(expr) ||
          t.isUnaryExpression(expr)
        ) ||
        t.isRegExpLiteral(expr) ||
        isDefaultEvaluationObservable(expr, scope),
    );
  }
  return true;
}

/**
 * Whether destructuring `target` (a parameter, or an element of a pattern)
 * can run user code besides reading the value, or read bindings that user
 * code could modify: default values, computed keys, member expression
 * targets, the property reads and null check of object patterns, and the
 * iteration of array patterns, unless the caller keeps those native anyway
 * (`nativeArrays`).
 */
export function isPatternEvaluationObservable(
  target: t.Node,
  scope: Scope,
  nativeArrays = false,
): boolean {
  switch (target.type) {
    case "Identifier":
    case "VoidPattern":
      return false;
    case "AssignmentPattern":
      return (
        isDefaultEvaluationObservable(target.right, scope) ||
        isPatternEvaluationObservable(target.left, scope, nativeArrays)
      );
    case "RestElement":
      return isPatternEvaluationObservable(
        target.argument,
        scope,
        nativeArrays,
      );
    case "ArrayPattern":
      return (
        !nativeArrays ||
        target.elements.some(
          element =>
            element && isPatternEvaluationObservable(element, scope, true),
        )
      );
    default:
      return true;
  }
}

// Whether a function reads its own `arguments` object (also through arrow
// functions, or a direct `eval`).
interface ArgumentsUsage {
  fn: NodePath<t.Function>;
  /** Elements of `arguments` are read: mapped to the parameters. */
  readsElements: boolean;
  /**
   * `arguments` is written, or escapes: as a whole, or through a direct
   * `eval`; or its `callee` is read, which throws when it is unmapped. The
   * mapping is observable.
   */
  escapes: boolean;
}

const argumentsVisitor: Visitor<ArgumentsUsage> = {
  Function(path) {
    if (!path.isArrowFunctionExpression()) path.skip();
  },
  Identifier(path, state) {
    const { name } = path.node;
    if (name === "eval") {
      if (path.key === "callee" && path.parentPath.isCallExpression()) {
        state.escapes = true;
        path.stop();
      }
      return;
    }
    if (
      name !== "arguments" ||
      !path.isReferencedIdentifier() ||
      shadowsArguments(path.scope.getBinding("arguments"), state.fn)
    ) {
      return;
    }
    const { parentPath } = path;
    if (
      parentPath.isMemberExpression({ object: path.node }) &&
      !isWriteTarget(parentPath)
    ) {
      const { property, computed } = parentPath.node;
      // `arguments.length` is not mapped
      if (!computed && t.isIdentifier(property, { name: "length" })) return;
      // `callee` is a throwing accessor of unmapped arguments objects
      if (
        computed
          ? !t.isStringLiteral(property, { value: "callee" })
          : !t.isIdentifier(property, { name: "callee" })
      ) {
        state.readsElements = true;
        return;
      }
    }
    state.escapes = true;
    path.stop();
  },
};

/** Whether a member expression is assigned, updated or deleted. */
function isWriteTarget(path: NodePath<t.MemberExpression>): boolean {
  const { parentPath, node } = path;
  if (
    parentPath.isAssignmentExpression() ||
    parentPath.isAssignmentPattern() ||
    parentPath.isForXStatement()
  ) {
    return parentPath.node.left === node;
  }
  if (parentPath.isObjectProperty()) {
    return parentPath.parentPath.isObjectPattern();
  }
  return (
    parentPath.isUpdateExpression() ||
    parentPath.isUnaryExpression({ operator: "delete" }) ||
    parentPath.isArrayPattern() ||
    parentPath.isRestElement()
  );
}

/** Whether `binding` shadows the `arguments` object of `fn`. */
function shadowsArguments(
  binding: Scope["bindings"][string] | undefined,
  fn: NodePath<t.Function>,
) {
  if (!binding) return false;
  return binding.scope === fn.scope
    ? ["param", "hoisted", "let", "const"].includes(binding.kind)
    : binding.scope.path.isDescendant(fn);
}

/**
 * In sloppy mode, a function whose parameter list is simple
 * (IsSimpleParameterList) has a mapped `arguments` object: assigning a
 * parameter changes the corresponding element, and conversely. Functions with
 * default, rest or destructuring parameters have an unmapped `arguments`
 * object. This returns whether a function with such parameters could observe
 * the mapping once its parameter list is simple: `arguments` is written or
 * escapes, its `callee` is read (an accessor throwing a TypeError when it is
 * unmapped), or its elements are read while a parameter is assigned.
 */
export function readsMappedArguments(path: NodePath<t.Function>): boolean {
  if (path.isArrowFunctionExpression()) return false;
  const usage = getGlobalsUsage(path);
  // The references to the arguments object redeclared by `var arguments`
  // are not global
  if (usage && !usage.arguments && !usage.eval && !redeclaresArguments(path)) {
    return false;
  }
  if (path.isInStrictMode()) return false;
  // A direct eval also reads the explicit binding when `arguments` is shadowed.
  if (shadowsArguments(path.scope.getOwnBinding("arguments"), path))
    return false;
  const state: ArgumentsUsage = {
    fn: path,
    readsElements: false,
    escapes: false,
  };
  path.traverse(argumentsVisitor, state);
  if (state.escapes) return true;
  if (!state.readsElements) return false;
  // Only the parameters staying in the list are mapped: identifiers. Their
  // assignments include redeclarations, which are moved out of the way.
  const { scope } = path;
  return path.node.params.some(
    param =>
      t.isIdentifier(param) &&
      param.name !== "this" &&
      (scope.getOwnBinding(param.name)?.constantViolations.length ?? 0) > 0,
  );
}

/**
 * Keep the `arguments` object of a function whose parameter list was made
 * simple unmapped. A strict function creates an unmapped arguments object,
 * including its throwing `callee` accessor. Copy the arguments before any
 * parameter initialization or body code can observe or modify them.
 *
 * Keep the parameter bindings: replacing them with lexical declarations would
 * prevent a sloppy direct eval from redeclaring them. Callers must move body
 * function declarations that redeclare parameters into an IIFE first, so they
 * do not overwrite entries of the original mapped arguments object.
 */
export function unmapArguments(path: NodePath<t.Function>) {
  if (!path.node.params.every(param => t.isIdentifier(param))) return null;
  path.ensureBlock();
  // Run before the aliases of `arguments` inserted when converting the IIFE.
  const statement = Object.assign(buildUnmappedArguments(), { _blockHoist: 3 });
  return (path.get("body") as NodePath<t.BlockStatement>).unshiftContainer(
    "body",
    statement,
  );
}

// `shouldTransformParam`, `replaceRestElement` and `noNewArrows` are used by
// @babel/helper-create-destructuring-plugin, which only moves some parameters
// into the function body. `keepArgumentsUnmapped` is computed when omitted:
// callers that already changed the parameters must pass it.
export default function convertFunctionParams(
  path: NodePath<t.Function>,
  ignoreFunctionLength: boolean | void,
  shouldTransformParam?: (index: number) => boolean,
  replaceRestElement?: (
    path: NodePath<t.Function>,
    paramPath: NodePath<t.Function["params"][number]>,
    transformedRestNodes: t.Statement[],
    declarationKind: "let" | "var",
  ) => void,
  noNewArrows: boolean = true,
  keepArgumentsUnmapped?: boolean,
) {
  if (path.node.params.every(param => t.isIdentifier(param))) {
    // Rest lowering can leave only identifiers. Body function declarations
    // must still be isolated before copying the mapped arguments object.
    if (
      !keepArgumentsUnmapped ||
      !t.isBlockStatement(path.node.body) ||
      !path.node.body.body.some(
        statement =>
          t.isFunctionDeclaration(statement) &&
          path.node.params.some(param =>
            t.isIdentifier(param, { name: statement.id?.name }),
          ),
      )
    ) {
      return false;
    }
  }

  // Read before `arguments` accesses are added for the moved parameters
  keepArgumentsUnmapped ??= readsMappedArguments(path);

  const isLoose =
    ignoreFunctionLength || t.isMethod(path.node, { kind: "set" });

  // Besides the parameters the caller asks for, we must move the parameters
  // that would otherwise be evaluated before a parameter moved into the body,
  // and the ones following a default value read from `arguments`.
  const shouldTransform: boolean[] = [];
  let moved = false;
  let readsArguments = false;
  path.node.params.forEach((param, i) => {
    if (
      readsArguments ||
      !shouldTransformParam ||
      shouldTransformParam(i) ||
      (moved && isPatternEvaluationObservable(param, path.scope))
    ) {
      shouldTransform[i] = moved = true;
      if (!isLoose && t.isAssignmentPattern(param)) readsArguments = true;
    }
  });

  let prologue: t.Statement | undefined;
  if (readsArguments && path.isArrowFunctionExpression()) {
    path = path.arrowFunctionToExpression({
      allowInsertArrowWithRest: false,
      noNewArrows,
    }) as NodePath<t.FunctionExpression>;
    // The parameters must be initialized after `_newArrowCheck(this, _this)`
    if (!noNewArrows) {
      prologue = path.node.body.body.shift();
    }
  }

  const params = path.get("params");
  const { node, scope } = path;

  // Skip the TypeScript `this` parameter when reading `arguments`
  const argumentsOffset = t.isIdentifier(node.params[0], { name: "this" })
    ? 1
    : 0;

  const body: t.Statement[] = [];
  const paramNames = getParamNames(node.params);
  const shadowedParams = new Set<string>();
  for (const param of params) {
    collectShadowedParamsNames(param, scope, shadowedParams);
  }
  const needsIIFE =
    node.generator ||
    shadowedParams.size > 0 ||
    referencesBodyDeclaration(params, scope);
  // The IIFE isolates the body, and its direct eval, from the declarations.
  const declarationKind = needsIIFE
    ? "let"
    : declareMovedParams(path, paramNames).kind;

  let firstOptionalIndex = null;
  let restNodes: t.Statement[] | undefined;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (!shouldTransform[i]) continue;

    const transformedRestNodes: t.Statement[] = [];
    if (replaceRestElement) {
      replaceRestElement(path, param, transformedRestNodes, declarationKind);
    }

    const paramIsAssignmentPattern = param.isAssignmentPattern();
    if (paramIsAssignmentPattern && isLoose) {
      const left = param.get("left");
      const right = param.get("right");

      const undefinedNode = t.buildUndefinedNode();

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
        const defNode = buildLooseDestructuredDefaultParam({
          ASSIGNMENT_IDENTIFIER: left.node,
          DEFAULT_VALUE: right.node,
          PARAMETER_NAME: t.cloneNode(paramName),
          UNDEFINED: undefinedNode,
        }) as t.VariableDeclaration;
        defNode.kind = declarationKind;
        body.push(defNode);
        param.replaceWith(paramName);
      }
    } else if (paramIsAssignmentPattern) {
      if (firstOptionalIndex === null) firstOptionalIndex = i;

      const left = param.get("left");
      const right = param.get("right");

      const defNode = buildDefaultParam({
        VARIABLE_NAME: left.node,
        DEFAULT_VALUE: right.node,
        ARGUMENT_KEY: t.numericLiteral(i - argumentsOffset),
      }) as t.VariableDeclaration;
      defNode.kind = declarationKind;
      body.push(defNode);
    } else if (param.isRestElement()) {
      // The rest parameter is usually converted before calling this function,
      // but callers that only transform some parameters may keep it. It must
      // be converted if the parameters are cut off below, or if its pattern
      // must be destructured after the parameters moved into the body.
      if (
        firstOptionalIndex !== null ||
        !param.get("argument").isIdentifier()
      ) {
        restNodes = transformedRestNodes;
        continue;
      }
    } else if (firstOptionalIndex !== null) {
      const defNode = buildSafeArgumentsAccess([
        param.node,
        t.numericLiteral(i - argumentsOffset),
      ]) as t.VariableDeclaration;
      defNode.kind = declarationKind;
      body.push(defNode);
    } else if (param.isObjectPattern() || param.isArrayPattern()) {
      body.push(moveParamToTemporary(param, path.scope, declarationKind)[0]);
    }

    body.push(...transformedRestNodes);
  }

  if (restNodes) {
    // The destructuring of the rest parameter happens after it is initialized
    path.ensureBlock();
    const bodyNode = node.body as t.BlockStatement;
    bodyNode.body.unshift(...restNodes);
    // `convertFunctionRest` needs the binding of the new rest parameter. The
    // scope must not be crawled here: the parameters moved into the body are
    // not declared yet, and their references would resolve to outer bindings.
    scope.registerBinding("param", params[params.length - 1]);
    if (needsIIFE) {
      // The IIFE wrapping the body is passed the parameters it redeclares:
      // like the other parameters, the rest parameter is initialized before
      // it, not inside.
      convertFunctionRest(path, statements => body.push(...statements));
      body.push(
        ...bodyNode.body.splice(
          bodyNode.body.indexOf(restNodes[0]),
          restNodes.length,
        ),
      );
    } else {
      convertFunctionRest(path);
    }
  }

  // we need to cut off all trailing parameters
  if (firstOptionalIndex !== null) {
    node.params = node.params.slice(0, firstOptionalIndex);
  }

  // ensure it's a block, useful for arrow functions
  path.ensureBlock();
  const path2 = path as NodePath<typeof path.node & { body: t.BlockStatement }>;

  if (needsIIFE) {
    const { callee } = wrapBodyInScopeIIFE(
      path,
      shadowedParams,
      paramNames,
      body,
    );
    // We inject an arrow and then transform it to a normal function, to be
    // sure that we correctly handle this and arguments.
    if (callee.isArrowFunctionExpression()) {
      // This is an IIFE, so we don't need to worry about the noNewArrows assumption
      callee.arrowFunctionToExpression();
    }
  } else {
    getParamsInitBlock(path).unshiftContainer("body", body);
  }

  if (prologue) path2.get("body").unshiftContainer("body", prologue);

  if (keepArgumentsUnmapped) unmapArguments(path);

  return true;
}
