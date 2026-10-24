import { types as t, template } from "@babel/core";
import type { File, Scope } from "@babel/core";
import { FEATURES, type ResolvedOptions } from "./features.ts";
import { canUnpackArrayPattern } from "./array-unpacking.ts";
import {
  buildNamedDefault,
  preventNamedEvaluation,
} from "./named-evaluation.ts";
import {
  buildObjectExcludingKeys,
  hasArrayRest,
  hasObjectRest,
  isAnonymousFunctionDefinition,
  isObjectCoercible,
  isPrimitiveExpression,
  isPropertyKeyExpression,
  isPureVoid,
  isSafeToEvaluate,
  isStablePropertyKey,
  mayRunUserCode,
  needsLowering,
  propertyNeedsLowering,
  someTarget,
  splitArrayPattern,
  targetReferenceMayRunUserCode,
  type ExcludedKey,
  type PatternTarget,
} from "./util.ts";

export const enum StepKind {
  /** `id = init`, where `id` is a fresh, write-once temporary. */
  Temp,
  /** `target = init`, where `target` is a user binding or a native pattern. */
  Bind,
  /** An expression evaluated for its side effects only. */
  Effect,
}

interface TempStep {
  kind: StepKind.Temp;
  id: t.Identifier;
  init: t.Expression;
}
interface BindStep {
  kind: StepKind.Bind;
  target: t.LVal;
  init: t.Expression | null;
  /** The original declarator this binding comes from, for comments. */
  inherits?: t.VariableDeclarator;
}
interface EffectStep {
  kind: StepKind.Effect;
  expression: t.Expression;
}
export type Step = TempStep | BindStep | EffectStep;

function replaceInPlace(target: t.Node, source: t.Node) {
  for (const key of Object.keys(target)) {
    // @ts-expect-error dynamic key
    delete target[key];
  }
  Object.assign(target, source);
}

const enum Decision {
  None,
  Inline,
  Temp,
  Effect,
}

/**
 * A reference to a value that will be destructured. Every place that reads
 * the value calls `use()`, which returns a placeholder expression. Once the
 * whole pattern has been visited, the lowering decides whether the value must
 * be stored in a temporary variable (it is read more than once, or something
 * with side effects is evaluated between its evaluation and its only read)
 * or can be inlined, and patches the placeholders accordingly.
 */
class Ref {
  private readonly placeholders: { node: t.Identifier; index: number }[] = [];
  private decision = Decision.None;
  private staticUsed = false;

  tempId: t.Identifier | null = null;
  forceTemp = false;
  /**
   * The value is also used as a whole after being destructured (e.g. as the
   * completion value of an assignment): it is stored in a temporary, and an
   * array literal can't be unpacked.
   */
  retained = false;
  discarded = false;
  /**
   * Set when the value is read in the initializer of an assignment to this
   * member expression, which is evaluated before the initializer.
   */
  readAfter: t.MemberExpression | null = null;

  constructor(
    private readonly lowering: Lowering,
    readonly expr: t.Expression,
    /** The index in `lowering.steps` where the value must be evaluated. */
    private readonly insertAt: number,
    readonly isStatic: boolean,
    /** Whether the value is known to be an actual Array. */
    readonly isArray: boolean,
    /**
     * A node whose identifiers are used to name the temporary variable. It
     * is resolved lazily, so that it can refer to the temporaries of the
     * parent references.
     */
    private readonly nameHint: t.Node | (() => t.Node),
  ) {}

  /** The node to derive names from: the temporary id if there is one. */
  hint(): t.Node {
    if (this.tempId) return this.tempId;
    const { nameHint } = this;
    return typeof nameHint === "function" ? nameHint() : nameHint;
  }

  use(): t.Expression {
    if (this.isStatic && !this.forceTemp) {
      this.staticUsed = true;
      // Always clone: the original node might be shared with other places
      // of the AST (e.g. by @babel/plugin-transform-parameters).
      return t.cloneNode(this.expr);
    }
    // The name is assigned once we know that this will be a temporary.
    const node = t.identifier("_ref");
    this.placeholders.push({ node, index: this.lowering.steps.length });
    return node;
  }

  decide() {
    if (this.isStatic && !this.forceTemp) {
      if (
        !this.staticUsed &&
        !this.discarded &&
        !isSafeToEvaluate(this.expr, this.lowering.scope)
      ) {
        this.decision = Decision.Effect;
      }
      return;
    }
    const { placeholders } = this;
    if (placeholders.length === 0) {
      // The value might still need to be evaluated for its side effects.
      this.decision =
        this.discarded || isSafeToEvaluate(this.expr, this.lowering.scope)
          ? Decision.None
          : Decision.Effect;
    } else if (
      !this.forceTemp &&
      !this.retained &&
      placeholders.length === 1 &&
      placeholders[0].index === this.insertAt
    ) {
      // Nothing is evaluated between the value and its only read: inline it.
      this.decision = Decision.Inline;
    } else {
      this.decision = Decision.Temp;
    }
  }

  /**
   * Reading this value (e.g. `_ref.x`) after evaluating `readAfter` is
   * correct, but the values it is computed from must be evaluated before it:
   *   ({ x: obj[f()] } = g())  ->  var _g = g(); obj[f()] = _g.x;
   */
  hoistDependencies(refs: Ref[]) {
    const { readAfter } = this;
    if (!readAfter || this.decision !== Decision.Inline) return;
    const nodes = new Set<t.Node>();
    t.traverseFast(this.expr, node => {
      nodes.add(node);
    });
    const targetMayRunUserCode = targetReferenceMayRunUserCode(readAfter);
    const { scope } = this.lowering;
    for (const dep of refs) {
      if (
        dep.decision === Decision.Inline &&
        nodes.has(dep.placeholders[0].node) &&
        // Reordering is only observable if one of them can affect the other
        (targetMayRunUserCode || !isSafeToEvaluate(dep.expr, scope))
      ) {
        dep.decision = Decision.Temp;
      }
    }
  }

  assignName() {
    if (this.decision !== Decision.Temp) return;
    const { scope } = this.lowering;
    let id = scope.generateUidIdentifierBasedOnNode(this.hint());
    // e.g. `[][0]` only produces digits: fall back to a generic name
    if (/^_\d*$/.test(id.name)) id = scope.generateUidIdentifier("ref");
    this.tempId = id;
    for (const { node } of this.placeholders) node.name = id.name;
  }

  apply() {
    const { lowering, placeholders, insertAt } = this;
    switch (this.decision) {
      case Decision.Inline:
        replaceInPlace(placeholders[0].node, this.expr);
        break;
      case Decision.Temp:
        lowering.steps.splice(insertAt, 0, {
          kind: StepKind.Temp,
          id: this.tempId!,
          init: this.isStatic ? t.cloneNode(this.expr) : this.expr,
        });
        break;
      case Decision.Effect:
        lowering.steps.splice(insertAt, 0, {
          kind: StepKind.Effect,
          expression: this.isStatic ? t.cloneNode(this.expr) : this.expr,
        });
        break;
    }
  }
}

const enum PropertyPlan {
  /** The rest element */
  Rest,
  /** Kept in a native pattern (partial mode) */
  Native,
  /**
   * Not read: with `pureGetters`, a property excluded from the rest object
   * whose binding is never used
   */
  Skip,
  /** Read and destructured by the lowering */
  Lower,
}

export interface LoweringOptions {
  scope: Scope;
  options: ResolvedOptions;
  addHelper: File["addHelper"];
  /** Whether we are lowering a destructuring assignment (vs a declaration). */
  isAssignment: boolean;
}

export class Lowering {
  readonly steps: Step[] = [];
  /**
   * Identifiers that must be declared as uninitialized `var`s in the
   * enclosing function (they are assigned inline, in expression position).
   */
  readonly hoisted: t.Identifier[] = [];
  private readonly refs: Ref[] = [];

  readonly scope: Scope;
  readonly options: ResolvedOptions;
  readonly addHelper: File["addHelper"];
  readonly isAssignment: boolean;
  /** Whether every pattern is lowered (the `destructuring` feature). */
  readonly full: boolean;

  constructor({ scope, options, addHelper, isAssignment }: LoweringOptions) {
    this.scope = scope;
    this.options = options;
    this.addHelper = addHelper;
    this.isAssignment = isAssignment;
    this.full = !!(options.features & FEATURES.destructuring);
  }

  /**
   * Lower `target = value`. Returns the expression to use as the completion
   * value of the assignment, if requested.
   */
  lower(
    target: PatternTarget,
    value: t.Expression,
    needsCompletion: boolean = false,
  ): t.Expression | null {
    const ref = this.createRef(value);
    // The completion value is the original value: keep it in a temporary.
    // This also prevents unpacking array literals, whose elements would be
    // evaluated twice.
    if (needsCompletion) ref.retained = true;
    this.lowerTarget(target, ref);
    const completion = needsCompletion ? ref.use() : null;
    this.finalize();
    return completion;
  }

  /**
   * Lower a declarator of a variable declaration. Declarators that don't
   * need to be lowered are kept as they are.
   */
  lowerDeclarator(declarator: t.VariableDeclarator, isLast: boolean) {
    const { steps } = this;
    if (!needsLowering(declarator.id, this.options.features)) {
      steps.push({
        kind: StepKind.Bind,
        target: declarator.id as t.LVal,
        init: declarator.init ?? null,
        inherits: declarator,
      });
      return;
    }
    const start = steps.length;
    this.lower(declarator.id, declarator.init!);
    if (!isLast && steps.length > start) {
      // we aren't the last declarator so let's just make the
      // last transformed node inherit from us
      const last = steps[steps.length - 1];
      if (last.kind === StepKind.Bind) last.inherits = declarator;
    }
  }

  private finalize() {
    const { refs } = this;
    for (const ref of refs) ref.decide();
    for (const ref of refs) ref.hoistDependencies(refs);
    // Name the temporaries in source order, so that the generated names
    // follow the evaluation order.
    for (const ref of refs) ref.assignName();
    // Refs created later must be applied first, so that the indexes
    // recorded by the earlier ones stay valid.
    for (let i = refs.length - 1; i >= 0; i--) refs[i].apply();
    refs.length = 0;
  }

  private createRef(
    expr: t.Expression,
    {
      isStatic = this.scope.isStatic(expr) ||
        // Our own temporaries are never reassigned by user code.
        (t.isIdentifier(expr) && this.scope.hasUid(expr.name)),
      isArray = false,
      nameHint = expr,
    }: {
      isStatic?: boolean;
      isArray?: boolean;
      nameHint?: t.Node | (() => t.Node);
    } = {},
  ) {
    const ref = new Ref(
      this,
      preventNamedEvaluation(expr),
      this.steps.length,
      isStatic,
      isArray,
      nameHint,
    );
    this.refs.push(ref);
    return ref;
  }

  private temp(init: t.Expression, nameHint: t.Node = init): t.Identifier {
    const id = this.scope.generateUidIdentifierBasedOnNode(nameHint);
    this.steps.push({
      kind: StepKind.Temp,
      id,
      init: preventNamedEvaluation(init),
    });
    return id;
  }

  private bind(target: t.LVal, init: t.Expression) {
    this.steps.push({ kind: StepKind.Bind, target, init });
  }

  /**
   * Member references must be evaluated before reading their assigned value:
   * even a constant base can throw if it is null or undefined.
   */
  private isMemberTarget(target: t.Node): target is t.MemberExpression {
    return this.isAssignment && t.isMemberExpression(target);
  }

  /** `target = <expression reading ref>` */
  private bindRef(target: t.LVal, ref: Ref, init?: t.Expression) {
    if (this.isMemberTarget(target)) ref.readAfter = target;
    this.bind(target, init ?? ref.use());
  }

  private effect(expression: t.Expression) {
    this.steps.push({ kind: StepKind.Effect, expression });
  }

  private lowerTarget(target: PatternTarget, ref: Ref) {
    if (
      this.isAssignment &&
      (t.isObjectPattern(target) || t.isArrayPattern(target)) &&
      someTarget(target, node => t.isMemberExpression(node))
    ) {
      // The whole value is read before evaluating any nested target,
      // including targets that can throw without running user code.
      ref.forceTemp = true;
    }
    if (
      !this.full &&
      target!.type !== "AssignmentPattern" &&
      !needsLowering(target, this.options.features)
    ) {
      this.bindRef(target as t.LVal, ref);
      return;
    }
    switch (target!.type) {
      case "ObjectPattern":
        this.lowerObjectPattern(target, ref);
        break;
      case "ArrayPattern":
        this.lowerArrayPattern(target, ref);
        break;
      case "AssignmentPattern":
        this.lowerDefault(target.left, target.right, ref);
        break;
      case "VoidPattern":
        // Nothing is bound, but the value (e.g. an element of an unpacked
        // array literal) is still evaluated for its side effects.
        break;
      default:
        this.bindRef(target as t.LVal, ref);
    }
  }

  private lowerDefault(left: t.LVal, right: t.Expression, ref: Ref) {
    // handle array init with void 0. This also happens when
    // the value was originally a hole.
    // const [x = 42] = [void 0,];
    // -> const x = 42;
    if (isPureVoid(ref.expr, this.scope)) {
      ref.discarded = true;
      if (t.isIdentifier(left) && isAnonymousFunctionDefinition(right)) {
        this.bind(left, right);
      } else {
        this.lowerTarget(left, this.createRef(right));
      }
      return;
    }

    const defaultValue = buildNamedDefault(left, right, this.addHelper);

    const { scope } = this;
    if (this.isMemberTarget(left)) {
      // The target reference must be evaluated before reading the value:
      //   target.x = (_tmp = ref.x) === void 0 ? right : _tmp
      const tmp = scope.generateUidIdentifierBasedOnNode(ref.hint());
      this.hoisted.push(tmp);
      this.bindRef(
        left,
        ref,
        t.conditionalExpression(
          t.binaryExpression(
            "===",
            t.assignmentExpression("=", t.cloneNode(tmp), ref.use()),
            t.buildUndefinedNode(),
          ),
          defaultValue,
          t.cloneNode(tmp),
        ),
      );
      return;
    }

    // The value is read twice, so it is stored in a temporary
    const conditional = t.conditionalExpression(
      t.binaryExpression("===", ref.use(), t.buildUndefinedNode()),
      defaultValue,
      ref.use(),
    );

    if (t.isPattern(left)) {
      const patternRef = this.createRef(conditional, {
        isStatic: false,
        nameHint: () => ref.hint(),
      });
      patternRef.forceTemp = true;
      this.lowerTarget(left, patternRef);
    } else {
      this.bind(left, conditional);
    }
  }

  private planProperties(
    properties: t.ObjectPattern["properties"],
    hasRest: boolean,
  ): PropertyPlan[] {
    const { scope, full, isAssignment } = this;
    const { features, pureGetters } = this.options;
    return properties.map(prop => {
      if (prop.type === "RestElement") return PropertyPlan.Rest;
      if (
        pureGetters &&
        hasRest &&
        !isAssignment &&
        t.isIdentifier(prop.value)
      ) {
        const binding = scope.getBinding(prop.value.name);
        if (
          binding &&
          !binding.referenced &&
          // Its declaration is removed: it must not be assigned elsewhere
          binding.constantViolations.length === 0
        ) {
          return PropertyPlan.Skip;
        }
      }
      return full || propertyNeedsLowering(prop, features)
        ? PropertyPlan.Lower
        : PropertyPlan.Native;
    });
  }

  /**
   * https://tc39.es/ecma262/#sec-runtime-semantics-bindinginitialization
   * RequireObjectCoercible(value) must happen before any property name is
   * evaluated. Accessing a property of null/undefined throws anyway, so we
   * only need an explicit check when nothing is accessed or when a computed
   * key that can run user code is evaluated before the first access.
   */
  private needsCoercibleCheck(
    properties: t.ObjectPattern["properties"],
    plans: PropertyPlan[],
    ref: Ref,
  ): boolean {
    if (isObjectCoercible(ref.expr)) return false;
    // Whether a key will be passed to the object rest helper, which then
    // returns `{}` for null/undefined instead of throwing.
    let hasExcludedKey = false;
    for (let i = 0; i < properties.length; i++) {
      const plan = plans[i];
      if (plan === PropertyPlan.Rest) return hasExcludedKey;
      // The native pattern performs the check
      if (plan === PropertyPlan.Native) return false;
      const prop = properties[i] as t.ObjectProperty;
      // private keys are not enumerable, so they are never excluded
      if (prop.key.type !== "PrivateName") hasExcludedKey = true;
      if (
        prop.computed &&
        (!isPrimitiveExpression(prop.key) ||
          !isSafeToEvaluate(prop.key, this.scope))
      ) {
        return true;
      }
      // Skipped and `void` properties are not read
      if (plan === PropertyPlan.Lower && prop.value.type !== "VoidPattern") {
        return false;
      }
    }
    return true;
  }

  private lowerObjectPattern(pattern: t.ObjectPattern, ref: Ref) {
    const { properties } = pattern;
    const { scope, full } = this;

    // The pattern is only lowered when it needs to be (see `lowerTarget`): if
    // there is a rest element, either it or a property before it has to be
    // lowered, and then the rest element must be lowered too.
    const hasRest = hasObjectRest(pattern);
    const plans = this.planProperties(properties, hasRest);

    if (this.needsCoercibleCheck(properties, plans, ref)) {
      if (full) {
        this.effect(
          t.callExpression(this.addHelper("objectDestructuringEmpty"), [
            ref.use(),
          ]),
        );
      } else {
        // An empty native pattern performs the check
        this.bind(t.objectPattern([]), ref.use());
      }
    }

    const excluded: ExcludedKey[] = [];
    const exclude = (
      key: ExcludedKey["key"],
      computed: boolean,
      primitive = isPropertyKeyExpression(key, scope),
    ) => {
      excluded.push({
        key,
        computed,
        primitive,
      });
    };

    // In partial mode, consecutive properties that don't need to be lowered
    // are kept together in a native pattern.
    let chunk: (t.ObjectProperty | t.RestElement)[] = [];
    const flush = () => {
      if (chunk.length === 0) return;
      this.bind(t.objectPattern(chunk), ref.use());
      chunk = [];
    };

    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      if (prop.type === "RestElement") {
        flush();
        this.lowerTarget(
          prop.argument,
          this.createRef(
            buildObjectExcludingKeys(
              excluded,
              () => ref.use(),
              scope,
              this.addHelper,
              this.options.objectRestNoSymbols,
              this.options.useBuiltIns,
            ),
            { isStatic: false, nameHint: prop.argument },
          ),
        );
        continue;
      }

      const { key, computed, value } = prop;
      const isVoid = value.type === "VoidPattern";

      if (plans[i] === PropertyPlan.Skip) {
        // Its key must still be evaluated and excluded from the rest object.
        if (computed && !isStablePropertyKey(key, scope)) {
          flush();
          exclude(this.temp(this.toPropertyKey(key)), true, true);
        } else {
          exclude(key, computed);
        }
        continue;
      }

      if (plans[i] === PropertyPlan.Native) {
        let nativeProp = prop;
        if (hasRest && computed && !isStablePropertyKey(key, scope)) {
          // Memoise the key inline so that it can be excluded from the rest
          // object while preserving the evaluation order:
          //   { [_key = f()]: x, ...rest }
          const id = scope.generateUidIdentifierBasedOnNode(key);
          this.hoisted.push(id);
          nativeProp = {
            ...prop,
            key: t.assignmentExpression(
              "=",
              t.cloneNode(id),
              this.toPropertyKey(key),
            ),
          };
          exclude(id, true, true);
        } else {
          exclude(key, computed);
        }
        chunk.push(nativeProp);
        continue;
      }

      flush();

      let keyExpr: t.Expression | t.PrivateName = key;
      let keyComputed = computed;
      if (computed) {
        const target = value.type === "AssignmentPattern" ? value.left : value;
        const primitive = isPrimitiveExpression(key);
        const needsTemp =
          !isStablePropertyKey(key, scope) &&
          (hasRest ||
            // The target reference must be evaluated after the property name
            (this.isMemberTarget(target) &&
              (!primitive ||
                mayRunUserCode(key) ||
                targetReferenceMayRunUserCode(target))));
        if (needsTemp) {
          keyExpr = this.temp(this.toPropertyKey(key));
        }
        exclude(
          keyExpr,
          true,
          needsTemp || isPropertyKeyExpression(key, scope),
        );
      } else if (key.type === "Identifier" || key.type === "PrivateName") {
        exclude(key, false);
      } else {
        // { 0: x } is accessed as ref[0]
        keyComputed = true;
        exclude(key, true);
      }

      // https://tc39.es/proposal-discard-binding/: `void` does not read the property
      if (isVoid) {
        // Its key must still be evaluated and coerced unless a temporary
        // already did so, or both operations are unobservable.
        if (computed && keyExpr === key && !isStablePropertyKey(key, scope)) {
          this.effect(this.toPropertyKey(key));
        }
        continue;
      }

      const keyNode = keyExpr === key ? key : t.cloneNode(keyExpr);
      const propRef = this.createRef(
        t.memberExpression(ref.use(), keyNode, keyComputed),
        {
          isStatic: false,
          nameHint: () =>
            t.memberExpression(
              ref.hint() as t.Expression,
              t.cloneNode(keyNode),
              keyComputed,
            ),
        },
      );
      this.lowerTarget(value as PatternTarget, propRef);
    }
    flush();
  }

  private toPropertyKey(key: t.Expression): t.Expression {
    return isPropertyKeyExpression(key, this.scope)
      ? key
      : t.callExpression(this.addHelper("toPropertyKey"), [key]);
  }

  private lowerArrayPattern(pattern: t.ArrayPattern, ref: Ref) {
    if (!this.full) {
      this.lowerArrayPatternPartial(pattern, ref);
      return;
    }

    const { elements } = pattern;

    // optimise basic array destructuring of an array expression
    //
    // we can't do this to a pattern of unequal size to it's right hand
    // array expression as then there will be values that won't be evaluated
    //
    // eg: let [a, b] = [1, 2];
    if (
      t.isArrayExpression(ref.expr) &&
      // the array itself is used as the completion value
      !ref.retained &&
      canUnpackArrayPattern(pattern, ref.expr, this.scope)
    ) {
      ref.discarded = true;
      const holeToUndefined = (el: t.ArrayExpression["elements"][number]) =>
        (el as t.Expression | null) ?? t.buildUndefinedNode();
      const values = ref.expr.elements.map(element =>
        isSafeToEvaluate(element, this.scope)
          ? element
          : this.temp(element as t.Expression),
      );
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]!;
        if (element.type === "RestElement") {
          this.lowerTarget(
            element.argument,
            this.createRef(
              t.arrayExpression(values.slice(i).map(holeToUndefined)),
              { isArray: true },
            ),
          );
        } else {
          this.lowerTarget(element, this.createRef(holeToUndefined(values[i])));
        }
      }
      return;
    }

    // if we have a rest then we need all the elements so don't tell
    // `toArray` to only get a certain amount
    const count = hasArrayRest(pattern) ? null : elements.length;
    const arr = this.toArray(ref, count);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      // hole, or `void`: the iterator is advanced but nothing is bound
      if (!element || element.type === "VoidPattern") continue;

      if (element.type === "RestElement") {
        // `arr` may be an array-like or an Array subclass (whose `slice`
        // would create another subclass instance): copy it first.
        this.lowerTarget(
          element.argument,
          this.createRef(
            t.callExpression(
              t.memberExpression(
                t.callExpression(this.addHelper("arrayLikeToArray"), [
                  arr.use(),
                ]),
                t.identifier("slice"),
              ),
              [t.numericLiteral(i)],
            ),
            {
              isArray: true,
              // Nested refs derive their names from this one (e.g. `_ref.x`)
              nameHint: t.isPattern(element.argument)
                ? () => arr.hint()
                : element.argument,
            },
          ),
        );
      } else {
        this.lowerTarget(
          element,
          this.createRef(
            t.memberExpression(arr.use(), t.numericLiteral(i), true),
            {
              isStatic: false,
              nameHint: () =>
                t.memberExpression(
                  arr.hint() as t.Expression,
                  t.numericLiteral(i),
                  true,
                ),
            },
          ),
        );
      }
    }
  }

  private toArray(ref: Ref, count: number | null): Ref {
    const node = ref.expr;
    const { scope } = this;
    const { iterableIsArray, arrayLikeIsIterable } = this.options;

    const binding = t.isIdentifier(node)
      ? scope.getBinding(node.name)
      : undefined;
    if (
      iterableIsArray ||
      ref.isArray ||
      t.isArrayExpression(node) ||
      (binding?.constant && binding.path.isGenericType("Array"))
    ) {
      return ref;
    }

    if (t.isIdentifier(node, { name: "arguments" })) {
      return this.createRef(
        template.expression.ast`Array.prototype.slice.call(${ref.use()})`,
        { isArray: true, isStatic: false, nameHint: node },
      );
    }

    let helperName: string;
    const args = [ref.use()];
    if (count !== null) {
      args.push(t.numericLiteral(count));
      // Used in array-rest to create an array from a subset of an iterable.
      helperName = "slicedToArray";
    } else {
      // Used in array-rest to create an array
      helperName = "toArray";
    }

    if (arrayLikeIsIterable) {
      args.unshift(this.addHelper(helperName));
      helperName = "maybeArrayLike";
    }

    return this.createRef(t.callExpression(this.addHelper(helperName), args), {
      isArray: true,
      isStatic: false,
      nameHint: () => ref.hint(),
    });
  }

  private lowerArrayPatternPartial(pattern: t.ArrayPattern, ref: Ref) {
    const queue: [PatternTarget, t.Identifier][] = [];
    splitArrayPattern(
      pattern,
      this.options.features,
      this.scope,
      (target, id) => {
        if (this.isAssignment) this.hoisted.push(id);
        queue.push([target, id]);
      },
    );

    this.bind(pattern, ref.use());

    // todo: nested patterns are destructured after the whole array pattern
    // has been evaluated. Being fully spec-compliant would require manually
    // iterating the right-hand side.
    for (const [target, id] of queue) {
      this.lowerTarget(
        target,
        this.createRef(t.cloneNode(id), { isStatic: true }),
      );
    }
  }
}
