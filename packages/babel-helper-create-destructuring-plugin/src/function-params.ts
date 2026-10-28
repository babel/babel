import { types as t } from "@babel/core";
import type { NodePath, Scope, Visitor } from "@babel/core";
import {
  convertFunctionParams,
  isDefaultEvaluationObservable,
  isParamEvaluationObservable,
  preserveAnnexBParameterExclusions,
  readsMappedArguments,
  unmapArguments,
} from "@babel/plugin-transform-parameters";
import { FEATURES, type ResolvedOptions } from "./features.ts";
import { collectScopeInfo, registerReplacement } from "./scope.ts";
import { needsLowering } from "./util.ts";

type Binding = Scope["bindings"][string];

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

/**
 * Whether a parameter is redeclared in the function body, which then has its
 * own binding for that name.
 */
function isRedeclaredInBody(binding: Binding): boolean {
  return binding.constantViolations.some(
    violation =>
      // A lexical declaration with the same name is an early error
      violation.isVariableDeclarator() || violation.isFunctionDeclaration(),
  );
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
  "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration"(
    path,
  ) {
    path.skip();
  },
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
    if (path.scope.getBinding(path.node.name)?.identifier === path.node) return;
    checkConflict(path, state);
  },
};

/**
 * Collect the patterns of a parameter that are moved into the function body:
 * the object patterns that need to be lowered. An array pattern stays in the
 * parameter list, iterating its argument in order with the elements that
 * don't need to be lowered: only the ones that do are replaced by
 * temporaries.
 */
function collectMovedPatterns(
  param: NodePath,
  features: number,
  moved: NodePath<t.ObjectPattern>[],
) {
  if (param.isAssignmentPattern()) {
    collectMovedPatterns(param.get("left"), features, moved);
  } else if (param.isRestElement()) {
    collectMovedPatterns(param.get("argument"), features, moved);
  } else if (param.isObjectPattern()) {
    moved.push(param);
  } else if (param.isArrayPattern()) {
    for (const element of param.get("elements")) {
      if (element.node && needsLowering(element.node, features)) {
        collectMovedPatterns(element, features, moved);
      }
    }
  }
}

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
  options: ResolvedOptions,
) {
  const { ignoreFunctionLength } = options;
  // Plain destructuring parameters are handled by
  // @babel/plugin-transform-parameters: only extract the parameters
  // containing object rest or private keys.
  const features = options.features & ~FEATURES.destructuring;
  const isLowered = path.node.params.map(param =>
    needsLowering(param, features),
  );
  const firstLowered = isLowered.indexOf(true);
  if (firstLowered === -1) return;

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
  params.forEach((param, i) => {
    if (!isLowered[i]) return;
    const start = movedPatterns.length;
    collectMovedPatterns(param, features, movedPatterns);
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
    ? params.flatMap(param => Object.keys(param.getBindingIdentifiers()))
    : [...ownerOf.keys()];
  const shadowed = shadowedNames.some(name => {
    const binding = functionScope.getOwnBinding(name);
    return binding && isRedeclaredInBody(binding);
  });

  // The moved patterns are destructured in the body: the following
  // parameters must not be evaluated before them.
  const reordered = params.some((param, i) => {
    if (i <= firstLowered) return false;
    return isLowered[i]
      ? isNativePartObservable(param.node, functionScope)
      : isParamEvaluationObservable(param.node, functionScope);
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
      ignoreFunctionLength,
      index => index >= start || isLowered[index],
      (fnPath, paramPath, transformedRestNodes) => {
        if (!paramPath.isRestElement()) return;
        const argument = paramPath.get("argument");
        if (!needsLowering(argument.node, features)) return;
        const uid = fnPath.scope.generateUidIdentifier("ref");
        transformedRestNodes.push(
          t.variableDeclaration("var", [
            t.variableDeclarator(
              argument.node as t.VariableDeclarator["id"],
              uid,
            ),
          ]),
        );
        argument.replaceWith(t.cloneNode(uid));
      },
      options.noNewArrows,
    );
    forgetScopeInfo();
    functionScope.crawl();
    return;
  }

  const declarations: t.VariableDeclaration[] = [];
  const newParams: NodePath<t.Identifier>[] = [];
  for (const pattern of movedPatterns) {
    const uid = functionScope.generateUidIdentifier("ref");
    uid.typeAnnotation = pattern.node.typeAnnotation;
    declarations.push(
      t.variableDeclaration("var", [
        t.variableDeclarator(pattern.node, t.cloneNode(uid)),
      ]),
    );
    const [newParam] = pattern.replaceWith(uid);
    newParams.push(newParam);
  }

  path.ensureBlock();
  const body = path.get("body") as NodePath<t.BlockStatement>;
  // In sloppy mode, a function declared in a block is also declared as a
  // `var` of the function (Annex B), unless its name is a parameter: the
  // names bound by the moved patterns are not parameters anymore.
  const annexB = preserveAnnexBParameterExclusions(
    body,
    new Set(ownerOf.keys()),
  );
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
