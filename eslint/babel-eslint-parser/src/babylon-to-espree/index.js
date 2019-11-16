"use strict";

const convertTokens = require("./convertTokens");
const convertComments = require("./convertComments");
const convertAST = require("./convertAST");

module.exports = function(ast, traverse, tt, code) {
  ast.tokens = convertTokens(ast.tokens, tt, code);
  convertComments(ast.comments);
  convertAST(ast, traverse, code);
};
