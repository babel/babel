import * as t from "babel-types";

/**
 * Normalize an AST.
 *
 * - Wrap `Program` node with a `File` node.
 */

export default function (
  ast: Object,
  comments?: Array<Object>,
  tokens?: Array<Object>,
) {
  if (ast) {
    if (ast.type === "Program") {
      return t.file(ast, comments || [], tokens || []);
    } else if (ast.type === "File") {
      return ast;
    }
  }

  throw new Error("Not a valid ast?");
}
