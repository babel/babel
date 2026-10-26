import {
  template,
  types as t,
  type NodePath,
  type Scope,
  type Visitor,
} from "@babel/core";
import convertFunctionRest from "./rest.ts";

import {
  getIIFEVisitor,
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
  if (t.isTemplateLiteral(node)) return node.expressions.length !== 0;
  return true;
}

/**
 * Whether evaluating the parameter can run user code, or read bindings that
 * user code could modify.
 */
export function isParamEvaluationObservable(
  param: t.Function["params"][number],
  scope: Scope,
): boolean {
  switch (param.type) {
    case "Identifier":
      return false;
    case "AssignmentPattern":
      return (
        !t.isIdentifier(param.left) ||
        isDefaultEvaluationObservable(param.right, scope)
      );
    case "RestElement":
      return !t.isIdentifier(param.argument);
    default:
      return true;
  }
}

// Whether a function reads its own `arguments` object (also through arrow
// functions, or a direct `eval`).
const argumentsVisitor: Visitor<{
  fn: NodePath<t.Function>;
  found: boolean;
}> = {
  Function(path) {
    if (!path.isArrowFunctionExpression()) path.skip();
  },
  Identifier(path, state) {
    if (
      (path.node.name === "arguments" &&
        path.isReferencedIdentifier() &&
        !shadowsArguments(path.scope.getBinding("arguments"), state.fn)) ||
      (path.node.name === "eval" &&
        path.key === "callee" &&
        path.parentPath.isCallExpression())
    ) {
      state.found = true;
      path.stop();
    }
  },
};

/** Whether `binding` shadows the `arguments` object of `fn`. */
function shadowsArguments(
  binding: Scope["bindings"][string] | undefined,
  fn: NodePath<t.Function>,
) {
  if (!binding) return false;
  return binding.scope === fn.scope
    ? binding.kind === "param"
    : binding.scope.path.isDescendant(fn);
}

/**
 * In sloppy mode, a function whose parameter list is simple
 * (IsSimpleParameterList) has a mapped `arguments` object: assigning a
 * parameter changes the corresponding element, and conversely. Functions with
 * default, rest or destructuring parameters have an unmapped `arguments`
 * object. This returns whether a function with such parameters would observe
 * the mapping once its parameter list is simple.
 */
export function readsMappedArguments(path: NodePath<t.Function>): boolean {
  if (path.isArrowFunctionExpression() || path.isInStrictMode()) return false;
  const state = { fn: path, found: false };
  path.traverse(argumentsVisitor, state);
  return state.found;
}

/**
 * Keep the `arguments` object of a function whose parameter list was made
 * simple unmapped: replace the parameters, except the given temporaries that
 * user code can't access, with temporaries that only initialize variables with
 * the original names at the beginning of the body.
 *
 *   function f(a, { b }) { arguments; }
 * becomes
 *   function f(_a, _ref) { let a = _a; var { b } = _ref; arguments; }
 *
 * The scope is not updated: it returns the paths of the new parameters and
 * declarations, if any.
 */
export function unmapArguments(
  path: NodePath<t.Function>,
  temporaries: ReadonlySet<t.Node>,
) {
  if (!path.node.params.every(param => t.isIdentifier(param))) return null;
  const params = (path.get("params") as NodePath<t.Identifier>[]).filter(
    param => !temporaries.has(param.node) && param.node.name !== "this",
  );
  if (params.length === 0) return null;
  const { scope } = path;
  // In sloppy mode, a function declared in a block of the body is also
  // declared as a `var` of the function (Annex B), unless that would conflict
  // with a lexical declaration or with a parameter: a `let` keeps the
  // variable from being overridden like the parameter was.
  const lexical: t.VariableDeclarator[] = [];
  // A `var` redeclaration of the parameter in the body stays valid with a
  // `var`; a function declaration is initialized after the parameters.
  const vars: t.VariableDeclarator[] = [];
  for (const param of params) {
    const { node } = param;
    const uid = scope.generateUidIdentifier(node.name);
    param.replaceWith(uid);
    const violations = scope.getOwnBinding(node.name)?.constantViolations;
    const redeclaredByFunction = violations?.some(violation =>
      violation.isFunctionDeclaration(),
    );
    if (
      redeclaredByFunction ||
      violations?.some(violation => violation.isVariableDeclarator())
    ) {
      vars.push(
        t.variableDeclarator(
          node,
          redeclaredByFunction ? null : t.cloneNode(uid),
        ),
      );
    } else {
      lexical.push(t.variableDeclarator(node, t.cloneNode(uid)));
    }
  }
  const declarations: t.VariableDeclaration[] = [];
  if (lexical.length) declarations.push(t.variableDeclaration("let", lexical));
  if (vars.length) declarations.push(t.variableDeclaration("var", vars));
  path.ensureBlock();
  const declarationPaths = (
    path.get("body") as NodePath<t.BlockStatement>
  ).unshiftContainer("body", declarations);
  return { params, declarations: declarationPaths };
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
  ) => void,
  noNewArrows: boolean = true,
  keepArgumentsUnmapped?: boolean,
) {
  if (path.node.params.every(param => t.isIdentifier(param))) return false;

  // Read before `arguments` accesses are added for the moved parameters
  keepArgumentsUnmapped ??= readsMappedArguments(path);
  // The parameters replaced by temporaries, which are not observable
  const temporaries = new Set<t.Node>();

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
      (moved && isParamEvaluationObservable(param, path.scope))
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
      if (!param.isIdentifier()) param.traverse(getIIFEVisitor(), state);
      if (state.needsOuterBinding) break;
    }
  }

  let firstOptionalIndex = null;
  let restNodes: t.Statement[] | undefined;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (!shouldTransform[i]) continue;

    const transformedRestNodes: t.Statement[] = [];
    if (replaceRestElement) {
      replaceRestElement(path, param, transformedRestNodes);
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
        body.push(
          buildLooseDestructuredDefaultParam({
            ASSIGNMENT_IDENTIFIER: left.node,
            DEFAULT_VALUE: right.node,
            PARAMETER_NAME: t.cloneNode(paramName),
            UNDEFINED: undefinedNode,
          }),
        );
        param.replaceWith(paramName);
        temporaries.add(paramName);
      }
    } else if (paramIsAssignmentPattern) {
      if (firstOptionalIndex === null) firstOptionalIndex = i;

      const left = param.get("left");
      const right = param.get("right");

      const defNode = buildDefaultParam({
        VARIABLE_NAME: left.node,
        DEFAULT_VALUE: right.node,
        ARGUMENT_KEY: t.numericLiteral(i - argumentsOffset),
      });
      body.push(defNode);
    } else if (param.isRestElement()) {
      // The rest parameter is usually converted before calling this function,
      // but callers that only transform some parameters may keep it. It must
      // be converted if the parameters are cut off below.
      if (firstOptionalIndex !== null) {
        restNodes = transformedRestNodes;
        continue;
      }
    } else if (firstOptionalIndex !== null) {
      const defNode = buildSafeArgumentsAccess([
        param.node,
        t.numericLiteral(i - argumentsOffset),
      ]);
      body.push(defNode);
    } else if (param.isObjectPattern() || param.isArrayPattern()) {
      const uid = path.scope.generateUidIdentifier("ref");
      // Move the type annotation to the new parameter
      const newParam = t.cloneNode(uid);
      newParam.typeAnnotation = param.node.typeAnnotation;
      param.node.typeAnnotation = null;

      const defNode = t.variableDeclaration("let", [
        t.variableDeclarator(param.node, uid),
      ]);
      body.push(defNode);

      param.replaceWith(newParam);
      temporaries.add(newParam);
    }

    body.push(...transformedRestNodes);
  }

  if (restNodes) {
    // The destructuring of the rest parameter happens after it is initialized
    path.ensureBlock();
    (node.body as t.BlockStatement).body.unshift(...restNodes);
    // `convertFunctionRest` needs the binding of the new rest parameter. The
    // scope must not be crawled here: the parameters moved into the body are
    // not declared yet, and their references would resolve to outer bindings.
    scope.registerBinding("param", params[params.length - 1]);
    convertFunctionRest(path);
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

    path.set("body", t.blockStatement(body));

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
    if (async && !generator) {
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

  if (prologue) path2.get("body").unshiftContainer("body", prologue);

  if (keepArgumentsUnmapped) unmapArguments(path, temporaries);

  return true;
}
