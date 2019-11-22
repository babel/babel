import convertTokens from "./convertTokens";
import convertComments from "./convertComments";
import convertAST from "./convertAST";

export default function(ast, traverse, tt, code) {
  ast.tokens = convertTokens(ast.tokens, tt, code);
  convertComments(ast.comments);
  convertAST(ast, traverse, code);
}
