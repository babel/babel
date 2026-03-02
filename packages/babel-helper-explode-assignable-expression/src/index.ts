import type { Scope } from "@babel/traverse";
import {
  assignmentExpression,
  cloneNode,
  isIdentifier,
  isLiteral,
  isMemberExpression,
  isPrivateName,
  isPureish,
  isSuper,
  memberExpression,
  toComputedKey,
} from "@babel/types";
import type * as t from "@babel/types";

function getObjRef(
  node: t.Identifier | t.MemberExpression,
  nodes: Array<t.AssignmentExpression>,
  scope: Scope,
): t.Identifier | t.Super {
  let ref;
  if (isIdentifier(node)) {
    if (scope.hasBinding(node.name)) {
      // this variable is declared in scope so we can be 100% sure
      // that evaluating it multiple times wont trigger a getter
      // or something else
      return node;
    } else {
      // could possibly trigger a getter so we need to only evaluate
      // it once
      ref = node;
    }
  } else if (isMemberExpression(node)) {
    ref = node.object;

    if (isSuper(ref) || (isIdentifier(ref) && scope.hasBinding(ref.name))) {
      // the object reference that we need to save is locally declared
      // so as per the previous comment we can be 100% sure evaluating
      // it multiple times will be safe
      // Super cannot be directly assigned so lets return it also
      return ref;
    }
  } else {
    throw new Error(`We can't explode this node type ${node["type"]}`);
  }

  const temp = scope.generateUidIdentifierBasedOnNode(ref);
  scope.push({ id: temp });
  nodes.push(assignmentExpression("=", cloneNode(temp), cloneNode(ref)));
  return temp;
}

function getPropRef(
  node: t.MemberExpression,
  nodes: Array<t.AssignmentExpression>,
  scope: Scope,
): t.Identifier | t.Literal {
  const prop = node.property;
  if (isPrivateName(prop)) {
    throw new Error(
      "We can't generate property ref for private name, please install `@babel/plugin-proposal-class-properties`",
    );
  }
  const key = toComputedKey(node, prop);
  if (isLiteral(key) && isPureish(key)) return key;

  const temp = scope.generateUidIdentifierBasedOnNode(prop);
  scope.push({ id: temp });
  nodes.push(assignmentExpression("=", cloneNode(temp), cloneNode(prop)));
  return temp;
}

// TODO(Babel 8): Remove the "file" parameter
export default function (
  node: t.Identifier | t.MemberExpression,
  nodes: Array<t.AssignmentExpression>,
  file: void,
  scope: Scope,
  allowedSingleIdent?: boolean,
): {
  uid: t.Identifier | t.MemberExpression;
  ref: t.Identifier | t.MemberExpression;
} {
  let obj;
  if (isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, scope);
  }

  let ref, uid;

  if (isIdentifier(node)) {
    ref = cloneNode(node);
    uid = obj;
  } else {
    const prop = getPropRef(node, nodes, scope);
    const computed = node.computed || isLiteral(prop);
    uid = memberExpression(cloneNode(obj), cloneNode(prop), computed);
    ref = memberExpression(cloneNode(obj), cloneNode(prop), computed);
  }

  return {
    uid: uid,
    ref: ref,
  };
}
