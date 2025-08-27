import type { NodePath, Visitor } from "@babel/traverse";
import {
  LOGICAL_OPERATORS,
  arrowFunctionExpression,
  assignmentExpression,
  binaryExpression,
  booleanLiteral,
  callExpression,
  cloneNode,
  conditionalExpression,
  identifier,
  isMemberExpression,
  isOptionalCallExpression,
  isOptionalMemberExpression,
  isUpdateExpression,
  logicalExpression,
  memberExpression,
  nullLiteral,
  optionalCallExpression,
  optionalMemberExpression,
  sequenceExpression,
  updateExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import { willPathCastToBoolean } from "./util.ts";

class AssignmentMemoiser {
  private _map: WeakMap<t.Expression, { count: number; value: t.Identifier }>;
  constructor() {
    this._map = new WeakMap();
  }

  has(key: t.Expression) {
    return this._map.has(key);
  }

  get(key: t.Expression) {
    if (!this.has(key)) return;

    const record = this._map.get(key);
    const { value } = record;

    record.count--;
    if (record.count === 0) {
      // The `count` access is the outermost function call (hopefully), so it
      // does the assignment.
      return assignmentExpression("=", value, key);
    }
    return value;
  }

  set(key: t.Expression, value: t.Identifier, count: number) {
    return this._map.set(key, { count, value });
  }
}

function toNonOptional(
  path: NodePath<t.Expression>,
  base: t.Expression,
): t.Expression {
  const { node } = path;
  if (isOptionalMemberExpression(node)) {
    return memberExpression(base, node.property, node.computed);
  }

  if (path.isOptionalCallExpression()) {
    const callee = path.get("callee");
    if (path.node.optional && callee.isOptionalMemberExpression()) {
      // object must be a conditional expression because the optional private access in object has been transformed
      const object = callee.node.object as t.ConditionalExpression;
      const context = path.scope.maybeGenerateMemoised(object);
      callee
        .get("object")
        .replaceWith(assignmentExpression("=", context, object));

      return callExpression(memberExpression(base, identifier("call")), [
        context,
        ...path.node.arguments,
      ]);
    }

    return callExpression(base, path.node.arguments);
  }

  return path.node;
}

// Determines if the current path is in a detached tree. This can happen when
// we are iterating on a path, and replace an ancestor with a new node. Babel
// doesn't always stop traversing the old node tree, and that can cause
// inconsistencies.
function isInDetachedTree(path: NodePath) {
  while (path) {
    if (path.isProgram()) break;

    const { parentPath, container, listKey } = path;
    const parentNode = parentPath.node;
    if (listKey) {
      if (
        container !==
        // @ts-expect-error listKey must be a valid parent node key
        parentNode[listKey]
      ) {
        return true;
      }
    } else {
      if (container !== parentNode) return true;
    }

    path = parentPath;
  }

  return false;
}

type Member = NodePath<t.OptionalMemberExpression | t.MemberExpression>;

const handle = {
  memoise() {
    // noop.
  },

  handle(this: HandlerState, member: Member, noDocumentAll: boolean) {
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
      const endPath = member.find(({ node, parent }) => {
        if (isOptionalMemberExpression(parent)) {
          // We need to check `parent.object` since we could be inside the
          // computed expression of a `bad?.[FOO?.BAR]`. In this case, the
          // endPath is the `FOO?.BAR` member itself.
          return parent.optional || parent.object !== node;
        }
        if (isOptionalCallExpression(parent)) {
          // Checking `parent.callee` since we could be in the arguments, eg
          // `bad?.(FOO?.BAR)`.
          // Also skip `FOO?.BAR` in `FOO?.BAR?.()` since we need to transform the optional call to ensure proper this
          return (
            // In FOO?.#BAR?.(), endPath points the optional call expression so we skip FOO?.#BAR
            (node !== member.node && parent.optional) || parent.callee !== node
          );
        }
        return true;
      }) as NodePath<t.OptionalMemberExpression>;

      // Replace `function (a, x = a.b?.#c) {}` to `function (a, x = (() => a.b?.#c)() ){}`
      // so the temporary variable can be injected in correct scope
      // This can be further optimized to avoid unnecessary IIFE
      if (scope.path.isPattern()) {
        endPath.replaceWith(
          // The injected member will be queued and eventually transformed when visited
          callExpression(arrowFunctionExpression([], endPath.node), []),
        );
        return;
      }

      const willEndPathCastToBoolean = willPathCastToBoolean(endPath);

      const rootParentPath = endPath.parentPath;
      if (rootParentPath.isUpdateExpression({ argument: node })) {
        throw member.buildCodeFrameError(`can't handle update expression`);
      }
      const isAssignment = rootParentPath.isAssignmentExpression({
        left: endPath.node,
      });
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
      let startingOptional: NodePath<t.Expression> = member;
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

      const startingNode = startingOptional.isOptionalMemberExpression()
        ? startingOptional.node.object
        : startingOptional.node.callee;
      const baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode);
      const baseRef = baseNeedsMemoised ?? startingNode;

      // Compute parentIsOptionalCall before `startingOptional` is replaced
      // as `node` may refer to `startingOptional.node` before replaced.
      const parentIsOptionalCall = parentPath.isOptionalCallExpression({
        callee: node,
      });
      // here we use a function to wrap `parentIsOptionalCall` to get type
      // for parent, do not use it anywhere else
      // See https://github.com/microsoft/TypeScript/issues/10421
      const isOptionalCall = (
        parent: t.Node,
      ): parent is t.OptionalCallExpression => parentIsOptionalCall;
      // if parentIsCall is true, it implies that node.extra.parenthesized is always true
      const parentIsCall = parentPath.isCallExpression({ callee: node });
      startingOptional.replaceWith(toNonOptional(startingOptional, baseRef));
      if (isOptionalCall(parent)) {
        if (parent.optional) {
          parentPath.replaceWith(this.optionalCall(member, parent.arguments));
        } else {
          parentPath.replaceWith(this.call(member, parent.arguments));
        }
      } else if (parentIsCall) {
        // `(a?.#b)()` to `(a == null ? void 0 : a.#b.bind(a))()`
        member.replaceWith(this.boundGet(member));
      } else if (
        (process.env.BABEL_8_BREAKING || this.delete) &&
        parentPath.isUnaryExpression({ operator: "delete" })
      ) {
        parentPath.replaceWith(this.delete(member));
      } else if (parentPath.isAssignmentExpression()) {
        // `a?.#b = c` to `(a == null ? void 0 : a.#b = c)`
        handleAssignment(this, member, parentPath);
      } else {
        member.replaceWith(this.get(member));
      }

      let regular: t.Expression = member.node;
      for (let current: NodePath = member; current !== endPath; ) {
        const parentPath = current.parentPath as NodePath<t.Expression>;
        // skip transforming `Foo.#BAR?.call(FOO)`
        if (
          parentPath === endPath &&
          isOptionalCall(parent) &&
          parent.optional
        ) {
          regular = parentPath.node;
          break;
        }
        regular = toNonOptional(parentPath, regular);
        current = parentPath;
      }

      let context: t.Identifier;
      const endParentPath = endPath.parentPath as NodePath<t.Expression>;
      if (
        isMemberExpression(regular) &&
        endParentPath.isOptionalCallExpression({
          callee: endPath.node,
          optional: true,
        })
      ) {
        const { object } = regular;
        context = member.scope.maybeGenerateMemoised(object);
        if (context) {
          regular.object = assignmentExpression(
            "=",
            context,
            // object must not be Super when `context` is an identifier
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            object as t.Expression,
          );
        }
      }

      let replacementPath: NodePath = endPath;
      if (isDeleteOperation || isAssignment) {
        replacementPath = endParentPath;
        regular = endParentPath.node;
      }

      const baseMemoised = baseNeedsMemoised
        ? assignmentExpression(
            "=",
            // When base needs memoised, the baseRef must be an identifier
            cloneNode(baseRef as t.Identifier),
            cloneNode(startingNode),
          )
        : cloneNode(baseRef);

      if (willEndPathCastToBoolean) {
        let nonNullishCheck;
        if (noDocumentAll) {
          nonNullishCheck = binaryExpression("!=", baseMemoised, nullLiteral());
        } else {
          nonNullishCheck = logicalExpression(
            "&&",
            binaryExpression("!==", baseMemoised, nullLiteral()),
            binaryExpression(
              "!==",
              cloneNode(baseRef),
              scope.buildUndefinedNode(),
            ),
          );
        }
        replacementPath.replaceWith(
          logicalExpression("&&", nonNullishCheck, regular),
        );
      } else {
        let nullishCheck;
        if (noDocumentAll) {
          nullishCheck = binaryExpression("==", baseMemoised, nullLiteral());
        } else {
          nullishCheck = logicalExpression(
            "||",
            binaryExpression("===", baseMemoised, nullLiteral()),
            binaryExpression(
              "===",
              cloneNode(baseRef),
              scope.buildUndefinedNode(),
            ),
          );
        }

        replacementPath.replaceWith(
          conditionalExpression(
            nullishCheck,
            isDeleteOperation
              ? booleanLiteral(true)
              : scope.buildUndefinedNode(),
            regular,
          ),
        );
      }

      // context and isDeleteOperation can not be both truthy
      if (context) {
        const endParent = endParentPath.node as t.OptionalCallExpression;
        endParentPath.replaceWith(
          optionalCallExpression(
            optionalMemberExpression(
              endParent.callee,
              identifier("call"),
              false,
              true,
            ),
            [cloneNode(context), ...endParent.arguments],
            false,
          ),
        );
      }

      return;
    }

    // MEMBER++   ->   _set(MEMBER, (ref = _get(MEMBER), ref2 = ref++, ref)), ref2
    // ++MEMBER   ->   _set(MEMBER, (ref = _get(MEMBER), ++ref))
    if (isUpdateExpression(parent, { argument: node })) {
      if (this.simpleSet) {
        member.replaceWith(this.simpleSet(member));
        return;
      }

      const { operator, prefix } = parent;

      // Give the state handler a chance to memoise the member, since we'll
      // reference it twice. The second access (the set) should do the memo
      // assignment.
      this.memoise(member, 2);

      const ref = scope.generateUidIdentifierBasedOnNode(node);
      scope.push({ id: ref });

      const seq: t.Expression[] = [
        // ref = _get(MEMBER)
        assignmentExpression("=", cloneNode(ref), this.get(member)),
      ];

      if (prefix) {
        seq.push(updateExpression(operator, cloneNode(ref), prefix));

        // (ref = _get(MEMBER), ++ref)
        const value = sequenceExpression(seq);
        parentPath.replaceWith(this.set(member, value));

        return;
      } else {
        const ref2 = scope.generateUidIdentifierBasedOnNode(node);
        scope.push({ id: ref2 });

        seq.push(
          assignmentExpression(
            "=",
            cloneNode(ref2),
            updateExpression(operator, cloneNode(ref), prefix),
          ),
          cloneNode(ref),
        );

        // (ref = _get(MEMBER), ref2 = ref++, ref)
        const value = sequenceExpression(seq);
        parentPath.replaceWith(
          sequenceExpression([this.set(member, value), cloneNode(ref2)]),
        );

        return;
      }
    }

    // MEMBER = VALUE   ->   _set(MEMBER, VALUE)
    // MEMBER += VALUE   ->   _set(MEMBER, _get(MEMBER) + VALUE)
    // MEMBER ??= VALUE   ->   _get(MEMBER) ?? _set(MEMBER, VALUE)
    if (parentPath.isAssignmentExpression({ left: node })) {
      handleAssignment(this, member, parentPath);
      return;
    }

    // MEMBER(ARGS) -> _call(MEMBER, ARGS)
    if (parentPath.isCallExpression({ callee: node })) {
      parentPath.replaceWith(this.call(member, parentPath.node.arguments));
      return;
    }

    // MEMBER?.(ARGS) -> _optionalCall(MEMBER, ARGS)
    if (parentPath.isOptionalCallExpression({ callee: node })) {
      // Replace `function (a, x = a.b.#c?.()) {}` to `function (a, x = (() => a.b.#c?.())() ){}`
      // so the temporary variable can be injected in correct scope
      // This can be further optimized to avoid unnecessary IIFE
      if (scope.path.isPattern()) {
        parentPath.replaceWith(
          // The injected member will be queued and eventually transformed when visited
          callExpression(arrowFunctionExpression([], parentPath.node), []),
        );
        return;
      }
      parentPath.replaceWith(
        this.optionalCall(member, parentPath.node.arguments),
      );
      return;
    }

    // delete MEMBER -> _delete(MEMBER)
    if (
      (process.env.BABEL_8_BREAKING || this.delete) &&
      parentPath.isUnaryExpression({ operator: "delete" })
    ) {
      parentPath.replaceWith(this.delete(member));
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

function handleAssignment(
  state: HandlerState,
  member: NodePath<t.MemberExpression | t.OptionalMemberExpression>,
  parentPath: NodePath<t.AssignmentExpression>,
) {
  if (state.simpleSet) {
    member.replaceWith(state.simpleSet(member));
    return;
  }

  const { operator, right: value } = parentPath.node;

  if (operator === "=") {
    parentPath.replaceWith(state.set(member, value));
  } else {
    const operatorTrunc = operator.slice(0, -1);
    if (LOGICAL_OPERATORS.includes(operatorTrunc)) {
      // Give the state handler a chance to memoise the member, since we'll
      // reference it twice. The first access (the get) should do the memo
      // assignment.
      state.memoise(member, 1);
      parentPath.replaceWith(
        logicalExpression(
          operatorTrunc as t.LogicalExpression["operator"],
          state.get(member),
          state.set(member, value),
        ),
      );
    } else {
      // Here, the second access (the set) is evaluated first.
      state.memoise(member, 2);
      parentPath.replaceWith(
        state.set(
          member,
          binaryExpression(
            operatorTrunc as t.BinaryExpression["operator"],
            state.get(member),
            value,
          ),
        ),
      );
    }
  }
}

export interface Handler<State> {
  memoise?(
    this: HandlerState<State> & State,
    member: Member,
    count: number,
  ): void;
  destructureSet(
    this: HandlerState<State> & State,
    member: Member,
  ): t.Expression;
  boundGet(this: HandlerState<State> & State, member: Member): t.Expression;
  simpleSet?(this: HandlerState<State> & State, member: Member): t.Expression;
  get(this: HandlerState<State> & State, member: Member): t.Expression;
  set(
    this: HandlerState<State> & State,
    member: Member,
    value: t.Expression,
  ): t.Expression;
  call(
    this: HandlerState<State> & State,
    member: Member,
    args: t.CallExpression["arguments"],
  ): t.Expression;
  optionalCall(
    this: HandlerState<State> & State,
    member: Member,
    args: t.OptionalCallExpression["arguments"],
  ): t.Expression;
  delete(this: HandlerState<State> & State, member: Member): t.Expression;
}

export interface HandlerState<State = object> extends Handler<State> {
  handle(
    this: HandlerState<State> & State,
    member: Member,
    noDocumentAll?: boolean,
  ): void;
  memoiser: AssignmentMemoiser;
}

// We do not provide a default traversal visitor
// Instead, caller passes one, and must call `state.handle` on the members
// it wishes to be transformed.
// Additionally, the caller must pass in a state object with at least
// get, set, and call methods.
// Optionally, a memoise method may be defined on the state, which will be
// called when the member is a self-referential update.
export default function memberExpressionToFunctions<CustomState extends object>(
  path: NodePath,
  visitor: Visitor<HandlerState<CustomState> & CustomState>,
  state: Handler<CustomState> & CustomState,
) {
  path.traverse(visitor, {
    ...handle,
    ...state,
    memoiser: new AssignmentMemoiser(),
  });
}
