import * as t from "../types";

/**
 * Normalize an AST.
 *
 * - Wrap `Program` node with a `File` node.
 */

export default function (ast, comments, tokens) {
  switch (ast && ast.type) {
    case "File":
      return ast;
    case "Program":
      return t.file(ast, comments || [], tokens || []);
    default:
      throw new Error("Not a valid ast?");
  }
}
