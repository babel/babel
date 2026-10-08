import {
  types as t,
  type NodePath,
  type Scope,
  type Visitor,
} from "@babel/core";
import {
  isTransparentExprWrapper,
  skipTransparentExprWrappers,
} from "@babel/helper-skip-transparent-expression-wrappers";
import { transformOptionalChain } from "@babel/plugin-transform-optional-chaining";

export interface Assumptions {
  noDocumentAll: boolean;
  pureGetters: boolean;
}

type PartialNode =
  | t.PartialCallExpression
  | t.PartialNewExpression
  | t.OptionalPartialCallExpression;

// Whether `node` is a temporary variable, such as the ones injected by
// `scope.push`. They are reassigned without being tracked as violations.
function isTemporary(node: t.Node, scope: Scope) {
  if (!t.isIdentifier(node)) return false;
  const binding = scope.getBinding(node.name);
  return (
    !!binding &&
    binding.path.isVariableDeclarator() &&
    binding.path.node.init == null
  );
}

// Whether `node` can be referenced from the partially applied function
// instead of being evaluated eagerly and captured
function isStableReference(node: t.Node, scope: Scope) {
  if (t.isImmutable(node)) return true;
  if (t.isIdentifier(node)) {
    return !!scope.getBinding(node.name)?.constant && !isTemporary(node, scope);
  }
  return false;
}

function buildNullishCheck(
  ref: t.Identifier,
  check: t.Expression,
  noDocumentAll: boolean,
) {
  if (noDocumentAll) {
    return t.binaryExpression("==", check, t.nullLiteral());
  }
  return t.logicalExpression(
    "||",
    t.binaryExpression("===", check, t.nullLiteral()),
    t.binaryExpression("===", t.cloneNode(ref), t.buildUndefinedNode()),
  );
}

/**
 * Lower `f~(a, ?, ?0, ...)`, `o.f~(?)` and `new C~(?)` to
 *
 *   ((_f, _a) => function (_arg0, _arg1, ..._rest) {
 *     return _f(_a, _arg0, _arg0, ..._rest);
 *   })(f, a)
 *
 * The callee, the receiver and the non-placeholder arguments are evaluated
 * eagerly, in order, as arguments of the outer arrow function. They are
 * passed as parameters, rather than stored in temporary variables, so
 * that every partially applied function has its own copy of them.
 *
 * When `nullishCheck` is set (`f?.~()`), the result is `undefined` if the
 * callee is nullish, and the arguments are not evaluated.
 */
function buildPartialApplication(
  node: PartialNode,
  scope: Scope,
  nullishCheck: { noDocumentAll: boolean } | null,
): t.Expression {
  const isNew = t.isPartialNewExpression(node);

  const params: t.Identifier[] = [];
  const values: t.Expression[] = [];
  const capture = (value: t.Expression, force = false): t.Expression => {
    if (!force && isStableReference(value, scope)) return value;
    const id = scope.generateUidIdentifierBasedOnNode(value);
    params.push(id);
    values.push(value);
    return t.cloneNode(id);
  };

  // The callee and its receiver
  const callee = skipTransparentExprWrapperNodes(node.callee);
  let receiver: t.Expression | null = null;
  let receiverRef: t.Identifier | null = null;
  if (
    !isNew &&
    (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee))
  ) {
    const { object } = callee;
    if (t.isSuper(object)) {
      receiver = t.thisExpression();
    } else if (
      // These can be read twice without being memoized
      t.isThisExpression(object) ||
      isStableReference(object, scope) ||
      isTemporary(object, scope)
    ) {
      receiver = t.cloneNode(object);
    } else {
      receiverRef = scope.generateUidIdentifierBasedOnNode(object);
      scope.push({ id: t.cloneNode(receiverRef) });
      callee.object = t.assignmentExpression(
        "=",
        t.cloneNode(receiverRef),
        object,
      );
    }
  }

  let test: t.Expression | null = null;
  let calleeRef: t.Expression;
  if (
    nullishCheck &&
    !(t.isIdentifier(callee) && isStableReference(callee, scope))
  ) {
    const ref = scope.generateUidIdentifierBasedOnNode(callee);
    scope.push({ id: t.cloneNode(ref) });
    test = buildNullishCheck(
      ref,
      t.assignmentExpression("=", t.cloneNode(ref), callee),
      nullishCheck.noDocumentAll,
    );
    calleeRef = capture(t.cloneNode(ref), true);
  } else {
    if (nullishCheck) {
      test = buildNullishCheck(
        callee as t.Identifier,
        t.cloneNode(callee),
        nullishCheck.noDocumentAll,
      );
    }
    calleeRef = capture(callee);
  }
  if (receiverRef) {
    receiver = capture(t.cloneNode(receiverRef), true);
  } else if (receiver) {
    receiver = capture(receiver);
  }

  // The arguments
  let positionalCount = 0;
  let maxOrdinal = 0;
  let hasRest = false;
  for (const arg of node.arguments) {
    if (t.isArgumentPlaceholder(arg)) {
      if (arg.ordinal) {
        maxOrdinal = Math.max(maxOrdinal, arg.ordinal.value + 1);
      } else {
        positionalCount++;
      }
    } else if (t.isRestPlaceholder(arg)) {
      hasRest = true;
    }
  }
  const placeholders: t.Identifier[] = [];
  for (let i = Math.max(positionalCount, maxOrdinal); i > 0; i--) {
    placeholders.push(scope.generateUidIdentifier("argPlaceholder"));
  }
  const rest = hasRest ? scope.generateUidIdentifier("restPlaceholder") : null;

  let position = 0;
  const args: (t.Expression | t.SpreadElement)[] = node.arguments.map(arg => {
    if (t.isArgumentPlaceholder(arg)) {
      return t.cloneNode(
        placeholders[arg.ordinal ? arg.ordinal.value : position++],
      );
    } else if (t.isRestPlaceholder(arg)) {
      return t.spreadElement(t.cloneNode(rest!));
    } else if (t.isSpreadElement(arg)) {
      // Spread arguments are iterated when the function is partially applied
      return t.spreadElement(
        capture(t.arrayExpression([t.spreadElement(arg.argument)]), true),
      );
    }
    return capture(arg);
  });

  let body: t.Expression;
  if (isNew) {
    body = t.newExpression(calleeRef, args);
  } else if (receiver) {
    body = t.callExpression(
      t.memberExpression(calleeRef, t.identifier("call")),
      [receiver, ...args],
    );
  } else {
    body = t.callExpression(calleeRef, args);
  }

  let result: t.Expression = t.functionExpression(
    null,
    rest ? [...placeholders, t.restElement(rest)] : placeholders,
    t.blockStatement([t.returnStatement(body)]),
  );
  if (params.length > 0) {
    result = t.callExpression(
      t.arrowFunctionExpression(params, result),
      values,
    );
  }
  if (test) {
    result = t.conditionalExpression(test, t.buildUndefinedNode(), result);
  }
  return result;
}

function skipTransparentExprWrapperNodes(node: t.Expression): t.Expression {
  while (isTransparentExprWrapper(node)) {
    node = node.expression;
  }
  return node;
}

// After `a?.b~()` in `a?.b~().c` is lowered to `a == null ? void 0 : ...`,
// the rest of the chain must short-circuit when it is `undefined`. Since a
// partially applied function is never nullish, `.c` can become `?.c`.
function continueOptionalChain(path: NodePath) {
  let child = path;
  let parent = path.parentPath;
  while (parent && isTransparentExprWrapper(parent.node)) {
    child = parent;
    parent = parent.parentPath;
  }
  if (
    (parent?.isOptionalMemberExpression() &&
      parent.node.object === child.node) ||
    ((parent?.isOptionalCallExpression() ||
      parent?.isOptionalPartialCallExpression()) &&
      parent.node.callee === child.node)
  ) {
    parent.node.optional = true;
  }
}

function exitPartialCallOrNew(
  path: NodePath<t.PartialCallExpression | t.PartialNewExpression>,
) {
  path.replaceWith(buildPartialApplication(path.node, path.scope, null));
}

export function createVisitor(assumptions: Assumptions): Visitor {
  return {
    PartialCallExpression: { exit: exitPartialCallOrNew },
    PartialNewExpression: { exit: exitPartialCallOrNew },
    OptionalPartialCallExpression: {
      exit(path) {
        const { node } = path;
        const callee = skipTransparentExprWrappers(path.get("callee"));
        let partialPath: NodePath = path;
        if (
          callee.isOptionalMemberExpression() ||
          callee.isOptionalCallExpression()
        ) {
          // Lower the optional chain in the callee, so that `a?.b~()`
          // becomes `a == null ? void 0 : a.b~()`
          transformOptionalChain(
            callee,
            assumptions,
            path,
            t.buildUndefinedNode(),
          );
          const replacement = path as NodePath;
          if (replacement.isConditionalExpression()) {
            partialPath = replacement.get("alternate");
          } else if (replacement.isLogicalExpression()) {
            partialPath = replacement.get("right");
          }
          // The chain could not be lowered in place; the replacement
          // will be visited again.
          if (partialPath.node !== node) return;
        }
        partialPath.replaceWith(
          buildPartialApplication(
            node,
            partialPath.scope,
            node.optional ? assumptions : null,
          ),
        );
        continueOptionalChain(path);
      },
    },
  };
}
