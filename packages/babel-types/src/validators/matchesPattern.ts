import {
  isIdentifier,
  isMetaProperty,
  isMemberExpression,
  isPrivateName,
  isStringLiteral,
  isSuper,
  isThisExpression,
} from "./generated/index.ts";
import type * as t from "../index.ts";

function isMemberExpressionLike(
  node: t.Node | undefined | null,
): node is t.MemberExpression | t.MetaProperty {
  return isMemberExpression(node) || isMetaProperty(node);
}

/**
 * Determines whether or not the input node `member` matches the
 * input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */
export default function matchesPattern(
  member: t.Node | null | undefined,
  match: string | string[],
  allowPartial?: boolean,
): boolean {
  // not a member expression
  if (!isMemberExpressionLike(member)) return false;

  const parts = Array.isArray(match) ? match : match.split(".");
  const nodes = [];

  let node;
  for (
    node = member;
    isMemberExpressionLike(node);
    node = (node as t.MemberExpression).object ?? (node as t.MetaProperty).meta
  ) {
    nodes.push(node.property);
  }
  nodes.push(node);

  if (nodes.length < parts.length) return false;
  if (!allowPartial && nodes.length > parts.length) return false;

  for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
    const node = nodes[j];
    let value;
    if (isIdentifier(node)) {
      value = node.name;
    } else if (isStringLiteral(node)) {
      value = node.value;
    } else if (isThisExpression(node)) {
      value = "this";
    } else if (isSuper(node)) {
      value = "super";
    } else if (isPrivateName(node)) {
      value = "#" + node.id.name;
    } else {
      return false;
    }

    if (parts[i] !== value) return false;
  }

  return true;
}
