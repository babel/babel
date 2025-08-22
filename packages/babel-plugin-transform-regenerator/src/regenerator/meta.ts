import assert from "node:assert";
import { types as t } from "@babel/core";

const mMap = new WeakMap();
function m(node: t.Node) {
  if (!mMap.has(node)) {
    mMap.set(node, {});
  }
  return mMap.get(node);
}

function makePredicate(
  propertyName: string,
  knownTypes: Record<string, boolean>,
) {
  function onlyChildren(node: t.Node) {
    t.assertNode(node);

    // Assume no side effects until we find out otherwise.
    let result = false;

    function check(child: any) {
      if (result) {
        // Do nothing.
      } else if (Array.isArray(child)) {
        child.some(check);
      } else if (t.isNode(child)) {
        assert.strictEqual(result, false);
        result = predicate(child);
      }
      return result;
    }

    const keys = t.VISITOR_KEYS[node.type];
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const child = node[key as keyof typeof node];
        check(child);
      }
    }

    return result;
  }

  function predicate(node: t.Node) {
    t.assertNode(node);

    const meta = m(node);
    if (Object.hasOwn(meta, propertyName)) return meta[propertyName];

    // Certain types are "opaque," which means they have no side
    // effects or leaps and we don't care about their subexpressions.
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (Object.hasOwn(opaqueTypes, node.type))
      return (meta[propertyName] = false);

    if (Object.hasOwn(knownTypes, node.type))
      return (meta[propertyName] = true);

    return (meta[propertyName] = onlyChildren(node));
  }

  predicate.onlyChildren = onlyChildren;

  return predicate;
}

const opaqueTypes = {
  FunctionExpression: true,
  ArrowFunctionExpression: true,
};

// These types potentially have side effects regardless of what side
// effects their subexpressions have.
const sideEffectTypes = {
  CallExpression: true, // Anything could happen!
  ForInStatement: true, // Modifies the key variable.
  UnaryExpression: true, // Think delete.
  BinaryExpression: true, // Might invoke .toString() or .valueOf().
  AssignmentExpression: true, // Side-effecting by definition.
  UpdateExpression: true, // Updates are essentially assignments.
  NewExpression: true, // Similar to CallExpression.
};

// These types are the direct cause of all leaps in control flow.
const leapTypes = {
  YieldExpression: true,
  BreakStatement: true,
  ContinueStatement: true,
  ReturnStatement: true,
  ThrowStatement: true,
};

// All leap types are also side effect types.
for (const type in leapTypes) {
  if (Object.hasOwn(leapTypes, type)) {
    sideEffectTypes[type as keyof typeof sideEffectTypes] =
      leapTypes[type as keyof typeof leapTypes];
  }
}

export const hasSideEffects = makePredicate("hasSideEffects", sideEffectTypes);
export const containsLeap = makePredicate("containsLeap", leapTypes);
