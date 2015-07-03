import * as t from "../types";

/**
 * [Please add a description.]
 */

export default function (ast, comments, tokens) {
  if (ast && ast.type === "Program") {
    return t.file(ast, comments || [], tokens || []);
  } else {
    throw new Error("Not a valid ast?");
  }
}
