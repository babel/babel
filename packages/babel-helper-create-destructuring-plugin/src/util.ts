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
      !scope.hasBinding("undefined", { noGlobals: true }))
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
 * Whether evaluating `node` can neither throw nor run user code: it is an
 * identifier referencing a binding that is initialized when `node` is
 * evaluated in `scope`. Lexical bindings must be declared before `node` in
 * the same function, so that they are not in their TDZ (outside of `switch`
 * statements, whose cases can skip declarations).
 */
export function isInitializedReference(node: t.Node, scope: Scope): boolean {
  if (!t.isIdentifier(node)) return false;
  const binding = scope.getBinding(node.name);
  if (!binding) return false;
  switch (binding.kind) {
    case "var":
    case "hoisted":
      return true;
    case "param": {
      // In their TDZ in the parameter list
      const fn = binding.scope.block as t.Function;
      return node.start != null && node.start >= fn.body.start!;
    }
    case "let":
    case "const": {
      const { end } = binding.path.node;
      return (
        end != null &&
        node.start != null &&
        end <= node.start &&
        binding.scope.getFunctionParent() === scope.getFunctionParent() &&
        !binding.scope.path.isSwitchStatement()
      );
    }
    default:
      return false;
  }
}

/**
 * Whether a computed key can be evaluated and coerced again later, with no
 * observable effects: `Symbol.for` always returns the same symbol for a
 * key (registered symbols), and well-known symbols are not writable.
 */
export function isStablePropertyKey(node: t.Node, scope: Scope): boolean {
  if (isPrimitiveExpression(node)) return isSafeToEvaluate(node, scope);
  if (isWellKnownSymbol(node, scope)) return true;
  return (
    isSymbolFor(node, scope) &&
    node.arguments.length === 1 &&
    isStablePropertyKey(node.arguments[0], scope)
  );
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
  if (t.isUnaryExpression(node)) {
    return (
      node.operator === "delete" ||
      (["+", "-", "~"].includes(node.operator) &&
        !isPrimitiveExpression(node.argument))
    );
  }
  if (t.isBinaryExpression(node)) {
    return (
      node.operator !== "===" &&
      node.operator !== "!==" &&
      (!isPrimitiveExpression(node.left) || !isPrimitiveExpression(node.right))
    );
  }
  if (t.isTemplateLiteral(node)) return node.expressions.length > 0;
  return SIDE_EFFECT_NODES.has(node.type);
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
 * Whether evaluating a value can be delayed or omitted without observable
 * effects or errors. Even constant identifiers can throw in their TDZ.
 */
export function isSafeToEvaluate(node: t.Node | null, scope: Scope): boolean {
  if (node === null) return true;
  if (t.isPureish(node)) return true;
  if (t.isIdentifier(node)) {
    return (
      ["undefined", "Infinity", "NaN"].includes(node.name) &&
      !scope.hasBinding(node.name, { noGlobals: true })
    );
  }
  if (t.isUnaryExpression(node)) {
    return (
      ["void", "typeof", "!"].includes(node.operator) &&
      isSafeToEvaluate(node.argument, scope)
    );
  }
  if (t.isTemplateLiteral(node)) {
    return node.expressions.every(
      expr => isPrimitiveExpression(expr) && isSafeToEvaluate(expr, scope),
    );
  }
  if (t.isArrayExpression(node)) {
    return node.elements.every(el => isSafeToEvaluate(el, scope));
  }
  if (t.isSequenceExpression(node)) {
    return node.expressions.every(el => isSafeToEvaluate(el, scope));
  }
  if (t.isObjectExpression(node)) {
    return node.properties.every(
      prop =>
        t.isObjectProperty(prop) &&
        !prop.computed &&
        isSafeToEvaluate(prop.value as t.Expression, scope),
    );
  }
  return false;
}

/**
 * https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 */
export function isAnonymousFunctionDefinition(node: t.Node): boolean {
  if (t.isParenthesizedExpression(node)) {
    return isAnonymousFunctionDefinition(node.expression);
  }
  if (t.isArrowFunctionExpression(node)) return true;
  if (t.isFunctionExpression(node)) return !node.id;
  if (t.isClassExpression(node)) {
    return !node.id;
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

const temporaries = new WeakMap<Scope, Set<string>>();

/**
 * Record a temporary variable created by the lowering, which user code never
 * assigns: it can be read again instead of being copied to another
 * temporary. Identifiers generated by `scope.rename` for user bindings are
 * not recorded, as user code may reassign them.
 */
export function markTemporary(scope: Scope, name: string) {
  const program = scope.getProgramParent();
  let names = temporaries.get(program);
  if (!names) temporaries.set(program, (names = new Set()));
  names.add(name);
}

export function isTemporary(scope: Scope, name: string): boolean {
  return !!temporaries.get(scope.getProgramParent())?.has(name);
}

/** Whether one of `nodes` contains an identifier with one of `names`. */
export function referencesName(
  nodes: t.Node | t.Node[],
  names: ReadonlySet<string>,
): boolean {
  if (names.size === 0) return false;
  for (const node of Array.isArray(nodes) ? nodes : [nodes]) {
    const found = t.traverseFast(node, child => {
      if (t.isIdentifier(child) && names.has(child.name)) {
        return t.traverseFast.stop;
      }
    });
    if (found) return true;
  }
  return false;
}

export function unshiftForXStatementBody(
  statementPath: NodePath<t.ForXStatement>,
  newStatements: t.Statement[],
) {
  statementPath.ensureBlock();
  const { scope, node } = statementPath;
  const bodyNames = Object.keys(statementPath.get("body").scope.bindings);
  const hasShadowedBlockScopedBindings =
    bodyNames.some(name => scope.hasBinding(name)) ||
    // e.g. globals, which have no binding
    referencesName(newStatements, new Set(bodyNames));

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

/** Whether evaluating an expression produces a primitive value. */
export function isPrimitiveExpression(key: t.Node): boolean {
  return (
    getLiteralKeyString(key) !== null ||
    t.isTemplateLiteral(key) ||
    t.isUnaryExpression(key) ||
    t.isBinaryExpression(key) ||
    t.isUpdateExpression(key)
  );
}

const wellKnownSymbols = new Set([
  "asyncDispose",
  "asyncIterator",
  "dispose",
  "hasInstance",
  "isConcatSpreadable",
  "iterator",
  "match",
  "matchAll",
  "replace",
  "search",
  "species",
  "split",
  "toPrimitive",
  "toStringTag",
  "unscopables",
]);

/** Whether an expression already produces a string or symbol property key. */
export function isPropertyKeyExpression(key: t.Node, scope: Scope): boolean {
  return (
    t.isStringLiteral(key) ||
    t.isTemplateLiteral(key) ||
    t.isUnaryExpression(key, { operator: "typeof" }) ||
    isWellKnownSymbol(key, scope) ||
    isSymbolFor(key, scope)
  );
}

/** `Symbol.iterator`, and the other well-known symbols */
function isWellKnownSymbol(key: t.Node, scope: Scope): boolean {
  return (
    t.isMemberExpression(key, { computed: false }) &&
    t.isIdentifier(key.object, { name: "Symbol" }) &&
    t.isIdentifier(key.property) &&
    wellKnownSymbols.has(key.property.name) &&
    !scope.hasBinding("Symbol", { noGlobals: true })
  );
}

/** `Symbol.for(...)` */
function isSymbolFor(key: t.Node, scope: Scope): key is t.CallExpression {
  return (
    t.isCallExpression(key) &&
    t.matchesPattern(key.callee, "Symbol.for") &&
    !scope.hasBinding("Symbol", { noGlobals: true })
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
 * Build `objectWithoutProperties(objRef, [...excludedKeys])`. Without excluded
 * keys, snapshot the source with Object.assign first, preserving its own-key,
 * descriptor and value trap order.
 */
export function buildObjectExcludingKeys(
  excludedKeys: ExcludedKey[],
  objRef: t.Expression | (() => t.Expression),
  scope: Scope,
  addHelper: File["addHelper"],
  objectRestNoSymbols: boolean,
  useBuiltIns: boolean = false,
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
    return t.callExpression(
      addHelper(
        objectRestNoSymbols
          ? "objectWithoutPropertiesLoose"
          : "objectWithoutProperties",
      ),
      [
        // The null prototype lets Object.assign create an own __proto__ data
        // property. The rest helper then copies these plain data properties
        // to an ordinary object without touching the original source again.
        t.callExpression(getExtendsHelper(useBuiltIns, addHelper), [
          t.callExpression(
            t.memberExpression(t.identifier("Object"), t.identifier("create")),
            [t.nullLiteral()],
          ),
          t.sequenceExpression([
            t.callExpression(addHelper("objectDestructuringEmpty"), [
              getObjRef(),
            ]),
            getObjRef(),
          ]),
        ]),
        t.arrayExpression([]),
      ],
    );
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
    // Elisions and `void` don't bind anything: keep them in the pattern,
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
