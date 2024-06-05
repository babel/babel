import { types as t, template, type NodePath } from "@babel/core";
import {
  skipTransparentExprWrapperNodes,
  skipTransparentExprWrappers,
} from "@babel/helper-skip-transparent-expression-wrappers";
import {
  willPathCastToBoolean,
  findOutermostTransparentParent,
} from "./util.ts";

// TODO(Babel 9): Use .at(-1)
const last = <T>(arr: T[]) => arr[arr.length - 1];

function isSimpleMemberExpression(
  expression: t.Expression | t.Super,
): expression is t.Identifier | t.Super | t.MemberExpression {
  expression = skipTransparentExprWrapperNodes(expression);
  return (
    t.isIdentifier(expression) ||
    t.isSuper(expression) ||
    (t.isMemberExpression(expression) &&
      !expression.computed &&
      isSimpleMemberExpression(expression.object))
  );
}

/**
 * Test if a given optional chain `path` needs to be memoized
 * @param {NodePath} path
 * @returns {boolean}
 */
function needsMemoize(
  path: NodePath<t.OptionalCallExpression | t.OptionalMemberExpression>,
) {
  let optionalPath: NodePath = path;
  const { scope } = path;
  while (
    optionalPath.isOptionalMemberExpression() ||
    optionalPath.isOptionalCallExpression()
  ) {
    const { node } = optionalPath;
    const childPath = skipTransparentExprWrappers(
      optionalPath.isOptionalMemberExpression()
        ? optionalPath.get("object")
        : optionalPath.get("callee"),
    );
    if (node.optional) {
      return !scope.isStatic(childPath.node);
    }

    optionalPath = childPath;
  }
}

const NULLISH_CHECK = template.expression(
  `%%check%% === null || %%ref%% === void 0`,
);
const NULLISH_CHECK_NO_DDA = template.expression(`%%check%% == null`);
const NULLISH_CHECK_NEG = template.expression(
  `%%check%% !== null && %%ref%% !== void 0`,
);
const NULLISH_CHECK_NO_DDA_NEG = template.expression(`%%check%% != null`);

interface OptionalChainAssumptions {
  pureGetters: boolean;
  noDocumentAll: boolean;
}

export function transformOptionalChain(
  path: NodePath<t.OptionalCallExpression | t.OptionalMemberExpression>,
  { pureGetters, noDocumentAll }: OptionalChainAssumptions,
  replacementPath: NodePath<t.Expression>,
  ifNullish: t.Expression,
  wrapLast?: (value: t.Expression) => t.Expression,
) {
  const { scope } = path;

  // Replace `function (a, x = a.b?.c) {}` to `function (a, x = (() => a.b?.c)() ){}`
  // so the temporary variable can be injected in correct scope
  if (scope.path.isPattern() && needsMemoize(path)) {
    replacementPath.replaceWith(
      template.expression.ast`(() => ${replacementPath.node})()`,
    );
    // The injected optional chain will be queued and eventually transformed when visited
    return;
  }

  const optionals = [];

  let optionalPath = path;
  while (
    optionalPath.isOptionalMemberExpression() ||
    optionalPath.isOptionalCallExpression()
  ) {
    const { node } = optionalPath;
    if (node.optional) {
      optionals.push(node);
    }
    if (optionalPath.isOptionalMemberExpression()) {
      // @ts-expect-error todo(flow->ts) avoid changing more type
      optionalPath.node.type = "MemberExpression";
      // @ts-expect-error todo(flow->ts)
      optionalPath = skipTransparentExprWrappers(optionalPath.get("object"));
    } else if (optionalPath.isOptionalCallExpression()) {
      // @ts-expect-error todo(flow->ts) avoid changing more type
      optionalPath.node.type = "CallExpression";
      // @ts-expect-error todo(flow->ts)
      optionalPath = skipTransparentExprWrappers(optionalPath.get("callee"));
    }
  }

  if (optionals.length === 0) {
    // Malformed AST: there was an OptionalMemberExpression node
    // with no actual optional elements.
    return;
  }

  const checks = [];

  let tmpVar;

  for (let i = optionals.length - 1; i >= 0; i--) {
    const node = optionals[i] as unknown as
      | t.MemberExpression
      | t.CallExpression;

    const isCall = t.isCallExpression(node);

    const chainWithTypes = isCall
      ? // V8 intrinsics must not be an optional call
        (node.callee as t.Expression)
      : node.object;
    const chain = skipTransparentExprWrapperNodes(chainWithTypes);

    let ref;
    let check;
    if (isCall && t.isIdentifier(chain, { name: "eval" })) {
      check = ref = chain;
      // `eval?.()` is an indirect eval call transformed to `(0,eval)()`
      node.callee = t.sequenceExpression([t.numericLiteral(0), ref]);
    } else if (pureGetters && isCall && isSimpleMemberExpression(chain)) {
      // If we assume getters are pure (avoiding a Function#call) and we are at the call,
      // we can avoid a needless memoize. We only do this if the callee is a simple member
      // expression, to avoid multiple calls to nested call expressions.
      check = ref = node.callee;
    } else if (scope.isStatic(chain)) {
      check = ref = chainWithTypes;
    } else {
      // We cannot reuse the tmpVar for calls, because we need to
      // store both the method and the receiver.
      if (!tmpVar || isCall) {
        tmpVar = scope.generateUidIdentifierBasedOnNode(chain);
        scope.push({ id: t.cloneNode(tmpVar) });
      }
      ref = tmpVar;
      check = t.assignmentExpression(
        "=",
        t.cloneNode(tmpVar),
        // Here `chainWithTypes` MUST NOT be cloned because it could be
        // updated when generating the memoised context of a call
        // expression. It must be an Expression when `ref` is an identifier
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        chainWithTypes as t.Expression,
      );

      if (isCall) {
        node.callee = ref;
      } else {
        node.object = ref;
      }
    }

    // Ensure call expressions have the proper `this`
    // `foo.bar()` has context `foo`.
    if (isCall && t.isMemberExpression(chain)) {
      if (pureGetters && isSimpleMemberExpression(chain)) {
        // To avoid a Function#call, we can instead re-grab the property from the context object.
        // `a.?b.?()` translates roughly to `_a.b != null && _a.b()`
        node.callee = chainWithTypes;
      } else {
        // Otherwise, we need to memoize the context object, and change the call into a Function#call.
        // `a.?b.?()` translates roughly to `(_b = _a.b) != null && _b.call(_a)`
        const { object } = chain;
        let context: t.Expression;
        if (t.isSuper(object)) {
          context = t.thisExpression();
        } else {
          const memoized = scope.maybeGenerateMemoised(object);
          if (memoized) {
            context = memoized;
            chain.object = t.assignmentExpression("=", memoized, object);
          } else {
            context = object;
          }
        }

        node.arguments.unshift(t.cloneNode(context));
        // @ts-expect-error node.callee can not be an V8IntrinsicIdentifier: V8 intrinsic is disallowed in optional chain
        node.callee = t.memberExpression(node.callee, t.identifier("call"));
      }
    }

    const data = { check: t.cloneNode(check), ref: t.cloneNode(ref) };
    // We make `ref` non-enumerable, so that @babel/template doesn't throw
    // in the noDocumentAll template if it's not used.
    Object.defineProperty(data, "ref", { enumerable: false });
    checks.push(data);
  }

  let result = replacementPath.node;
  if (wrapLast) result = wrapLast(result);

  const ifNullishBoolean = t.isBooleanLiteral(ifNullish);
  const ifNullishFalse = ifNullishBoolean && ifNullish.value === false;
  const ifNullishVoid =
    !ifNullishBoolean && t.isUnaryExpression(ifNullish, { operator: "void" });

  const isEvaluationValueIgnored =
    (t.isExpressionStatement(replacementPath.parent) &&
      !replacementPath.isCompletionRecord()) ||
    (t.isSequenceExpression(replacementPath.parent) &&
      last(replacementPath.parent.expressions) !== replacementPath.node);

  // prettier-ignore
  const tpl = ifNullishFalse
    ? (noDocumentAll ? NULLISH_CHECK_NO_DDA_NEG : NULLISH_CHECK_NEG)
    : (noDocumentAll ? NULLISH_CHECK_NO_DDA : NULLISH_CHECK);
  const logicalOp = ifNullishFalse ? "&&" : "||";

  const check = checks
    .map(tpl)
    .reduce((expr, check) => t.logicalExpression(logicalOp, expr, check));

  replacementPath.replaceWith(
    ifNullishBoolean || (ifNullishVoid && isEvaluationValueIgnored)
      ? t.logicalExpression(logicalOp, check, result)
      : t.conditionalExpression(check, ifNullish, result),
  );
}

export function transform(
  path: NodePath<t.OptionalCallExpression | t.OptionalMemberExpression>,
  assumptions: OptionalChainAssumptions,
) {
  const { scope } = path;

  // maybeWrapped points to the outermost transparent expression wrapper
  // or the path itself
  const maybeWrapped = findOutermostTransparentParent(path);
  const { parentPath } = maybeWrapped;

  if (parentPath.isUnaryExpression({ operator: "delete" })) {
    transformOptionalChain(
      path,
      assumptions,
      parentPath,
      t.booleanLiteral(true),
    );
  } else {
    let wrapLast;
    if (
      parentPath.isCallExpression({ callee: maybeWrapped.node }) &&
      // note that the first condition must implies that `path.optional` is `true`,
      // otherwise the parentPath should be an OptionalCallExpression
      path.isOptionalMemberExpression()
    ) {
      // Ensure (a?.b)() has proper `this`
      wrapLast = (replacement: t.MemberExpression) => {
        // `(a?.b)()` to `(a == null ? undefined : a.b.bind(a))()`
        // object must not be Super as super?.foo is invalid
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const object = skipTransparentExprWrapperNodes(
          replacement.object,
        ) as t.Expression;
        let baseRef: t.Expression;
        if (!assumptions.pureGetters || !isSimpleMemberExpression(object)) {
          // memoize the context object when getters are not always pure
          // or the object is not a simple member expression
          // `(a?.b.c)()` to `(a == null ? undefined : (_a$b = a.b).c.bind(_a$b))()`
          baseRef = scope.maybeGenerateMemoised(object);
          if (baseRef) {
            replacement.object = t.assignmentExpression("=", baseRef, object);
          }
        }
        return t.callExpression(
          t.memberExpression(replacement, t.identifier("bind")),
          [t.cloneNode(baseRef ?? object)],
        );
      };
    }

    transformOptionalChain(
      path,
      assumptions,
      path,
      willPathCastToBoolean(maybeWrapped)
        ? t.booleanLiteral(false)
        : scope.buildUndefinedNode(),
      wrapLast,
    );
  }
}
