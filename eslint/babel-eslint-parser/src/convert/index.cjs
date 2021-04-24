const convertTokens = require("./convertTokens.cjs");
const convertComments = require("./convertComments.cjs");
const convertAST = require("./convertAST.cjs");

module.exports = function (ast, code, tokLabels, visitorKeys) {
  ast.tokens = convertTokens(ast.tokens, code, tokLabels);
  convertComments(ast.comments);
  convertAST(ast, visitorKeys);
};
