"use strict";

module.exports = function(ast) {
  ast.type = "Program";
  ast.sourceType = ast.program.sourceType;
  ast.directives = ast.program.directives;
  ast.body = ast.program.body;
  delete ast.program;

  if (ast.comments.length) {
    const lastComment = ast.comments[ast.comments.length - 1];

    if (!ast.tokens.length) {
      // if no tokens, the program starts at the end of the last comment
      ast.start = lastComment.end;
      ast.loc.start.line = lastComment.loc.end.line;
      ast.loc.start.column = lastComment.loc.end.column;
    } else {
      const lastToken = ast.tokens[ast.tokens.length - 1];

      if (lastComment.end > lastToken.end) {
        // If there is a comment after the last token, the program ends at the
        // last token and not the comment
        ast.range[1] = lastToken.end;
        ast.loc.end.line = lastToken.loc.end.line;
        ast.loc.end.column = lastToken.loc.end.column;
      }
    }
  } else {
    if (!ast.tokens.length) {
      ast.loc.start.line = 1;
      ast.loc.end.line = 1;
    }
  }

  if (ast.body && ast.body.length > 0) {
    ast.loc.start.line = ast.body[0].loc.start.line;
    ast.range[0] = ast.body[0].start;
  }
};
