import { types as t } from "@babel/core";
import type { File, NodePath, Scope } from "@babel/core";
import {
  isDefaultEvaluationObservable,
  isPatternEvaluationObservable,
} from "@babel/plugin-transform-parameters";
import { FEATURES } from "./features.ts";
import { forgetScopeInfo } from "./scope.ts";

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
      return target.properties.some(
        prop =>
          isLoweredProperty(prop, features) ||
          (prop.type === "ObjectProperty" &&
            needsLowering(prop.value as PatternTarget, features)),
      );
    case "ArrayPattern":
      if (features & FEATURES.destructuring) return true;
      return target.elements.some(element => needsLowering(element, features));
    case "AssignmentPattern":
      return needsLowering(target.left, features);
    case "RestElement":
      return needsLowering(target.argument, features);
    default:
      return false;
  }
}

/**
 * Whether a property of an object pattern is lowered itself, as a rest
 * element or a private key.
 */
function isLoweredProperty(
  prop: t.ObjectProperty | t.RestElement,
  features: number,
): boolean {
  return prop.type === "RestElement"
    ? !!(features & FEATURES.objectRest)
    : prop.key.type === "PrivateName" &&
        !!(features & FEATURES.privateDestructuring);
}

/** Whether a property of an object pattern must be lowered. */
export function propertyNeedsLowering(
  prop: t.ObjectProperty,
  features: number,
): boolean {
  return (
    isLoweredProperty(prop, features) ||
    needsLowering(prop.value as PatternTarget, features)
  );
}

/**
 * In partial lowering, the values of an object pattern that need to be
 * lowered, when the pattern itself can stay native with those values replaced
 * by temporaries: null when one of its own properties is lowered.
 */
export function getLoweredValues(
  pattern: t.ObjectPattern,
  features: number,
): t.ObjectProperty[] | null {
  if (features & FEATURES.destructuring) return null;
  const lowered: t.ObjectProperty[] = [];
  for (const prop of pattern.properties) {
    if (isLoweredProperty(prop, features)) return null;
    if (
      prop.type === "ObjectProperty" &&
      needsLowering(prop.value as PatternTarget, features)
    ) {
      lowered.push(prop);
    }
  }
  return lowered;
}

/** Whether one of the assignment targets of the pattern is a member expression. */
export function hasMemberTarget(target: PatternTarget): boolean {
  if (!target) return false;
  switch (target.type) {
    case "ObjectPattern":
      return target.properties.some(prop =>
        hasMemberTarget(
          prop.type === "RestElement" ? prop : (prop.value as PatternTarget),
        ),
      );
    case "ArrayPattern":
      return target.elements.some(hasMemberTarget);
    case "AssignmentPattern":
      return hasMemberTarget(target.left);
    case "RestElement":
      return hasMemberTarget(target.argument);
    default:
      return t.isMemberExpression(target);
  }
}

export function hasPrivateClassElement(node: t.ClassBody): boolean {
  return node.body.some(
    element => "key" in element && t.isPrivateName(element.key),
  );
}

/** Whether the last property or element of the pattern is a rest element. */
export function hasRestElement(
  pattern: t.ObjectPattern | t.ArrayPattern,
): boolean {
  const list =
    pattern.type === "ObjectPattern" ? pattern.properties : pattern.elements;
  return list.length > 0 && list[list.length - 1]?.type === "RestElement";
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
 * Whether evaluating a value (or an array hole) can be delayed or omitted
 * without observable effects or errors.
 */
export function isSafeToEvaluate(node: t.Node | null, scope: Scope): boolean {
  return node === null || !isDefaultEvaluationObservable(node, scope);
}

/**
 * https://tc39.es/ecma262/#sec-isanonymousfunctiondefinition
 */
export function isAnonymousFunctionDefinition(node: t.Node): boolean {
  if (t.isParenthesizedExpression(node)) {
    return isAnonymousFunctionDefinition(node.expression);
  }
  if (t.isArrowFunctionExpression(node)) return true;
  if (t.isFunctionExpression(node) || t.isClassExpression(node)) {
    return !node.id;
  }
  return false;
}

/**
 * The completion of a statement list, as far as it is statically known:
 * "empty" when every statement completes empty, "value" when a statement
 * produces a value (`if`, loops or `try` complete with `undefined` at least)
 * before the list is exited by a `break` or `continue` ("abrupt"), which
 * complete empty as well.
 */
type ListCompletion = "empty" | "abrupt" | "value";

function getListCompletion(statements: t.Node[], start = 0): ListCompletion {
  for (let i = start; i < statements.length; i++) {
    const completion = getStatementCompletion(statements[i]);
    if (completion !== "empty") return completion;
  }
  return "empty";
}

function getStatementCompletion(node: t.Node): ListCompletion {
  switch (node.type) {
    case "EmptyStatement":
    case "DebuggerStatement":
    case "VariableDeclaration":
    case "FunctionDeclaration":
    case "ClassDeclaration":
      return "empty";
    case "BreakStatement":
    case "ContinueStatement":
      return "abrupt";
    case "BlockStatement":
      return getListCompletion(node.body);
    case "SwitchCase":
      return getListCompletion(node.consequent);
    case "LabeledStatement":
      return getStatementCompletion(node.body);
    default:
      return "value";
  }
}

/**
 * Whether the statements of a list, from `start`, keep the completion value
 * of the previous statements: they complete empty, or exit the list with a
 * `break` or `continue` carrying it.
 */
export function keepsCompletionValue(statements: t.Node[], start = 0): boolean {
  return getListCompletion(statements, start) !== "value";
}

/**
 * Whether the completion value of a statement can be observed: it is the
 * completion value of a script (e.g. with `eval`) or of a `do` expression,
 * kept by the following statements.
 */
export function isCompletionObservable(path: NodePath): boolean {
  for (let current = path; ; current = current.parentPath) {
    const { container, key, parentPath } = current;
    if (
      Array.isArray(container) &&
      !keepsCompletionValue(container, (key as number) + 1)
    ) {
      return false;
    }
    if (parentPath.isProgram()) {
      return parentPath.node.sourceType !== "module";
    }
    if (parentPath.isDoExpression()) return true;
    if (parentPath.isFunction() || parentPath.isStaticBlock()) return false;
  }
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
      return isCompletionObservable(parentPath);
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

/**
 * Insert the statements destructuring a pattern at the start of the block
 * body of `path`. When the body declares a name they reference (one of
 * `bodyNames`), its declarations must not shadow it for them: the body is
 * nested in a new block instead, after them.
 */
function unshiftBody(
  path: NodePath<t.ForXStatement | t.CatchClause>,
  statements: t.Statement[],
  bodyNames: string[],
) {
  const { node } = path;
  const body = node.body as t.BlockStatement;
  if (referencesName(statements, new Set(bodyNames))) {
    // The nodes of the body get new paths, registered by the caller's crawl
    forgetScopeInfo(path.get("body"));
    node.body = t.blockStatement([...statements, body]);
  } else {
    body.body.unshift(...statements);
  }
}

/**
 *   for (const { a = b } of z) { let b; }
 *   ->  for (const _ref of z) { const { a = b } = _ref; { let b; } }
 */
export function unshiftForXStatementBody(
  statementPath: NodePath<t.ForXStatement>,
  newStatements: t.Statement[],
) {
  statementPath.ensureBlock();
  unshiftBody(
    statementPath,
    newStatements,
    Object.keys(statementPath.get("body").scope.bindings),
  );
}

/**
 * The body of a catch clause shares its scope: its own declarations are the
 * bindings that are not the parameter's (called before the parameter is
 * replaced).
 *   catch ({ a = b }) { let b; }  ->  catch (_ref) { let { a = b } = _ref; { let b; } }
 */
export function unshiftCatchClauseBody(
  path: NodePath<t.CatchClause>,
  statements: t.Statement[],
) {
  const paramNames = t.getBindingIdentifiers(path.node.param!);
  unshiftBody(
    path,
    statements,
    Object.keys(path.scope.bindings).filter(name => !paramNames[name]),
  );
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
function isPrimitiveExpression(key: t.Node): boolean {
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

  const helperName = objectRestNoSymbols
    ? "objectWithoutPropertiesLoose"
    : "objectWithoutProperties";

  const keys: t.Expression[] = [];
  const seen = new Set<string>();
  // Whether the keys can be hoisted to the program, as an array of literals
  let allLiteral = true;
  let allPrimitive = true;
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
      allLiteral = false;
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
    return t.callExpression(addHelper(helperName), [
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
    ]);
  }

  let keyExpression: t.Expression = t.arrayExpression(keys);

  if (!allPrimitive) {
    keyExpression = t.callExpression(
      t.memberExpression(keyExpression, t.identifier("map")),
      [addHelper("toPropertyKey")],
    );
  } else if (allLiteral && !t.isProgram(scope.block)) {
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

  return t.callExpression(addHelper(helperName), [getObjRef(), keyExpression]);
}

/**
 * In partial lowering, replace the elements of an array pattern that need to
 * be lowered with temporaries, `hoist`ed to be destructured after the
 * pattern; the first one keeps its object pattern when only nested values
 * are lowered (hoistNestedValues). The following elements stay in the native
 * pattern, which keeps iterating nested patterns before the iterator is
 * closed, unless they read a name bound by a hoisted element (e.g. in a
 * default value), only initialized afterwards, or run user code, which must
 * stay after the reads of the hoisted elements.
 */
export function splitArrayPattern(
  pattern: t.ArrayPattern,
  features: number,
  scope: Scope,
  hoist: Hoist,
) {
  const { elements } = pattern;
  const hoistedNames = new Set<string>();
  let split = false;
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    // Elisions and `void` don't bind anything: keep them in the pattern,
    // `void = _ref` would be invalid.
    if (!element || element.type === "VoidPattern") continue;
    if (!needsLowering(element, features)) {
      if (
        !split ||
        (!referencesName(element, hoistedNames) &&
          // Nested array patterns stay native: see above
          !isPatternEvaluationObservable(element, scope, true))
      ) {
        continue;
      }
    }
    const first = !split;
    split = true;
    for (const name of Object.keys(t.getBindingIdentifiers(element))) {
      hoistedNames.add(name);
    }
    if (element.type === "RestElement") {
      element.argument = replaceWithTemporary(element.argument, scope, hoist);
    } else if (!first || !hoistNestedValues(element, features, scope, hoist)) {
      elements[i] = replaceWithTemporary(element, scope, hoist);
    }
  }
}

type Hoist = (target: t.LVal | t.PatternLike, id: t.Identifier) => void;

/** Replace `target` with a temporary, `hoist`ed to be destructured later. */
function replaceWithTemporary(
  target: t.LVal | t.PatternLike,
  scope: Scope,
  hoist: Hoist,
): t.Identifier {
  const id = scope.generateUidIdentifier("ref");
  hoist(target, id);
  return t.cloneNode(id);
}

/**
 * Keep the first lowered element of an array pattern native when only some
 * of its nested values need to be lowered, replacing those with temporaries
 * to be `hoist`ed: `[k, { a: { ...r } }]` becomes `[k, { a: _ref }]`, and `a`
 * is still read while iterating. Returns false when the element must be
 * hoisted as a whole: one of its own properties is lowered, or its other
 * keys, defaults and targets read a binding of the hoisted values.
 */
function hoistNestedValues(
  element: t.Node,
  features: number,
  scope: Scope,
  hoist: Hoist,
): boolean {
  const pattern = element.type === "AssignmentPattern" ? element.left : element;
  const lowered =
    pattern.type === "ObjectPattern" && getLoweredValues(pattern, features);
  if (!lowered) return false;
  const loweredSet = new Set<t.Node>(lowered);
  const names = new Set(
    lowered.flatMap(prop => Object.keys(t.getBindingIdentifiers(prop.value))),
  );
  for (const prop of pattern.properties) {
    const native: t.Node[] = [];
    if (prop.type === "RestElement") native.push(prop);
    else {
      if (prop.computed) native.push(prop.key);
      if (!loweredSet.has(prop)) native.push(prop.value);
    }
    if (referencesName(native, names)) return false;
  }
  // Only the first value keeps its own pattern native: the following ones
  // would be read before it is destructured.
  lowered.forEach((prop, i) => {
    if (i === 0 && hoistNestedValues(prop.value, features, scope, hoist)) {
      return;
    }
    prop.value = replaceWithTemporary(
      prop.value as t.PatternLike,
      scope,
      hoist,
    );
  });
  return true;
}
