import { types as t } from "@babel/core";
import type { File, NodePath, Scope } from "@babel/core";
import { FEATURES } from "./features.ts";

export type PatternTarget =
  | t.LVal
  | t.PatternLike
  | t.TSParameterProperty
  | t.OptionalMemberExpression
  | null
  | undefined;

/**
 * Whether `target` contains anything that must be lowered given the enabled
 * features. When the `destructuring` feature is enabled every pattern must be
 * lowered; otherwise only object rest elements and private keys are.
 */
export function needsLowering(
  target: PatternTarget,
  features: number,
): boolean {
  if (!target) return false;
  switch (target.type) {
    case "ObjectPattern":
      if (features & FEATURES.destructuring) return true;
      return target.properties.some(prop =>
        prop.type === "RestElement"
          ? !!(features & FEATURES.objectRest)
          : propertyNeedsLowering(prop, features),
      );
    case "ArrayPattern":
      if (features & FEATURES.destructuring) return true;
      for (const element of target.elements) {
        if (needsLowering(element, features)) return true;
      }
      return false;
    case "AssignmentPattern":
      return needsLowering(target.left, features);
    case "RestElement":
      return needsLowering(target.argument, features);
    default:
      return false;
  }
}

/** Whether a property of an object pattern must be lowered. */
export function propertyNeedsLowering(
  prop: t.ObjectProperty,
  features: number,
): boolean {
  return (
    (prop.key.type === "PrivateName" &&
      !!(features & FEATURES.privateDestructuring)) ||
    needsLowering(prop.value as PatternTarget, features)
  );
}

/**
 * Whether `predicate` holds for one of the assignment targets of the pattern
 * (identifiers, member expressions, `void`, ...).
 */
export function someTarget(
  target: PatternTarget,
  predicate: (target: NonNullable<PatternTarget>) => boolean,
): boolean {
  if (!target) return false;
  switch (target.type) {
    case "ObjectPattern":
      return target.properties.some(prop =>
        someTarget(
          prop.type === "RestElement" ? prop : (prop.value as PatternTarget),
          predicate,
        ),
      );
    case "ArrayPattern":
      return target.elements.some(element => someTarget(element, predicate));
    case "AssignmentPattern":
      return someTarget(target.left, predicate);
    case "RestElement":
      return someTarget(target.argument, predicate);
    default:
      return predicate(target);
  }
}

export function hasPrivateClassElement(node: t.ClassBody): boolean {
  return node.body.some(
    element => "key" in element && t.isPrivateName(element.key),
  );
}

export function hasObjectRest(pattern: t.ObjectPattern): boolean {
  const { properties } = pattern;
  return (
    properties.length > 0 &&
    properties[properties.length - 1].type === "RestElement"
  );
}

export function hasArrayRest(pattern: t.ArrayPattern): boolean {
  const { elements } = pattern;
  return (
    elements.length > 0 && elements[elements.length - 1]?.type === "RestElement"
  );
}

export function isPureVoid(node: t.Node, scope: Scope): boolean {
  return (
    (t.isUnaryExpression(node, { operator: "void" }) &&
      t.isPureish(node.argument)) ||
    (t.isIdentifier(node, { name: "undefined" }) &&
      !scope.hasBinding("undefined"))
  );
}

/**
 * Whether the value is known to pass RequireObjectCoercible, i.e. it can
 * neither be null nor undefined.
 */
export function isObjectCoercible(node: t.Node): boolean {
  switch (node.type) {
    case "ObjectExpression":
    case "ArrayExpression":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
    case "ClassExpression":
    case "NewExpression":
    case "TemplateLiteral":
    case "StringLiteral":
    case "NumericLiteral":
    case "BigIntLiteral":
    case "BooleanLiteral":
    case "RegExpLiteral":
      return true;
    default:
      // `this` is undefined in strict functions and at the top level of
      // modules.
      return false;
  }
}

/**
 * Whether evaluating `node` again later is guaranteed to produce the same
 * value with no side effects, even if other code (getters, defaults, ...)
 * runs in between. This is stricter than `scope.isPure`, which considers
 * non-constant identifiers pure.
 */
export function isStableExpression(node: t.Node, scope: Scope): boolean {
  switch (node.type) {
    case "StringLiteral":
    case "NumericLiteral":
    case "BigIntLiteral":
    case "BooleanLiteral":
    case "NullLiteral":
    case "ThisExpression":
    case "Super":
      return true;
    case "TemplateLiteral":
      return node.expressions.every(expr => isStableExpression(expr, scope));
    case "Identifier":
      return scope.isStatic(node);
    case "UnaryExpression":
      return (
        node.operator !== "delete" && isStableExpression(node.argument, scope)
      );
    default:
      return false;
  }
}

const SIDE_EFFECT_NODES = new Set([
  "CallExpression",
  "OptionalCallExpression",
  "NewExpression",
  "AssignmentExpression",
  "UpdateExpression",
  "YieldExpression",
  "AwaitExpression",
  "TaggedTemplateExpression",
]);

function isSideEffect(node: t.Node): boolean {
  return t.isUnaryExpression(node)
    ? node.operator === "delete"
    : SIDE_EFFECT_NODES.has(node.type);
}

/**
 * Whether evaluating `node` can run user code: side effects, but also
 * property reads, which can trigger getters.
 */
export function mayRunUserCode(node: t.Node): boolean {
  return t.traverseFast(node, child => {
    if (
      isSideEffect(child) ||
      t.isMemberExpression(child) ||
      t.isOptionalMemberExpression(child)
    ) {
      return t.traverseFast.stop;
    }
  });
}

/**
 * Whether evaluating the reference of an assignment target (but not
 * writing to it) can run user code.
 */
export function targetReferenceMayRunUserCode(
  target: t.MemberExpression,
): boolean {
  return (
    mayRunUserCode(target.object) ||
    (target.computed && mayRunUserCode(target.property))
  );
}

/**
 * Whether an element of an array literal is unaffected by user code running
 * between the evaluation of the literal and the moment it is read: literals,
 * constant identifiers, and functions (which capture bindings by reference).
 */
export function isSafeArrayLiteralElement(
  element: t.ArrayExpression["elements"][number],
  scope: Scope,
): boolean {
  if (element === null) return true;
  if (isStableExpression(element, scope) || t.isFunction(element)) return true;
  if (t.isArrayExpression(element)) {
    return element.elements.every(el => isSafeArrayLiteralElement(el, scope));
  }
  if (t.isObjectExpression(element)) {
    return element.properties.every(
      prop =>
        t.isObjectProperty(prop) &&
        !prop.computed &&
        isSafeArrayLiteralElement(prop.value as t.Expression, scope),
    );
  }
  return false;
}

/**
 * Whether evaluating the reference `target.x` / `target[key]` can be
 * observed or affected by the code evaluated around it.
 */
export function isStableMemberTarget(
  target: t.MemberExpression,
  scope: Scope,
): boolean {
  const { object, property, computed } = target;
  if (!isStableExpression(object, scope) && !t.isSuper(object)) return false;
  return !computed || isStableExpression(property, scope);
}

/**
 * Whether the pattern contains an assignment target whose evaluation is not
 * stable (see `isStableMemberTarget`). Only meaningful in assignment mode.
 */
export function containsUnstableMemberTarget(
  target: PatternTarget,
  scope: Scope,
): boolean {
  return someTarget(
    target,
    node => t.isMemberExpression(node) && !isStableMemberTarget(node, scope),
  );
}

/**
 * https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 */
function mayBeNameKey(key: t.Node, computed: boolean): boolean {
  if (!computed) {
    return (
      t.isIdentifier(key, { name: "name" }) ||
      t.isStringLiteral(key, { value: "name" })
    );
  }
  const value = t.isTemplateLiteral(key)
    ? key.expressions.length === 0
      ? (key.quasis[0].value.cooked ?? null)
      : null
    : getLiteralKeyString(key);
  // We can't know the value of other computed keys
  return value === null || value === "name";
}

export function isAnonymousFunctionDefinition(node: t.Node): boolean {
  if (t.isArrowFunctionExpression(node)) return true;
  if (t.isFunctionExpression(node)) return !node.id;
  if (t.isClassExpression(node)) {
    if (node.id) return false;
    // A class with an own static "name" member keeps it.
    return !node.body.body.some(
      element =>
        (t.isClassProperty(element) ||
          t.isClassMethod(element) ||
          t.isClassAccessorProperty(element)) &&
        element.static &&
        mayBeNameKey(element.key, element.computed),
    );
  }
  return false;
}

/**
 * Whether the value of the expression at `path` is observable. Used to
 * decide if a destructuring assignment must preserve its completion value.
 */
export function isValueUsed(path: NodePath<t.Expression>): boolean {
  let current: NodePath = path;
  for (;;) {
    const parentPath: NodePath = current.parentPath;
    if (parentPath.isSequenceExpression()) {
      if (current.key !== parentPath.node.expressions.length - 1) return false;
      current = parentPath;
      continue;
    }
    if (parentPath.isExpressionStatement()) {
      return current.isCompletionRecord();
    }
    if (
      parentPath.isForStatement() &&
      (current.key === "init" || current.key === "update")
    ) {
      return false;
    }
    return true;
  }
}

export function unshiftForXStatementBody(
  statementPath: NodePath<t.ForXStatement>,
  newStatements: t.Statement[],
) {
  statementPath.ensureBlock();
  const { scope, node } = statementPath;
  const bodyScopeBindings = statementPath.get("body").scope.bindings;
  const hasShadowedBlockScopedBindings = Object.keys(bodyScopeBindings).some(
    name => scope.hasBinding(name),
  );

  if (hasShadowedBlockScopedBindings) {
    // handle shadowed variables referenced in computed keys:
    // var a = 0;for (const { #x: x, [a++]: y } of z) { const a = 1; }
    node.body = t.blockStatement([...newStatements, node.body]);
  } else {
    (node.body as t.BlockStatement).body.unshift(...newStatements);
  }
}

export interface ExcludedKey {
  key: t.Expression | t.PrivateName;
  computed: boolean;
  /**
   * The key is known to evaluate to a primitive property key, so it does
   * not need to be converted with `toPropertyKey`.
   */
  primitive?: boolean;
}

export function isPrimitiveKeyExpression(key: t.Node): boolean {
  return (
    (t.isMemberExpression(key, { computed: false }) &&
      t.isIdentifier(key.object, { name: "Symbol" })) ||
    (t.isCallExpression(key) && t.matchesPattern(key.callee, "Symbol.for"))
  );
}

function getLiteralKeyString(key: t.Node): string | null {
  switch (key.type) {
    case "StringLiteral":
      return key.value;
    case "NumericLiteral":
    case "BigIntLiteral":
    case "BooleanLiteral":
      return String(key.value);
    case "NullLiteral":
      return "null";
    default:
      return null;
  }
}

/** `Object.assign`, or the `extends` helper. */
export function getExtendsHelper(
  useBuiltIns: boolean,
  addHelper: File["addHelper"],
): t.Expression {
  return useBuiltIns
    ? t.memberExpression(t.identifier("Object"), t.identifier("assign"))
    : addHelper("extends");
}

/**
 * Build `objectWithoutProperties(objRef, [...excludedKeys])`, or
 * `extends({}, (objectDestructuringEmpty(objRef), objRef))` when there is
 * no key to exclude.
 */
export function buildObjectExcludingKeys(
  excludedKeys: ExcludedKey[],
  objRef: t.Expression | (() => t.Expression),
  scope: Scope,
  addHelper: File["addHelper"],
  objectRestNoSymbols: boolean,
  useBuiltIns: boolean,
): t.CallExpression {
  // `objRef` may be needed more than once: either clone it, or ask the
  // caller for a new node each time.
  let getObjRef: () => t.Expression;
  if (typeof objRef === "function") {
    getObjRef = objRef;
  } else {
    let first = true;
    getObjRef = () => {
      if (first) {
        first = false;
        return objRef;
      }
      return t.cloneNode(objRef);
    };
  }

  const keys: t.Expression[] = [];
  const seen = new Set<string>();
  let allLiteral = true;
  let allPrimitive = true;
  let hasTemplateLiteral = false;
  for (const prop of excludedKeys) {
    const { key } = prop;
    if (t.isPrivateName(key)) {
      // private keys are not enumerable
      continue;
    }
    if (t.isIdentifier(key) && !prop.computed) {
      if (seen.has(key.name)) continue;
      seen.add(key.name);
      keys.push(t.stringLiteral(key.name));
    } else if (t.isTemplateLiteral(key)) {
      keys.push(t.cloneNode(key));
      hasTemplateLiteral = true;
    } else {
      const literal = getLiteralKeyString(key);
      if (literal !== null) {
        if (seen.has(literal)) continue;
        seen.add(literal);
        keys.push(t.stringLiteral(literal));
      } else {
        keys.push(t.cloneNode(key));
        allLiteral = false;
        if (!prop.primitive) allPrimitive = false;
      }
    }
  }

  if (keys.length === 0) {
    return t.callExpression(getExtendsHelper(useBuiltIns, addHelper), [
      t.objectExpression([]),
      t.sequenceExpression([
        t.callExpression(addHelper("objectDestructuringEmpty"), [getObjRef()]),
        getObjRef(),
      ]),
    ]);
  }

  let keyExpression: t.Expression = t.arrayExpression(keys);

  if (!allPrimitive) {
    keyExpression = t.callExpression(
      t.memberExpression(keyExpression, t.identifier("map")),
      [addHelper("toPropertyKey")],
    );
  } else if (allLiteral && !hasTemplateLiteral && !t.isProgram(scope.block)) {
    // Hoist definition of excluded keys, so that it's not created each time.
    const programScope = scope.getProgramParent();
    const id = programScope.generateUidIdentifier("excluded");

    programScope.push({
      id,
      init: keyExpression,
      kind: "const",
    });

    keyExpression = t.cloneNode(id);
  }

  return t.callExpression(
    addHelper(`objectWithoutProperties${objectRestNoSymbols ? "Loose" : ""}`),
    [getObjRef(), keyExpression],
  );
}

/**
 * Rewrite an array pattern in place so that it no longer contains anything
 * that needs to be lowered. Starting from the first element that needs
 * lowering, every element is replaced with a fresh identifier and reported
 * through `hoist`, so that the elements can be destructured later in order:
 * later elements may depend on bindings created by earlier ones.
 *
 *   [a, [{ ...b }], c = b]  ->  [a, _ref, _ref2]
 */
export function splitArrayPattern(
  pattern: t.ArrayPattern,
  features: number,
  scope: Scope,
  hoist: (target: t.LVal | t.PatternLike, id: t.Identifier) => void,
) {
  const { elements } = pattern;
  let split = false;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    // Holes and `void` don't bind anything: keep them in the pattern,
    // `void = _ref` would be invalid.
    if (!element || element.type === "VoidPattern") continue;
    if (!split) {
      if (!needsLowering(element, features)) continue;
      split = true;
    }
    const id = scope.generateUidIdentifier("ref");
    if (element.type === "RestElement") {
      hoist(element.argument, id);
      element.argument = t.cloneNode(id);
    } else {
      hoist(element, id);
      elements[i] = t.cloneNode(id);
    }
  }
}
