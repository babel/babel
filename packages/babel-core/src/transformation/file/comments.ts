import type * as t from "@babel/types";
import { isImportDeclaration } from "@babel/types";

export function processCommentsBefore(program: t.Program) {
  /**
   * Keep the comments at the beginning of the file and put them in the correct place.
   * https://github.com/babel/babel/issues/11971
   *
   * Example + transform-modules-commonjs:
   *
   * // This file xxx
   * import react from "react";
   *
   * ↓↓↓↓↓↓↓↓↓
   *
   * var _react = _interopRequireDefault(require("react"));
   */
  if (
    program.directives.length === 0 &&
    program.body[0]?.leadingComments?.length
  ) {
    program.innerComments = program.body[0].leadingComments;
  }

  /**
   * Remove trailing comments from the last import
   * https://github.com/babel/babel/issues/15156
   *
   * Example:
   *
   * import a from "a";
   * // comment
   * user code
   *
   * ↓↓↓↓↓↓↓↓↓
   *
   * import a from "a";
   * // comment
   * import b from "b"; <-- added by plugins
   * import c from "c"; <-- added by plugins
   * import d from "d"; <-- added by plugins
   * user code
   */
  const body = program.body;
  let lastNode;
  for (const node of body) {
    if (!lastNode) {
      lastNode = node;
      continue;
    }
    if (
      !isImportDeclaration(node) &&
      isImportDeclaration(lastNode) &&
      lastNode.trailingComments?.length &&
      lastNode.trailingComments === node.leadingComments // This is a hack, because the comments are the same array
    ) {
      const trailingComments = lastNode.trailingComments;
      const commentLoc = trailingComments[0].loc;
      if (
        lastNode.loc &&
        node.loc &&
        commentLoc &&
        commentLoc.start.line - lastNode.loc.end.line >=
          node.loc.start.line - commentLoc.end.line
      ) {
        lastNode.trailingComments = [];
      }
    }
  }
}

export function processCommentsAfter(program: t.Program) {
  if (
    program.body.length &&
    program.innerComments?.length &&
    program.body[0].leadingComments?.length
  ) {
    const leadingComments = program.body[0].leadingComments;
    program.innerComments = program.innerComments.filter(
      comment => !leadingComments.includes(comment),
    );
  }
}
