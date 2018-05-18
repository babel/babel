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

const handle = {
  memoise() {
    // noop.
  },

  handle(member) {
    const { node, parent, parentPath } = member;

    // MEMBER++   ->   _set(MEMBER, (_ref = (+_get(MEMBER))) + 1), _ref
    // ++MEMBER   ->   _set(MEMBER, (+_get(MEMBER)) + 1)
    if (parentPath.isUpdateExpression({ argument: node })) {
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

    // MEMBER(ARGS)   ->   _call(MEMBER, ARGS)
    if (parentPath.isCallExpression({ callee: node })) {
      const { arguments: args } = parent;

      parentPath.replaceWith(this.call(member, args));
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
