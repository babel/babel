const convertTokens = require("./convertTokens.cjs");
const convertComments = require("./convertComments.cjs");
const convertAST = require("./convertAST.cjs");

exports.ast = function convert(ast, code, tokLabels, visitorKeys) {
  ast.tokens = convertTokens(ast.tokens, code, tokLabels);
  convertComments(ast.comments);
  convertAST(ast, visitorKeys);
  return ast;
};

exports.error = function convertError(err) {
  if (err instanceof SyntaxError) {
    // @ts-expect-error The lineNumber, column and loc properties don't exist on SyntaxError.
    err.lineNumber = err.loc.line;
    // @ts-expect-error The lineNumber, column and loc properties don't exist on SyntaxError.
    err.column = err.loc.column;
  }
  return err;
};
