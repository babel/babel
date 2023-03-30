import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";

/**
 * A small utility to check if a file qualifies as a module.
 */
export default function isModule(path: NodePath<t.Program>) {
  return path.node.sourceType === "module";
}
