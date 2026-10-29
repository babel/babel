import type { types as t } from "@babel/core";
import type { NodePath, PluginPass, Scope, Visitor } from "@babel/core";
import {
  convertFunctionParams,
  declareMovedParams,
  getParamNames,
  isDefaultEvaluationObservable,
  isPatternEvaluationObservable,
  isRedeclaredInBody,
  moveParamToTemporary,
  readsMappedArguments,
  skipTypeAnnotationsVisitor,
  unmapArguments,
} from "@babel/plugin-transform-parameters";
import { FEATURES, type ResolvedOptions } from "./features.ts";
import { collectScopeInfo, registerReplacement } from "./scope.ts";
import { getLoweredValue, needsLowering } from "./util.ts";

interface ConflictState {
  ownerOf: Map<string, number>;
  functionScope: Scope;
  /** The index of the parameter being visited. */
  index: number;
  /** The nodes of the patterns moved into the body. */
  movedNodes: ReadonlySet<t.Node>;
  /** How many moved patterns the visited node is nested in. */
  movedDepth: number;
  conflict: boolean;
}

// If a part of the parameter list (e.g. a default value) references a
// binding that will be moved into the body, or if a moved pattern references
// an outer binding that is shadowed in the body, moving things around would
// change what the references resolve to.
function checkConflict(
  path: NodePath<t.Identifier | t.JSXIdentifier>,
  state: ConflictState,
) {
  const { name } = path.node;
  const { ownerOf, functionScope } = state;
  const owner = ownerOf.get(name);
  const inMoved = state.movedDepth > 0;
  let conflict: boolean;
  if (owner !== undefined) {
    // A name bound by a moved pattern, only initialized in the body, is
    // read by another parameter or by a part of its own parameter staying
    // in the list, e.g. function f([{ ...r }, b = r]) {}
    conflict =
      (owner !== state.index || !inMoved) &&
      path.scope.getBinding(name) === functionScope.getBinding(name);
  } else {
    const binding = inMoved && functionScope.getOwnBinding(name);
    // A parameter redeclared in the body is a different binding there,
    // e.g. for closures: function f({ a = () => x }, x) { var x; }
    conflict =
      !!binding && (binding.kind !== "param" || isRedeclaredInBody(binding));
  }
  if (conflict) {
    state.conflict = true;
    path.stop();
  }
}

const conflictVisitor: Visitor<ConflictState> = {
  ...skipTypeAnnotationsVisitor,
  ObjectPattern: {
    enter(path, state) {
      if (state.movedNodes.has(path.node)) state.movedDepth++;
    },
    exit(path, state) {
      if (state.movedNodes.has(path.node)) state.movedDepth--;
    },
  },
  ReferencedIdentifier: checkConflict,
  // Assigned names resolve like references, e.g. `y` in `{ v = (y = 5) }`
  BindingIdentifier(path, state) {
    // A declaration, not an assignment
    if (path.scope.bindingIdentifierEquals(path.node.name, path.node)) return;
    checkConflict(path, state);
  },
};

/**
 * Whether the parts of a lowered parameter staying in the parameter list,
 * around the moved patterns, can run user code: its default values, and the
 * iteration of its array patterns.
 */
function isNativePartObservable(param: t.Node, scope: Scope): boolean {
  switch (param.type) {
    case "AssignmentPattern":
      return (
        isDefaultEvaluationObservable(param.right, scope) ||
        isNativePartObservable(param.left, scope)
      );
    case "RestElement":
      return isNativePartObservable(param.argument, scope);
    case "ArrayPattern":
      return true;
    default:
      return false;
  }
}

/**
 * Collect the patterns of a parameter that are moved into the function body:
 * the object patterns that need to be lowered. An array pattern stays in the
 * parameter list, iterating its argument in order with the elements that
 * don't need to be lowered: only the ones that do are replaced by
 * temporaries, and the first one keeps its object pattern (`keepPattern`)
 * when only its last value is lowered, like splitArrayPattern. Returns
 * whether an element following a moved pattern runs user code, which must
 * not happen before the moved pattern is destructured.
 */
function collectMovedPatterns(
  param: NodePath,
  features: number,
  scope: Scope,
  moved: NodePath<t.ObjectPattern>[],
  keepPattern = false,
): boolean {
  if (param.isAssignmentPattern()) {
    return collectMovedPatterns(
      param.get("left"),
      features,
      scope,
      moved,
      keepPattern,
    );
  } else if (param.isRestElement()) {
    return collectMovedPatterns(param.get("argument"), features, scope, moved);
  } else if (param.isObjectPattern()) {
    if (keepPattern && getLoweredValue(param.node, features)) {
      // Only its last value is moved
      const properties = param.get("properties");
      const last = properties[
        properties.length - 1
      ] as NodePath<t.ObjectProperty>;
      collectMovedPatterns(last.get("value"), features, scope, moved, true);
    } else {
      moved.push(param);
    }
  } else if (param.isArrayPattern()) {
    let reordered = false;
    let hasMoved = false;
    for (const element of param.get("elements")) {
      if (!element.node) continue;
      if (needsLowering(element.node, features)) {
        const nested = collectMovedPatterns(
          element,
          features,
          scope,
          moved,
          !hasMoved,
        );
        reordered ||=
          nested || (hasMoved && isNativePartObservable(element.node, scope));
        hasMoved = true;
      } else if (
        hasMoved &&
        // Nested array patterns stay in the list, iterated in order
        isPatternEvaluationObservable(element.node, scope, true)
      ) {
        reordered = true;
      }
    }
    return reordered;
  }
  return false;
}

type Pattern = t.ObjectPattern | t.ArrayPattern;

/**
 * Replace the parameter patterns containing object rest or private keys with
 * a temporary identifier, destructured at the beginning of the function body.
 *
 *   function f({ a, ...b }, [c, { ...d }]) {}
 * becomes
 *   function f(_ref, [c, _ref2]) { var { a, ...b } = _ref; var { ...d } = _ref2; }
 *
 * The declarations are then lowered by the VariableDeclaration visitor.
 */
export function transformFunctionParams(
  path: NodePath<t.Function>,
  _: PluginPass,
  options: ResolvedOptions,
) {
  // Plain destructuring parameters are handled by
  // @babel/plugin-transform-parameters: only extract the parameters
  // containing object rest or private keys.
  const features =
    options.features & (FEATURES.objectRest | FEATURES.privateDestructuring);
  if (!features) return;
  const firstLowered = path.node.params.findIndex(param =>
    needsLowering(param, features),
  );
  if (firstLowered === -1) return;
  const isLowered = path.node.params.map(param =>
    needsLowering(param, features),
  );

  const params = path.get("params");
  const tsParameterProperty = params.find(param =>
    param.isTSParameterProperty(),
  );
  if (tsParameterProperty) {
    throw tsParameterProperty.buildCodeFrameError(
      `TypeScript features must first be transformed by ` +
        `@babel/plugin-transform-typescript.\n` +
        `If you have already enabled that plugin (or '@babel/preset-typescript'), make sure ` +
        `that it runs before the destructuring plugins.`,
    );
  }

  const functionScope = path.scope;
  const keepArgumentsUnmapped = readsMappedArguments(path);

  const movedPatterns: NodePath<t.ObjectPattern>[] = [];
  // Names bound by the patterns moved into the function body, by parameter.
  const ownerOf = new Map<string, number>();
  // Whether an element following a moved pattern would be destructured before
  // it, when the pattern is replaced in place
  let reordered = false;
  params.forEach((param, i) => {
    if (!isLowered[i]) return;
    const start = movedPatterns.length;
    if (collectMovedPatterns(param, features, functionScope, movedPatterns)) {
      reordered = true;
    }
    for (const pattern of movedPatterns.slice(start)) {
      for (const name of Object.keys(pattern.getBindingIdentifiers())) {
        ownerOf.set(name, i);
      }
    }
  });
  const movedNodes = new Set<t.Node>(
    movedPatterns.map(pattern => pattern.node),
  );

  let conflictIndex = -1;
  for (let i = 0; i < params.length; i++) {
    const state: ConflictState = {
      ownerOf,
      functionScope,
      index: i,
      movedNodes,
      // The traversal doesn't visit the parameter itself
      movedDepth: movedNodes.has(params[i].node) ? 1 : 0,
      conflict: false,
    };
    params[i].traverse(conflictVisitor, state);
    if (state.conflict) {
      conflictIndex = i;
      break;
    }
  }

  // A body function redeclaring even an unlowered parameter must be isolated
  // before the mapped arguments object is copied.
  const shadowedNames = keepArgumentsUnmapped
    ? getParamNames(path.node.params)
    : ownerOf.keys();
  const shadowed = [...shadowedNames].some(name => {
    const binding = functionScope.getOwnBinding(name);
    return binding && isRedeclaredInBody(binding);
  });

  // The moved patterns are destructured in the body: the elements following
  // them in their array patterns and the following parameters must not be
  // evaluated before them.
  reordered ||= params.some((param, i) => {
    if (i <= firstLowered) return false;
    return isLowered[i]
      ? isNativePartObservable(param.node, functionScope)
      : isPatternEvaluationObservable(param.node, functionScope);
  });

  // The parameters of generators are initialized when they are called, not
  // when they are first resumed: convertFunctionParams evaluates them in a
  // function wrapping the generator body.
  const { generator } = path.node;

  if (conflictIndex !== -1 || shadowed || reordered || generator) {
    // Move the conflicting parameters, and the following ones, into the body.
    // convertFunctionParams also moves the parameters that must be evaluated
    // after them.
    const start = conflictIndex === -1 ? Infinity : conflictIndex;
    // The function scope is crawled again: forget the information of its
    // nodes first, as the moved parameters get new paths.
    const forgetScopeInfo = collectScopeInfo(path);
    convertFunctionParams(
      path,
      options.ignoreFunctionLength,
      index => index >= start || isLowered[index],
      (fnPath, paramPath, transformedRestNodes, kind) => {
        if (!paramPath.isRestElement()) return;
        const argument = paramPath.get("argument");
        if (needsLowering(argument.node, features)) {
          transformedRestNodes.push(
            moveParamToTemporary(
              argument as NodePath<Pattern>,
              fnPath.scope,
              kind,
            )[0],
          );
        }
      },
      options.noNewArrows,
      keepArgumentsUnmapped,
    );
    forgetScopeInfo();
    functionScope.crawl();
    return;
  }

  path.ensureBlock();
  // The names bound by the moved patterns are not parameters anymore
  const { kind, blockers: annexB } = declareMovedParams(
    path,
    new Set(ownerOf.keys()),
  );
  const declarations: t.VariableDeclaration[] = [];
  const newParams: NodePath<t.Identifier>[] = [];
  for (const pattern of movedPatterns) {
    const [declaration, newParam] = moveParamToTemporary(
      pattern,
      functionScope,
      kind,
    );
    declarations.push(declaration);
    newParams.push(newParam);
  }

  const body = path.get("body") as NodePath<t.BlockStatement>;
  const declarationPaths = body.unshiftContainer("body", declarations);

  for (const param of newParams) {
    functionScope.registerBinding("param", param);
  }
  // The references of the moved patterns are registered again through
  // their new paths; they are forgotten by node when the declarations are
  // lowered.
  registerReplacement(declarationPaths, functionScope);

  const unmapped = keepArgumentsUnmapped && unmapArguments(path);
  if (unmapped) {
    registerReplacement(unmapped, functionScope);
  }
  // The blocks wrapped by the Annex B declarations get new scopes
  if (annexB) functionScope.crawl();
}
