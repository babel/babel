import type { NodePath } from "@babel/core";

export function isReference(path: NodePath) {
  return (
    path.isReferenced() ||
    path.parentPath.isAssignmentExpression({ left: path.node })
  );
}
