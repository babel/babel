import * as t from "../types";

/**
 * Normalize an AST.
 *
 * - Wrap `Program` node with a `File` node.
 */

export default function (ast, comments, tokens) {
  if (ast && ast.type === "Program") {
    return t.file(ast, comments || [], tokens || []);
  } else {
    throw new Error("Not a valid ast?");
  }
}
