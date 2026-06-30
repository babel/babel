import type * as t from "../index.ts";

export default function traverseAssignmentIdentifiers(
  node: t.Node | undefined | null,
  callback: (id: t.Identifier) => void,
) {
  if (node == null) return;
  switch (node.type) {
    case "Identifier":
      callback(node);
      break;

    case "ArrayPattern":
      for (const element of node.elements) {
        traverseAssignmentIdentifiers(element, callback);
      }
      break;

    case "AssignmentExpression":
    case "AssignmentPattern":
    case "ForInStatement":
    case "ForOfStatement":
      traverseAssignmentIdentifiers(node.left, callback);
      break;

    case "ObjectPattern":
      for (const property of node.properties) {
        traverseAssignmentIdentifiers(property, callback);
      }
      break;

    case "ObjectProperty":
      traverseAssignmentIdentifiers(node.value, callback);
      break;

    case "UnaryExpression":
      if (node.operator !== "delete") break;
    // fall through
    case "RestElement":
    case "UpdateExpression":
      traverseAssignmentIdentifiers(node.argument, callback);

      break;
  }
}
