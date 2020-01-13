import convertTokens from "./convertTokens";
import convertComments from "./convertComments";
import convertAST from "./convertAST";

export default function(ast, code) {
  ast.tokens = convertTokens(ast.tokens, code);
  convertComments(ast.comments);
  convertAST(ast, code);
}
