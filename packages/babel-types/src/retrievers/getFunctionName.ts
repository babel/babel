import type * as t from "../index.ts";

import {
  isAssignmentExpression,
  isClassMethod,
  isIdentifier,
  isLiteral,
  isNullLiteral,
  isObjectMethod,
  isObjectProperty,
  isPrivateName,
  isRegExpLiteral,
  isTemplateLiteral,
  isVariableDeclarator,
} from "../validators/generated/index.ts";

function getNameFromLiteralId(id: t.Literal): string {
  if (isNullLiteral(id)) {
    return "null";
  }

  if (isRegExpLiteral(id)) {
    return `/${id.pattern}/${id.flags}`;
  }

  if (isTemplateLiteral(id)) {
    return id.quasis.map(quasi => quasi.value.raw).join("");
  }

  if (id.value !== undefined) {
    return String(id.value);
  }

  return null;
}

function getObjectMemberKey(
  node: t.ObjectProperty | t.ObjectMethod | t.ClassProperty | t.ClassMethod,
): t.Expression | t.PrivateName {
  if (!node.computed || isLiteral(node.key)) {
    return node.key;
  }
}

type GetFunctionNameResult = {
  name: string;
  originalNode: t.Node;
} | null;

export default function getFunctionName(
  node: t.ObjectMethod | t.ClassMethod,
): GetFunctionNameResult;
export default function getFunctionName(
  node: t.Function | t.Class,
  parent: t.Node,
): GetFunctionNameResult;
export default function getFunctionName(
  node: t.Function | t.Class,
  parent?: t.Node,
): GetFunctionNameResult {
  if ("id" in node && node.id) {
    return {
      name: node.id.name,
      originalNode: node.id,
    };
  }

  let prefix = "";

  let id;
  if (isObjectProperty(parent, { value: node })) {
    // { foo: () => {} };
    id = getObjectMemberKey(parent);
  } else if (isObjectMethod(node) || isClassMethod(node)) {
    // { foo() {} };
    id = getObjectMemberKey(node);
    if (node.kind === "get") prefix = "get ";
    else if (node.kind === "set") prefix = "set ";
  } else if (isVariableDeclarator(parent, { init: node })) {
    // let foo = function () {};
    id = parent.id;
  } else if (isAssignmentExpression(parent, { operator: "=", right: node })) {
    // foo = function () {};
    id = parent.left;
  }

  if (!id) return null;

  const name = isLiteral(id)
    ? getNameFromLiteralId(id)
    : isIdentifier(id)
      ? id.name
      : isPrivateName(id)
        ? id.id.name
        : null;
  if (name == null) return null;

  return { name: prefix + name, originalNode: id };
}
