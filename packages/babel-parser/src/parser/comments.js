// @flow

/*:: declare var invariant; */

import BaseParser from "./base";
import type { Comment, Node } from "../types";
import * as charCodes from "charcodes";

/**
 * A whitespace token containing comments
 * @typedef CommentWhitespace
 * @type {object}
 * @property {number} start - the start of the whitespace token.
 * @property {number} end - the end of the whitespace token.
 * @property {Array<Comment>} comments - the containing comments
 * @property {Node | null} leadingNode - the immediately preceding AST node of the whitespace token
 * @property {Node | null} trailingNode - the immediately following AST node of the whitespace token
 * @property {Node | null} containerNode - the innermost AST node containing the whitespace
 *                                         with minimal size (|end - start|)
 */
export type CommentWhitespace = {
  start: number,
  end: number,
  comments: Array<Comment>,
  leadingNode: Node | null,
  trailingNode: Node | null,
  containerNode: Node | null,
};
/**
 * Merge comments with node's trailingComments or assign comments to be
 * trailingComments.
 *
 * @param {Node} node
 * @param {Array<Comment>} comments
 */
function setTrailingComments(node: Node, comments: Array<Comment>) {
  if (node.trailingComments === undefined) {
    node.trailingComments = comments;
  } else {
    node.trailingComments.unshift(...comments);
  }
}

/**
 * Merge comments with node's innerComments or assign comments to be
 * innerComments.
 *
 * @param {Node} node
 * @param {Array<Comment>} comments
 */
function setInnerComments(node: Node, comments: Array<Comment>) {
  if (node.innerComments === undefined) {
    node.innerComments = comments;
  } else {
    node.innerComments.unshift(...comments);
  }
}

/**
 * Given node and elements array, if elements has non-null element,
 * merge comments to its trailingComments, otherwise merge comments
 * to node's innerComments
 *
 * @param {Node} node
 * @param {Array<Node>} elements
 * @param {Array<Comment>} comments
 */
function adjustInnerComments(
  node: Node,
  elements: Array<Node>,
  commentWS: CommentWhitespace,
) {
  let lastElement = null;
  let i = elements.length;
  while (lastElement === null && i > 0) {
    lastElement = elements[--i];
  }
  if (lastElement === null || lastElement.start > commentWS.start) {
    setInnerComments(node, commentWS.comments);
  } else {
    setTrailingComments(lastElement, commentWS.comments);
  }
}

/** @class CommentsParser */
export default class CommentsParser extends BaseParser {
  addComment(comment: Comment): void {
    if (this.filename) comment.loc.filename = this.filename;
    this.state.comments.push(comment);
  }

  /**
   * Given a newly created AST node _n_, attach _n_ to a comment whitespace _w_ if applicable
   * {@see {@link CommentWhitespace}}
   *
   * @param {Node} node
   * @returns {void}
   * @memberof CommentsParser
   */
  processComment(node: Node): void {
    const { commentStack } = this.state;
    const commentStackLength = commentStack.length;
    if (commentStackLength === 0) return;
    let i = commentStackLength - 1;
    const lastCommentWS = commentStack[i];

    if (lastCommentWS.start === node.end) {
      lastCommentWS.leadingNode = node;
      i--;
    }

    // invariant: for all 0 <= j <= i, let c = commentStack[j], c must satisfy c.end < node.end
    const nodeStart = node.start;
    for (; i >= 0; i--) {
      const commentWS = commentStack[i];
      const commentEnd = commentWS.end;
      if (commentEnd > nodeStart) {
        // by definition of commentWhiteSpace, this implies commentWS.start > nodeStart
        // so node can be a containerNode candidate
        const { containerNode } = commentWS;
        if (containerNode === null) {
          commentWS.containerNode = node;
        } else {
          // a commentWhitespace is considered _attached_ if
          // 1) its leadingNode or trailingNode, if exists, will not change
          // 2) its containerNode have the minimum node length among all other
          //    nodes containing the commentWhitespace
          // In other words, an attached comment whitespace have fixed associated
          // AST node and thus we can finalize the comment whitespace
          this.finalizeComment(commentWS);
          commentStack.splice(i, 1);
        }
      } else {
        if (commentEnd === nodeStart) {
          commentWS.trailingNode = node;
        }
        break;
      }
    }
  }

  /**
   * Assign the comments of comment whitespaces to related AST nodes.
   * Also adjust innerComments following trailing comma.
   *
   * @memberof CommentsParser
   */
  finalizeComment(commentWS: CommentWhitespace) {
    const { comments } = commentWS;
    if (commentWS.leadingNode !== null || commentWS.trailingNode !== null) {
      if (commentWS.leadingNode !== null) {
        setTrailingComments(commentWS.leadingNode, comments);
      }
      if (commentWS.trailingNode !== null) {
        commentWS.trailingNode.leadingComments = comments;
      }
    } else {
      /*:: invariant(commentWS.containerNode !== null) */
      const { containerNode: node, start: commentStart } = commentWS;
      if (this.input.charCodeAt(commentStart - 1) === charCodes.comma) {
        // If a commentWhitespace follows a comma and the containerNode allows
        // list structures with trailing comma, merge it to the trailingComment
        // of the last non-null list element
        switch (node.type) {
          case "ObjectExpression":
          case "ObjectPattern":
            adjustInnerComments(node, node.properties, commentWS);
            break;
          case "CallExpression":
            adjustInnerComments(node, node.arguments, commentWS);
            break;
          case "ArrayExpression":
          case "ArrayPattern":
            adjustInnerComments(node, node.elements, commentWS);
            break;
          case "ExportNamedDeclaration":
          case "ImportDeclaration":
            adjustInnerComments(node, node.specifiers, commentWS);
            break;
          default: {
            setInnerComments(node, comments);
          }
        }
      } else {
        setInnerComments(node, comments);
      }
    }
  }
}
