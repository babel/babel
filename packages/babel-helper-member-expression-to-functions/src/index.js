import * as t from "@babel/types";

class AssignmentMemoiser {
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

const handle = {
  memoise() {
    // noop.
  },

  handle(member) {
    const { node, parent, parentPath } = member;

    if (member.isOptionalMemberExpression()) {
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
          return parent.optional || parent.callee !== node;
        }
        return true;
      });

      const rootParentPath = endPath.parentPath;
      if (
        rootParentPath.isUpdateExpression({ argument: node }) ||
        rootParentPath.isAssignmentExpression({ left: node })
      ) {
        throw member.buildCodeFrameError(`can't handle assignment`);
      }
      if (rootParentPath.isUnaryExpression({ operator: "delete" })) {
        throw member.buildCodeFrameError(`can't handle delete`);
      }

      if (node.optional) {
        throw member.buildCodeFrameError(
          `can't handle '?.' directly before ${node.property.type}`,
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
      }

      const { scope } = member;
      const startingProp = startingOptional.isOptionalMemberExpression()
        ? "object"
        : "callee";
      const startingNode = startingOptional.node[startingProp];
      const baseRef = scope.generateUidIdentifierBasedOnNode(startingNode);
      scope.push({ id: baseRef });

      startingOptional.replaceWith(toNonOptional(startingOptional, baseRef));
      if (parentPath.isOptionalCallExpression({ callee: node })) {
        parentPath.replaceWith(this.call(member, parent.arguments));
      } else {
        member.replaceWith(this.get(member));
      }

      let regular = member.node;
      for (let current = member; current !== endPath; ) {
        const { parentPath } = current;
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

      endPath.replaceWith(
        t.conditionalExpression(
          t.logicalExpression(
            "||",
            t.binaryExpression(
              "===",
              t.assignmentExpression("=", baseRef, startingNode),
              t.nullLiteral(),
            ),
            t.binaryExpression("===", baseRef, scope.buildUndefinedNode()),
          ),
          scope.buildUndefinedNode(),
          regular,
        ),
      );

      if (context) {
        const endParent = endParentPath.node;
        endParentPath.replaceWith(
          t.optionalCallExpression(
            t.optionalMemberExpression(
              endParent.callee,
              t.identifier("call"),
              endParent.computed,
              true,
            ),
            [context, ...endParent.arguments],
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

        value.left = t.assignmentExpression("=", t.cloneNode(ref), value.left);

        parentPath.replaceWith(
          t.sequenceExpression([this.set(member, value), t.cloneNode(ref)]),
        );
      }
      return;
    }

    // MEMBER = VALUE   ->   _set(MEMBER, VALUE)
    // MEMBER += VALUE   ->   _set(MEMBER, _get(MEMBER) + VALUE)
    if (parentPath.isAssignmentExpression({ left: node })) {
      if (this.simpleSet) {
        member.replaceWith(this.simpleSet(member));
        return;
      }

      const { operator, right } = parent;
      let value = right;

      if (operator !== "=") {
        // Give the state handler a chance to memoise the member, since we'll
        // reference it twice. The second access (the set) should do the memo
        // assignment.
        this.memoise(member, 2);

        value = t.binaryExpression(
          operator.slice(0, -1),
          this.get(member),
          value,
        );
      }

      parentPath.replaceWith(this.set(member, value));
      return;
    }

    // MEMBER(ARGS) -> _call(MEMBER, ARGS)
    if (parentPath.isCallExpression({ callee: node })) {
      parentPath.replaceWith(this.call(member, parent.arguments));
      return;
    }

    // { KEY: MEMBER } = OBJ -> { KEY: _destructureSet(MEMBER) } = OBJ
    // { KEY: MEMBER = _VALUE } = OBJ -> { KEY: _destructureSet(MEMBER) = _VALUE } = OBJ
    // {...MEMBER} -> {..._destructureSet(MEMBER)}
    //
    // [MEMBER] = ARR -> [_destructureSet(MEMBER)] = ARR
    // [MEMBER = _VALUE] = ARR -> [_destructureSet(MEMBER) = _VALUE] = ARR
    // [...MEMBER] -> [..._destructureSet(MEMBER)]
    if (
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

    // MEMBER   ->   _get(MEMBER)
    member.replaceWith(this.get(member));
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
