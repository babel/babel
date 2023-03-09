import type { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

/**
 * A small utility to check if a file qualifies as a module.
 */
export default function isModule(path: NodePath<t.Program>) {
  return path.node.sourceType === "module";
}

export function isModuleOrCts(path: NodePath<t.Program>) {
  const { node } = path;
  return (
    node.sourceType === "module" ||
    node.body.some(node => t.isImportOrExportDeclaration(node))
  );
}
