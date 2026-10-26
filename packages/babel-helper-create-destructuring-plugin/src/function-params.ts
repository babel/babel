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

type Param = t.Function["params"][number];
type Binding = Scope["bindings"][string];

interface ConflictState {
  ownerOf: Map<string, number>;
  functionScope: Scope;
  /** The index of the parameter being visited. */
  index: number;
  isLowered: boolean;
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

// If another parameter (e.g. a default value) references a binding that
// will be moved into the body, or if a lowered parameter references an outer
// binding that is shadowed in the body, moving things around would change
// what the references resolve to.
const conflictVisitor: Visitor<ConflictState> = {
  "TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration"(
    path,
  ) {
    path.skip();
  },
  ReferencedIdentifier(path, state) {
    const { name } = path.node;
    const { ownerOf, functionScope } = state;
    const owner = ownerOf.get(name);
    const binding = functionScope.getOwnBinding(name);
    if (
      (owner !== undefined &&
        owner !== state.index &&
        path.scope.getBinding(name) === functionScope.getBinding(name)) ||
      (owner === undefined &&
        binding &&
        state.isLowered &&
        // A parameter redeclared in the body is a different binding there,
        // e.g. for closures: function f({ a = () => x }, x) { var x; }
        (binding.kind !== "param" || isRedeclaredInBody(binding)))
    ) {
      state.conflict = true;
      path.stop();
    }
  },
};

/**
 * Replace parameters containing object rest or private keys with a
 * temporary identifier, destructured at the beginning of the function body.
 *
 *   function f({ a, ...b }, [c, { ...d }]) {}
 * becomes
 *   function f(_ref, [c, _ref2]) { var { a, ...b } = _ref, { ...d } = _ref2; }
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

  // Names bound by parameters that will be moved into the function body.
  const ownerOf = new Map<string, number>();
  params.forEach((param, i) => {
    if (!isLowered[i]) return;
    for (const name of Object.keys(param.getBindingIdentifiers())) {
      ownerOf.set(name, i);
    }
  });

  let conflictIndex = -1;
  for (let i = 0; i < params.length; i++) {
    const state: ConflictState = {
      ownerOf,
      functionScope,
      index: i,
      isLowered: isLowered[i],
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

  // The lowered parameters are destructured in the body: the following
  // parameters must not be evaluated before them.
  const reordered = params.some((param, i) => {
    if (i <= firstLowered) return false;
    if (!isLowered[i]) {
      return isParamEvaluationObservable(param.node, functionScope);
    }
    // Only the default value of a lowered parameter stays in the list
    return (
      param.isAssignmentPattern() &&
      isDefaultEvaluationObservable(param.node.right, functionScope)
    );
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

  function replaceParam(
    paramPath: NodePath<Param | t.AssignmentPattern["left"]>,
  ) {
    if (paramPath.isAssignmentPattern()) {
      replaceParam(paramPath.get("left"));
    } else if (paramPath.isRestElement()) {
      replaceParam(paramPath.get("argument"));
    } else if (paramPath.isObjectPattern() || paramPath.isArrayPattern()) {
      const uid = functionScope.generateUidIdentifier("ref");
      uid.typeAnnotation = paramPath.node.typeAnnotation;
      declarations.push(
        t.variableDeclaration("var", [
          t.variableDeclarator(paramPath.node, t.cloneNode(uid)),
        ]),
      );
      const [newParam] = paramPath.replaceWith(uid);
      newParams.push(newParam);
    }
  }

  params.forEach((param, i) => {
    if (isLowered[i]) replaceParam(param);
  });

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
