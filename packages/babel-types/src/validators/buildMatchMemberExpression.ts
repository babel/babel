import matchesPattern from "./matchesPattern.ts";
import type * as t from "../index.ts";

/**
 * Build a function that when called will return whether or not the
 * input `node` `MemberExpression` matches the input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */
export default function buildMatchMemberExpression(
  match: string,
  allowPartial?: boolean,
) {
  const parts = match.split(".");

  return (member: t.Node) => matchesPattern(member, parts, allowPartial);
}
