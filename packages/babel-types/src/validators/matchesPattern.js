import { isIdentifier, isMemberExpression, isStringLiteral } from "./generated";

/**
 * Determines whether or not the input node `member` matches the
 * input `match`.
 *
 * For example, given the match `React.createClass` it would match the
 * parsed nodes of `React.createClass` and `React["createClass"]`.
 */
export default function matchesPattern(
  member: Object,
  match: string | Array<string>,
  allowPartial?: boolean,
): boolean {
  // not a member expression
  if (!isMemberExpression(member)) return false;

  const parts = Array.isArray(match) ? match : match.split(".");
  const nodes = [];

  let node;
  for (node = member; isMemberExpression(node); node = node.object) {
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
    } else {
      return false;
    }

    if (parts[i] !== value) return false;
  }

  return true;
}
