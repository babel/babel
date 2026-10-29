import { types as t } from "@babel/core";
import type { Scope } from "@babel/core";
import {
  hasMemberTarget,
  hasRestElement,
  isInitializedReference,
  isSafeToEvaluate,
  mayRunUserCode,
  type PatternTarget,
} from "./util.ts";

/**
 * Whether an element of an unpacked array literal can be evaluated when its
 * target is assigned, after the targets before it, instead of before all of
 * them: it can't throw, nor be affected by their assignment.
 */
function isSafeUnpackedElement(node: t.Node | null, scope: Scope): boolean {
  return (
    node === null ||
    isSafeToEvaluate(node, scope) ||
    // An initialized binding, which only the targets could reassign
    isInitializedReference(node, scope)
  );
}

/**
 * Whether evaluating `node` only coerces plain values, which can throw or
 * call user code (`valueOf`), but is evaluated before any target is
 * assigned when unpacked (see `isSafeUnpackedElement`): unlike a call, that
 * user code can't observe the unpacking.
 */
function isCoercion(node: t.Node, scope: Scope): boolean {
  if (isSafeUnpackedElement(node, scope)) return true;
  if (t.isUnaryExpression(node)) {
    return node.operator !== "delete" && isCoercion(node.argument, scope);
  }
  if (t.isBinaryExpression(node)) {
    return (
      node.operator !== "in" &&
      node.operator !== "instanceof" &&
      !t.isPrivateName(node.left) &&
      isCoercion(node.left, scope) &&
      isCoercion(node.right, scope)
    );
  }
  if (t.isTemplateLiteral(node)) {
    return node.expressions.every(expr => isCoercion(expr, scope));
  }
  return false;
}

const STOP_TRAVERSAL = {};

// NOTE: This visitor is meant to be used via t.traverse. It stops the
// traversal when the array literal references one of `bindings`.
const arrayUnpackVisitor = (
  node: t.Node,
  ancestors: t.TraversalAncestors,
  bindings: Record<string, t.Identifier>,
) => {
  if (!t.isIdentifier(node) || !bindings[node.name]) return;
  const parent = ancestors[ancestors.length - 1].node;
  const grandparent = ancestors[ancestors.length - 2]?.node;
  // Both reads and writes, e.g. [a, b] = [1, a = 5]
  if (
    t.isReferenced(node, parent, grandparent) ||
    t.isBinding(node, parent, grandparent)
  ) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw STOP_TRAVERSAL;
  }
};

/**
 * Whether an array literal can be unpacked without changing evaluation
 * order: returns the index of the first target whose initialization has
 * observable side effects (`Infinity` if none), the elements after which
 * must be evaluated before any target; `false` otherwise.
 */
function canUnpackArrayPattern(
  pattern: t.ArrayPattern,
  arr: t.ArrayExpression,
  scope: Scope,
): number | false {
  // pattern has fewer elements than the array and doesn't have a rest so some
  // elements won't be evaluated
  if (pattern.elements.length > arr.elements.length) return false;
  if (
    pattern.elements.length < arr.elements.length &&
    !hasRestElement(pattern)
  ) {
    return false;
  }

  // The first target whose initialization has observable side effects
  // (nested object patterns read properties, defaults are evaluated), if any.
  let effectfulFrom = Infinity;
  for (let i = 0; i < pattern.elements.length; i++) {
    const element = pattern.elements[i];
    // deopt on elisions
    if (!element) return false;

    // deopt on member expressions, also nested ones, as they may be
    // included in the RHS or affected by it: [a.b = 1, c] = [2, a = {}]
    if (hasMemberTarget(element)) return false;

    if (
      effectfulFrom === Infinity &&
      isEffectfulArrayTarget(element, arr.elements[i], scope)
    ) {
      effectfulFrom = i;
    }
  }

  for (let i = 0; i < arr.elements.length; i++) {
    const element = arr.elements[i];
    // deopt on spread elements
    if (t.isSpreadElement(element)) return false;

    // The entire RHS runs before any target is bound, including nested
    // calls and constructors, which could observe the targets assigned
    // before an element.
    if (element && mayRunUserCode(element) && !isCoercion(element, scope)) {
      return false;
    }

    // The array literal is fully evaluated before the pattern. If an earlier
    // target has side effects, later elements must not be affected by them.
    if (i > effectfulFrom && !isSafeToEvaluate(element, scope)) return false;
  }

  // deopt on reference to left side identifiers
  try {
    t.traverse(arr, arrayUnpackVisitor, t.getBindingIdentifiers(pattern));
  } catch (e) {
    if (e !== STOP_TRAVERSAL) throw e;
    return false;
  }
  return effectfulFrom;
}

interface UnpackedElement {
  target: PatternTarget;
  value: t.Expression;
  /** The value is a fresh array literal, for a rest element. */
  isArray: boolean;
}

/**
 * Unpack an array literal destructured by `pattern`, without iterating it:
 *   let [a, b] = [1, 2];  ->  let a = 1, b = 2;
 * Returns the value of each target, or null when the literal can't be
 * unpacked without changing the evaluation order: e.g. a pattern of unequal
 * size to the literal would not evaluate some of its elements. Elements that
 * must be evaluated before any target is bound are stored with `temp`.
 */
export function unpackArrayLiteral(
  pattern: t.ArrayPattern,
  arr: t.ArrayExpression,
  scope: Scope,
  temp: (init: t.Expression) => t.Identifier,
): UnpackedElement[] | null {
  const effectfulFrom = canUnpackArrayPattern(pattern, arr, scope);
  if (effectfulFrom === false) return null;
  const elisionToUndefined = (el: t.ArrayExpression["elements"][number]) =>
    el ? t.cloneNode(el as t.Expression) : t.buildUndefinedNode();
  // Coercions are evaluated in temporaries before any target is bound.
  // Earlier mutable reads must be captured before those coercions too.
  const lastCoercion = arr.elements.findLastIndex(
    element => element && mayRunUserCode(element),
  );
  // An element that could throw, or be affected by the effects of an
  // earlier target, is evaluated before any target is assigned.
  const values = arr.elements.map((element, i) =>
    (
      i > effectfulFrom || i < lastCoercion
        ? isSafeToEvaluate(element, scope)
        : isSafeUnpackedElement(element, scope)
    )
      ? element
      : temp(element as t.Expression),
  );
  return pattern.elements.map((element, i) =>
    element!.type === "RestElement"
      ? {
          target: element.argument,
          value: t.arrayExpression(values.slice(i).map(elisionToUndefined)),
          isArray: true,
        }
      : {
          target: element,
          value: elisionToUndefined(values[i]),
          isArray: false,
        },
  );
}

/**
 * Whether binding `element` to `value` (an element of an array literal)
 * can run user code or observe/modify the environment.
 */
function isEffectfulArrayTarget(
  element: t.ArrayPattern["elements"][number],
  value: t.ArrayExpression["elements"][number] | undefined,
  scope: Scope,
): boolean {
  switch (element?.type) {
    case "RestElement":
      // the rest target receives a fresh array literal
      return isEffectfulArrayTarget(element.argument, undefined, scope);
    case "AssignmentPattern":
      return (
        !scope.isPure(element.right) ||
        mayRunUserCode(element.right) ||
        isEffectfulArrayTarget(element.left, value, scope)
      );
    case "ArrayPattern":
      // Destructuring an array literal does not run user code, but its
      // nested targets might.
      return (
        !t.isArrayExpression(value) ||
        element.elements.some((el, i) =>
          isEffectfulArrayTarget(el, value.elements[i], scope),
        )
      );
    case "ObjectPattern":
      return true;
    case "Identifier":
      // Assigning an undeclared name can call a setter of the global object
      return !scope.hasBinding(element.name);
    default:
      return false;
  }
}
