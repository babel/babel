import { types as t } from "@babel/core";
import type { Scope } from "@babel/core";
import {
  hasArrayRest,
  isSafeArrayLiteralElement,
  mayRunUserCode,
  someTarget,
  type PatternTarget,
} from "./util.ts";

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

/** Whether an array literal can be unpacked without changing evaluation order. */
export function canUnpackArrayPattern(
  pattern: t.ArrayPattern,
  arr: t.ArrayExpression,
  scope: Scope,
): boolean {
  // pattern has less elements than the array and doesn't have a rest so some
  // elements won't be evaluated
  if (pattern.elements.length > arr.elements.length) return false;
  if (pattern.elements.length < arr.elements.length && !hasArrayRest(pattern)) {
    return false;
  }

  // The first target whose initialization has observable side effects
  // (nested object patterns read properties, defaults are evaluated), if any.
  let effectfulFrom = -1;
  for (let i = 0; i < pattern.elements.length; i++) {
    const element = pattern.elements[i];
    // deopt on holes
    if (!element) return false;

    // deopt on member expressions, also nested ones, as they may be
    // included in the RHS or affected by it: [a.b = 1, c] = [2, a = {}]
    if (hasMemberTarget(element)) return false;

    if (
      effectfulFrom === -1 &&
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
    // calls, constructors and implicit coercions.
    if (element && mayRunUserCode(element)) return false;

    // The array literal is fully evaluated before the pattern. If an earlier
    // target has side effects, later elements must not be affected by them.
    if (
      effectfulFrom !== -1 &&
      i > effectfulFrom &&
      !isSafeArrayLiteralElement(element, scope)
    ) {
      return false;
    }
  }

  // deopt on reference to left side identifiers
  try {
    t.traverse(arr, arrayUnpackVisitor, t.getBindingIdentifiers(pattern));
  } catch (e) {
    if (e !== STOP_TRAVERSAL) throw e;
    return false;
  }
  return true;
}

/** Whether `target` assigns to a member expression. */
function hasMemberTarget(target: PatternTarget): boolean {
  return someTarget(target, node => t.isMemberExpression(node));
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
    default:
      return false;
  }
}
