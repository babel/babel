import * as t from "@babel/types";
import { willPathCastToBoolean } from "./util";

class AssignmentMemoiser {
  private _map: WeakMap<object, any>;
  constructor() {
    this._map = new WeakMap();
  }

  has(key) {
    return this._map.has(key);
  }

  get(key) {
    if (!this.has(key)) return;

    const record = this._map.get(key);
    const { value } = record;

    record.count--;
    if (record.count === 0) {
      // The `count` access is the outermost function call (hopefully), so it
      // does the assignment.
      return t.assignmentExpression("=", value, key);
    }
    return value;
  }

  set(key, value, count) {
    return this._map.set(key, { count, value });
  }
}

function toNonOptional(path, base) {
  const { node } = path;
  if (path.isOptionalMemberExpression()) {
    return t.memberExpression(base, node.property, node.computed);
  }

  if (path.isOptionalCallExpression()) {
    const callee = path.get("callee");
    if (path.node.optional && callee.isOptionalMemberExpression()) {
      const { object } = callee.node;
      const context = path.scope.maybeGenerateMemoised(object) || object;
      callee
        .get("object")
        .replaceWith(t.assignmentExpression("=", context, object));

      return t.callExpression(t.memberExpression(base, t.identifier("call")), [
        context,
        ...node.arguments,
      ]);
    }

    return t.callExpression(base, node.arguments);
  }

  return path.node;
}

// Determines if the current path is in a detached tree. This can happen when
// we are iterating on a path, and replace an ancestor with a new node. Babel
// doesn't always stop traversing the old node tree, and that can cause
// inconsistencies.
function isInDetachedTree(path) {
  while (path) {
    if (path.isProgram()) break;

    const { parentPath, container, listKey } = path;
    const parentNode = parentPath.node;
    if (listKey) {
      if (container !== parentNode[listKey]) return true;
    } else {
      if (container !== parentNode) return true;
    }

    path = parentPath;
  }

  return false;
}

const handle = {
  memoise() {
    // noop.
  },

  // todo(flow->ts) member:NodePath<t.Expression>, refactor function body to avoid too many typecasts
  handle(member: any, noDocumentAll: boolean) {
    const { node, parent, parentPath, scope } = member;

    if (member.isOptionalMemberExpression()) {
      // Transforming optional chaining requires we replace ancestors.
      if (isInDetachedTree(member)) return;

      // We're looking for the end of _this_ optional chain, which is actually
      // the "rightmost" property access of the chain. This is because
      // everything up to that property access is "optional".
      //
      // Let's take the case of `FOO?.BAR.baz?.qux`, with `FOO?.BAR` being our
      // member. The "end" to most users would be `qux` property access.
      // Everything up to it could be skipped if it `FOO` were nullish. But
      // actually, we can consider the `baz` access to be the end. So we're
      // looking for the nearest optional chain that is `optional: true`.
      const endPath = member.find(({ node, parent, parentPath }) => {
        if (parentPath.isOptionalMemberExpression()) {
          // We need to check `parent.object` since we could be inside the
          // computed expression of a `bad?.[FOO?.BAR]`. In this case, the
          // endPath is the `FOO?.BAR` member itself.
          return parent.optional || parent.object !== node;
        }
        if (parentPath.isOptionalCallExpression()) {
          // Checking `parent.callee` since we could be in the arguments, eg
          // `bad?.(FOO?.BAR)`.
          // Also skip `FOO?.BAR` in `FOO?.BAR?.()` since we need to transform the optional call to ensure proper this
          return (
            // In FOO?.#BAR?.(), endPath points the optional call expression so we skip FOO?.#BAR
            (node !== member.node && parent.optional) || parent.callee !== node
          );
        }
        return true;
      });

      // Replace `function (a, x = a.b?.#c) {}` to `function (a, x = (() => a.b?.#c)() ){}`
      // so the temporary variable can be injected in correct scope
      // This can be further optimized to avoid unecessary IIFE
      if (scope.path.isPattern()) {
        endPath.replaceWith(
          // The injected member will be queued and eventually transformed when visited
          t.callExpression(t.arrowFunctionExpression([], endPath.node), []),
        );
        return;
      }

      const willEndPathCastToBoolean = willPathCastToBoolean(endPath);

      const rootParentPath = endPath.parentPath;
      if (
        rootParentPath.isUpdateExpression({ argument: node }) ||
        rootParentPath.isAssignmentExpression({ left: node })
      ) {
        throw member.buildCodeFrameError(`can't handle assignment`);
      }
      const isDeleteOperation = rootParentPath.isUnaryExpression({
        operator: "delete",
      });
      if (
        isDeleteOperation &&
        endPath.isOptionalMemberExpression() &&
        endPath.get("property").isPrivateName()
      ) {
        // @babel/parser will throw error on `delete obj?.#x`.
        // This error serves as fallback when `delete obj?.#x` is constructed from babel types
        throw member.buildCodeFrameError(
          `can't delete a private class element`,
        );
      }

      // Now, we're looking for the start of this optional chain, which is
      // optional to the left of this member.
      //
      // Let's take the case of `foo?.bar?.baz.QUX?.BAM`, with `QUX?.BAM` being
      // our member. The "start" to most users would be `foo` object access.
      // But actually, we can consider the `bar` access to be the start. So
      // we're looking for the nearest optional chain that is `optional: true`,
      // which is guaranteed to be somewhere in the object/callee tree.
      let startingOptional = member;
      for (;;) {
        if (startingOptional.isOptionalMemberExpression()) {
          if (startingOptional.node.optional) break;
          startingOptional = startingOptional.get("object");
          continue;
        } else if (startingOptional.isOptionalCallExpression()) {
          if (startingOptional.node.optional) break;
          startingOptional = startingOptional.get("callee");
          continue;
        }
        // prevent infinite loop: unreachable if the AST is well-formed
        throw new Error(
          `Internal error: unexpected ${startingOptional.node.type}`,
        );
      }

      const startingProp = startingOptional.isOptionalMemberExpression()
        ? "object"
        : "callee";
      const startingNode = startingOptional.node[startingProp];
      const baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode);
      const baseRef = baseNeedsMemoised ?? startingNode;

      // Compute parentIsOptionalCall before `startingOptional` is replaced
      // as `node` may refer to `startingOptional.node` before replaced.
      const parentIsOptionalCall = parentPath.isOptionalCallExpression({
        callee: node,
      });
      // if parentIsCall is true, it implies that node.extra.parenthesized is always true
      const parentIsCall = parentPath.isCallExpression({ callee: node });
      startingOptional.replaceWith(toNonOptional(startingOptional, baseRef));
      if (parentIsOptionalCall) {
        if (parent.optional) {
          parentPath.replaceWith(this.optionalCall(member, parent.arguments));
        } else {
          parentPath.replaceWith(this.call(member, parent.arguments));
        }
      } else if (parentIsCall) {
        // `(a?.#b)()` to `(a == null ? void 0 : a.#b.bind(a))()`
        member.replaceWith(this.boundGet(member));
      } else {
        member.replaceWith(this.get(member));
      }

      let regular = member.node;
      for (let current = member; current !== endPath; ) {
        const { parentPath } = current;
        // skip transforming `Foo.#BAR?.call(FOO)`
        if (parentPath === endPath && parentIsOptionalCall && parent.optional) {
          regular = parentPath.node;
          break;
        }
        regular = toNonOptional(parentPath, regular);
        current = parentPath;
      }

      let context;
      const endParentPath = endPath.parentPath;
      if (
        t.isMemberExpression(regular) &&
        endParentPath.isOptionalCallExpression({
          callee: endPath.node,
          optional: true,
        })
      ) {
        const { object } = regular;
        context = member.scope.maybeGenerateMemoised(object);
        if (context) {
          regular.object = t.assignmentExpression("=", context, object);
        }
      }

      let replacementPath = endPath;
      if (isDeleteOperation) {
        replacementPath = endParentPath;
        regular = endParentPath.node;
      }

      const baseMemoised = baseNeedsMemoised
        ? t.assignmentExpression(
            "=",
            t.cloneNode(baseRef),
            t.cloneNode(startingNode),
          )
        : t.cloneNode(baseRef);

      if (willEndPathCastToBoolean) {
        let nonNullishCheck;
        if (noDocumentAll) {
          nonNullishCheck = t.binaryExpression(
            "!=",
            baseMemoised,
            t.nullLiteral(),
          );
        } else {
          nonNullishCheck = t.logicalExpression(
            "&&",
            t.binaryExpression("!==", baseMemoised, t.nullLiteral()),
            t.binaryExpression(
              "!==",
              t.cloneNode(baseRef),
              scope.buildUndefinedNode(),
            ),
          );
        }
        replacementPath.replaceWith(
          t.logicalExpression("&&", nonNullishCheck, regular),
        );
      } else {
        let nullishCheck;
        if (noDocumentAll) {
          nullishCheck = t.binaryExpression(
            "==",
            baseMemoised,
            t.nullLiteral(),
          );
        } else {
          nullishCheck = t.logicalExpression(
            "||",
            t.binaryExpression("===", baseMemoised, t.nullLiteral()),
            t.binaryExpression(
              "===",
              t.cloneNode(baseRef),
              scope.buildUndefinedNode(),
            ),
          );
        }

        replacementPath.replaceWith(
          t.conditionalExpression(
            nullishCheck,
            isDeleteOperation
              ? t.booleanLiteral(true)
              : scope.buildUndefinedNode(),
            regular,
          ),
        );
      }

      // context and isDeleteOperation can not be both truthy
      if (context) {
        const endParent = endParentPath.node;
        endParentPath.replaceWith(
          t.optionalCallExpression(
            t.optionalMemberExpression(
              endParent.callee,
              t.identifier("call"),
              false,
              true,
            ),
            [t.cloneNode(context), ...endParent.arguments],
            false,
          ),
        );
      }

      return;
    }

    // MEMBER++   ->   _set(MEMBER, (_ref = (+_get(MEMBER))) + 1), _ref
    // ++MEMBER   ->   _set(MEMBER, (+_get(MEMBER)) + 1)
    if (parentPath.isUpdateExpression({ argument: node })) {
      if (this.simpleSet) {
        member.replaceWith(this.simpleSet(member));
        return;
      }

      const { operator, prefix } = parent;

      // Give the state handler a chance to memoise the member, since we'll
      // reference it twice. The second access (the set) should do the memo
      // assignment.
      this.memoise(member, 2);

      const value = t.binaryExpression(
        operator[0],
        t.unaryExpression("+", this.get(member)),
        t.numericLiteral(1),
      );

      if (prefix) {
        parentPath.replaceWith(this.set(member, value));
      } else {
        const { scope } = member;
        const ref = scope.generateUidIdentifierBasedOnNode(node);
        scope.push({ id: ref });

        value.left = t.assignmentExpression(
          "=",
          t.cloneNode(ref),
          // @ts-expect-error todo(flow->ts) value.left is possibly PrivateName, which is not usable here
          value.left,
        );

        parentPath.replaceWith(
          t.sequenceExpression([this.set(member, value), t.cloneNode(ref)]),
        );
      }
      return;
    }

    // MEMBER = VALUE   ->   _set(MEMBER, VALUE)
    // MEMBER += VALUE   ->   _set(MEMBER, _get(MEMBER) + VALUE)
    // MEMBER ??= VALUE   ->   _get(MEMBER) ?? _set(MEMBER, VALUE)
    if (parentPath.isAssignmentExpression({ left: node })) {
      if (this.simpleSet) {
        member.replaceWith(this.simpleSet(member));
        return;
      }

      const { operator, right: value } = parent;

      if (operator === "=") {
        parentPath.replaceWith(this.set(member, value));
      } else {
        const operatorTrunc = operator.slice(0, -1);
        if (t.LOGICAL_OPERATORS.includes(operatorTrunc)) {
          // Give the state handler a chance to memoise the member, since we'll
          // reference it twice. The first access (the get) should do the memo
          // assignment.
          this.memoise(member, 1);
          parentPath.replaceWith(
            t.logicalExpression(
              operatorTrunc,
              this.get(member),
              this.set(member, value),
            ),
          );
        } else {
          // Here, the second access (the set) is evaluated first.
          this.memoise(member, 2);
          parentPath.replaceWith(
            this.set(
              member,
              t.binaryExpression(operatorTrunc, this.get(member), value),
            ),
          );
        }
      }
      return;
    }

    // MEMBER(ARGS) -> _call(MEMBER, ARGS)
    if (parentPath.isCallExpression({ callee: node })) {
      parentPath.replaceWith(this.call(member, parent.arguments));
      return;
    }

    // MEMBER?.(ARGS) -> _optionalCall(MEMBER, ARGS)
    if (parentPath.isOptionalCallExpression({ callee: node })) {
      // Replace `function (a, x = a.b.#c?.()) {}` to `function (a, x = (() => a.b.#c?.())() ){}`
      // so the temporary variable can be injected in correct scope
      // This can be further optimized to avoid unecessary IIFE
      if (scope.path.isPattern()) {
        parentPath.replaceWith(
          // The injected member will be queued and eventually transformed when visited
          t.callExpression(t.arrowFunctionExpression([], parentPath.node), []),
        );
        return;
      }
      parentPath.replaceWith(this.optionalCall(member, parent.arguments));
      return;
    }

    // for (MEMBER of ARR)
    // for (MEMBER in ARR)
    // { KEY: MEMBER } = OBJ -> { KEY: _destructureSet(MEMBER) } = OBJ
    // { KEY: MEMBER = _VALUE } = OBJ -> { KEY: _destructureSet(MEMBER) = _VALUE } = OBJ
    // {...MEMBER} -> {..._destructureSet(MEMBER)}
    //
    // [MEMBER] = ARR -> [_destructureSet(MEMBER)] = ARR
    // [MEMBER = _VALUE] = ARR -> [_destructureSet(MEMBER) = _VALUE] = ARR
    // [...MEMBER] -> [..._destructureSet(MEMBER)]
    if (
      // for (MEMBER of ARR)
      // for (MEMBER in ARR)
      parentPath.isForXStatement({ left: node }) ||
      // { KEY: MEMBER } = OBJ
      (parentPath.isObjectProperty({ value: node }) &&
        parentPath.parentPath.isObjectPattern()) ||
      // { KEY: MEMBER = _VALUE } = OBJ
      (parentPath.isAssignmentPattern({ left: node }) &&
        parentPath.parentPath.isObjectProperty({ value: parent }) &&
        parentPath.parentPath.parentPath.isObjectPattern()) ||
      // [MEMBER] = ARR
      parentPath.isArrayPattern() ||
      // [MEMBER = _VALUE] = ARR
      (parentPath.isAssignmentPattern({ left: node }) &&
        parentPath.parentPath.isArrayPattern()) ||
      // {...MEMBER}
      // [...MEMBER]
      parentPath.isRestElement()
    ) {
      member.replaceWith(this.destructureSet(member));
      return;
    }

    if (parentPath.isTaggedTemplateExpression()) {
      // MEMBER   ->   _get(MEMBER).bind(this)
      member.replaceWith(this.boundGet(member));
    } else {
      // MEMBER   ->   _get(MEMBER)
      member.replaceWith(this.get(member));
    }
  },
};

// We do not provide a default traversal visitor
// Instead, caller passes one, and must call `state.handle` on the members
// it wishes to be transformed.
// Additionally, the caller must pass in a state object with at least
// get, set, and call methods.
// Optionally, a memoise method may be defined on the state, which will be
// called when the member is a self-referential update.
export default function memberExpressionToFunctions(path, visitor, state) {
  path.traverse(visitor, {
    ...handle,
    ...state,
    memoiser: new AssignmentMemoiser(),
  });
}
