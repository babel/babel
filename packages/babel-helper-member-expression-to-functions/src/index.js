import * as t from "@babel/types";

const handle = {
  handle(member) {
    const { node, parent, parentPath } = member;

    // MEMBER++   ->   _set(MEMBER, (_ref = Number(_get(MEMBER))) + 1), _ref
    // ++MEMBER   ->   _set(MEMBER, Number(_get(MEMBER)) + 1)
    if (parentPath.isUpdateExpression({ argument: node })) {
      const { operator, prefix } = parent;

      const value = t.binaryExpression(
        operator[0],
        t.callExpression(t.identifier("Number"), [this.get(member)]),
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

    // MEMBER = 1   ->   _set(MEMBER, 1)
    // MEMBER += 1   ->   _set(MEMBER, _get(MEMBER) + 1)
    if (parentPath.isAssignmentExpression({ left: node })) {
      const { operator, right } = parent;
      let value = right;

      if (operator !== "=") {
        value = t.binaryExpression(
          operator.slice(0, -1),
          this.get(member),
          value,
        );
      }

      parentPath.replaceWith(this.set(member, value));
      return;
    }

    // MEMBER(1)   ->   _call(MEMBER, [1])
    // MEMBER(1, ...args)   ->   _call(MEMBER, [1, ...args])
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
export default function memberExpressionToFunctions(path, visitor, state) {
  path.traverse(visitor, Object.assign({}, state, handle));
}
