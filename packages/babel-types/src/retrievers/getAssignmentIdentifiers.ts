import type * as t from "../index.ts";

/**
 * For the given node, generate a map from assignment id names to the identifier node.
 * Unlike getBindingIdentifiers, this function does not handle declarations and imports.
 * @param node the assignment expression or forXstatement
 * @returns an object map
 * @see getBindingIdentifiers
 */
export default function getAssignmentIdentifiers(
  node: t.Node | t.Node[],
): Record<string, t.Identifier> {
  // null represents holes in an array pattern
  const search: (t.Node | null)[] = [].concat(node);
  const ids = Object.create(null);

  while (search.length) {
    const id = search.pop();
    if (!id) continue;

    switch (id.type) {
      case "ArrayPattern":
        search.push(...id.elements);
        break;

      case "AssignmentExpression":
      case "AssignmentPattern":
      case "ForInStatement":
      case "ForOfStatement":
        search.push(id.left);
        break;

      case "ObjectPattern":
        search.push(...id.properties);
        break;

      case "ObjectProperty":
        search.push(id.value);
        break;

      case "RestElement":
      case "UpdateExpression":
        search.push(id.argument);
        break;

      case "UnaryExpression":
        if (id.operator === "delete") {
          search.push(id.argument);
        }
        break;

      case "Identifier":
        ids[id.name] = id;
        break;

      default:
        break;
    }
  }

  return ids;
}
