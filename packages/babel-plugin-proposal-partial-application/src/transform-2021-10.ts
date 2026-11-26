import { types as t, type NodePath, type Visitor } from "@babel/core";
import {
  isTransparentExprWrapper,
  skipTransparentExprWrapperNodes,
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

// The partially applied function has a parameter for every placeholder
// position up to the highest ordinal, so `f~(?1000000)` would need a million
// parameters. Cap it to keep the output, and the compilation time, small.
const MAX_PARAMS = 256;

// Whether `node` can be referenced from the partially applied function
// instead of being evaluated eagerly and captured: reading it when the
// function is called must give the value it has when `path` is evaluated,
// and must not throw
function isStableReference(node: t.Node, path: NodePath<PartialNode>) {
  // JSX elements are "immutable" nodes, but create a new object every time
  if (t.isImmutable(node)) return !t.isJSX(node);
  // The partially applied function has its own `arguments`
  if (!t.isIdentifier(node) || node.name === "arguments") return false;
  const binding = path.scope.getBinding(node.name);
  if (!binding?.constant) return false;
  switch (binding.kind) {
    case "hoisted":
      // Function declarations are initialized when their scope is entered
      return true;
    case "local":
      // The name of a function expression. A class expression's name is in
      // TDZ while its heritage and computed keys are evaluated.
      return binding.path.isFunctionExpression();
    case "param":
      return (
        // Parameters are initialized in order, so a parameter default can
        // read a later parameter in TDZ
        path.find(p => p.parentPath === binding.scope.path)?.key === "body" &&
        // Sloppy mode parameters can be reassigned through `arguments`
        (binding.scope.path.isArrowFunctionExpression() ||
          binding.path.isInStrictMode())
      );
    case "let":
      // Catch clause parameters can be reassigned by an Annex B `var`
      // redeclaration, which isn't tracked as a constant violation
      if (binding.path.isCatchClause()) return false;
    // falls through
    case "var":
    case "const":
      // Temporary variables, such as the ones injected by `scope.push`, are
      // reassigned without being tracked as constant violations. A `let` or
      // `const` in a `for-in` or `for-of` head has no initializer, but every
      // iteration has its own binding.
      if (
        binding.path.isVariableDeclarator() &&
        binding.path.node.init == null &&
        !(
          binding.kind !== "var" &&
          binding.path.parentPath.parentPath.isForXStatement()
        )
      ) {
        return false;
      }
      return isInitializedBefore(binding.path, path);
    default:
      // Imports are live bindings
      return false;
  }
}

// Whether the declaration at `declPath` has always been evaluated when
// `path` is: either it's a statement before an ancestor of `path` in the
// same statement list, or it's the head of a loop that contains `path`.
// Being in scope isn't enough: `let` and `const` are in TDZ, and `var` is
// `undefined`, until their declaration runs.
function isInitializedBefore(declPath: NodePath, path: NodePath) {
  let decl = declPath;
  if (decl.isVariableDeclarator()) decl = decl.parentPath;
  const loop = decl.parentPath;
  let loopBody: string[] | undefined;
  if (loop?.isForXStatement() && decl.key === "left") {
    loopBody = ["body"];
  } else if (loop?.isForStatement() && decl.key === "init") {
    loopBody = ["test", "update", "body"];
  } else if (!decl.inList) {
    return false;
  }
  for (let p = path; p.parentPath; p = p.parentPath) {
    // A function declaration can be called before the code above it runs.
    // Other functions and classes are created where they are, so their
    // bodies run after it.
    if (p.isFunctionDeclaration()) return false;
    if (loopBody) {
      if (p.parentPath === loop) return loopBody.includes(p.key as string);
    } else if (p.container === decl.container && p.listKey === decl.listKey) {
      return (p.key as number) > (decl.key as number);
    }
  }
  return false;
}

function buildNullishCheck(
  check: t.Expression,
  ref: t.Expression,
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
 *   ((_f, _a) => function (_arg0, ..._rest) {
 *     return _f(_a, _arg0, _arg0, ..._rest);
 *   })(f, a)
 *
 * The callee, the receiver and the non-placeholder arguments are evaluated
 * eagerly, in order, as arguments of the outer arrow function. They are
 * passed as parameters, rather than stored in temporary variables, so
 * that every partially applied function has its own copy of them.
 *
 * For `f?.~()`, the result is `undefined` if the callee is nullish, and the
 * arguments are not evaluated.
 *
 * Known limitations: the spec creates a bound function exotic object, but
 * this is a plain function, so
 * - a non-callable callee, or a non-constructor in `new C~()`, throws only
 *   when the partially applied function is called;
 * - its `name` is not `"bound " + f.name`, its [[Prototype]] is always
 *   `Function.prototype`, and it has its own `prototype` property;
 * - `new` on it calls `f` with `new` only for `new C~()`. For `f~()`, it
 *   calls `f` without `new`, even when `f` is not a constructor, and
 *   `new.target` is not forwarded;
 * - inside `with`, `m~()` calls `m` with `undefined` as `this`;
 * - placeholders are limited to `MAX_PARAMS` parameters.
 */
function buildPartialApplication(
  path: NodePath<PartialNode>,
  { noDocumentAll }: Assumptions,
): t.Expression {
  const { node, scope } = path;
  const params: t.Identifier[] = [];
  const values: t.Expression[] = [];
  const capture = (value: t.Expression): t.Expression => {
    if (isStableReference(value, path)) return value;
    const id = scope.generateUidIdentifierBasedOnNode(value);
    params.push(id);
    values.push(value);
    return t.cloneNode(id);
  };

  // The callee and its receiver
  const isNew = t.isPartialNewExpression(node);
  let callee = skipTransparentExprWrapperNodes(node.callee);
  let receiver: t.Expression | undefined;
  if (
    !isNew &&
    (t.isMemberExpression(callee) || t.isOptionalMemberExpression(callee))
  ) {
    const { object } = callee;
    if (t.isSuper(object)) {
      receiver = t.thisExpression();
    } else {
      const ref = scope.maybeGenerateMemoised(object);
      if (ref) callee.object = t.assignmentExpression("=", ref, object);
      receiver = t.cloneNode(ref ?? object);
    }
  }

  let test: t.Expression | undefined;
  if (t.isOptionalPartialCallExpression(node) && node.optional) {
    const ref = scope.maybeGenerateMemoised(callee);
    test = buildNullishCheck(
      ref ? t.assignmentExpression("=", ref, callee) : t.cloneNode(callee),
      ref ?? callee,
      noDocumentAll,
    );
    if (ref) callee = t.cloneNode(ref);
  }

  callee = capture(callee);
  if (receiver) receiver = capture(receiver);

  // The arguments
  const placeholders: t.Identifier[] = [];
  const placeholder = (index: number) => {
    while (placeholders.length <= index) {
      placeholders.push(scope.generateUidIdentifier("argPlaceholder"));
    }
    return t.cloneNode(placeholders[index]);
  };
  let position = 0;
  let rest: t.Identifier | undefined;
  const args = node.arguments.map((arg, i) => {
    if (t.isArgumentPlaceholder(arg)) {
      const index = arg.ordinal ? arg.ordinal.value : position++;
      if (!Number.isInteger(index) || index < 0 || index >= MAX_PARAMS) {
        const argPath = path.get("arguments")[i];
        throw argPath.buildCodeFrameError(
          `Partial applications with more than ${MAX_PARAMS} parameters are not supported.`,
        );
      }
      return placeholder(index);
    } else if (t.isRestPlaceholder(arg)) {
      rest = scope.generateUidIdentifier("restPlaceholder");
      return t.spreadElement(t.cloneNode(rest));
    } else if (t.isSpreadElement(arg)) {
      // Spread arguments are iterated when the function is partially applied
      return t.spreadElement(capture(t.arrayExpression([arg])));
    }
    return capture(arg);
  });

  let body: t.Expression;
  if (isNew) {
    body = t.newExpression(callee, args);
  } else if (receiver) {
    body = t.callExpression(t.memberExpression(callee, t.identifier("call")), [
      receiver,
      ...args,
    ]);
  } else {
    body = t.callExpression(callee, args);
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
  return test
    ? t.conditionalExpression(test, t.buildUndefinedNode(), result)
    : result;
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

export function createVisitor(assumptions: Assumptions): Visitor {
  function exit(path: NodePath<PartialNode>) {
    const callee = skipTransparentExprWrappers(path.get("callee"));
    if (
      path.isOptionalPartialCallExpression() &&
      (callee.isOptionalMemberExpression() || callee.isOptionalCallExpression())
    ) {
      // Lower the optional chain in the callee first: `a?.b~()` becomes
      // `a == null ? void 0 : a.b~()`, and `a.b~()` is visited again.
      transformOptionalChain(callee, assumptions, path, t.buildUndefinedNode());
    } else {
      path.replaceWith(buildPartialApplication(path, assumptions));
    }
    continueOptionalChain(path);
  }

  return {
    PartialCallExpression: { exit },
    PartialNewExpression: { exit },
    OptionalPartialCallExpression: { exit },
  };
}
