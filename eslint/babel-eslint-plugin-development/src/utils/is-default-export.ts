import type { Node } from "estree";
export default function isDefaultExport(node: Node): boolean {
  if (node.type === "ExportDefaultDeclaration") {
    return true;
  }

  if (
    node.type === "AssignmentExpression" &&
    node.left.type === "MemberExpression" &&
    node.left.object.type === "Identifier" &&
    node.left.object.name === "module" &&
    node.left.property.type === "Identifier" &&
    node.left.property.name === "exports" &&
    !node.left.computed
  ) {
    return true;
  }

  return false;
}
