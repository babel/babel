/*:: declare var invariant; */

import BaseParser from "./base";
import type { Comment, Node } from "../types";
import * as charCodes from "charcodes";
import type { Undone } from "./node";

/**
 * A whitespace token containing comments
 * @typedef CommentWhitespace
 * @type {object}
 * @property {number} start - the start of the whitespace token.
 * @property {number} end - the end of the whitespace token.
 * @property {Array<Comment>} comments - the containing comments
 * @property {Node | null} leadingNode - the immediately preceding AST node of the whitespace token
 * @property {Node | null} trailingNode - the immediately following AST node of the whitespace token
 * @property {Node | null} containingNode - the innermost AST node containing the whitespace
 *                                         with minimal size (|end - start|)
 */
export type CommentWhitespace = {
  start: number;
  end: number;
  comments: Array<Comment>;
  leadingNode: Node | null;
  trailingNode: Node | null;
  containingNode: Node | null;
};

/**
 * Merge comments with node's trailingComments or assign comments to be
 * trailingComments. New comments will be placed before old comments
 * because the commentStack is enumerated reversely.
 *
 * @param {Undone<Node>} node
 * @param {Array<Comment>} comments
 */
function setTrailingComments(node: Undone<Node>, comments: Array<Comment>) {
  if (node.trailingComments === undefined) {
    node.trailingComments = comments;
  } else {
    node.trailingComments.unshift(...comments);
  }
}

/**
 * Merge comments with node's leadingComments or assign comments to be
 * leadingComments. New comments will be placed before old comments
 * because the commentStack is enumerated reversely.
 *
 * @param {Undone<Node>} node
 * @param {Array<Comment>} comments
 */
function setLeadingComments(node: Undone<Node>, comments: Array<Comment>) {
  if (node.leadingComments === undefined) {
    node.leadingComments = comments;
  } else {
    node.leadingComments.unshift(...comments);
  }
}

/**
 * Merge comments with node's innerComments or assign comments to be
 * innerComments. New comments will be placed before old comments
 * because the commentStack is enumerated reversely.
 *
 * @param {Undone<Node>} node
 * @param {Array<Comment>} comments
 */
export function setInnerComments(
  node: Undone<Node>,
  comments?: Array<Comment>,
) {
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
 * @param {Undone<Node>} node
 * @param {Array<Node>} elements
 * @param {Array<Comment>} comments
 */
function adjustInnerComments(
  node: Undone<Node>,
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

    const { start: nodeStart } = node;
    // invariant: for all 0 <= j <= i, let c = commentStack[j], c must satisfy c.end < node.end
    for (; i >= 0; i--) {
      const commentWS = commentStack[i];
      const commentEnd = commentWS.end;
      if (commentEnd > nodeStart) {
        // by definition of commentWhiteSpace, this implies commentWS.start > nodeStart
        // so node can be a containingNode candidate. At this time we can finalize the comment
        // whitespace, because
        // 1) its leadingNode or trailingNode, if exists, will not change
        // 2) its containingNode have been assigned and will not change because it is the
        //    innermost minimal-sized AST node
        commentWS.containingNode = node;
        this.finalizeComment(commentWS);
        commentStack.splice(i, 1);
      } else {
        if (commentEnd === nodeStart) {
          commentWS.trailingNode = node;
        }
        // stop the loop when commentEnd <= nodeStart
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
        setLeadingComments(commentWS.trailingNode, comments);
      }
    } else {
      /*:: invariant(commentWS.containingNode !== null) */
      const { containingNode: node, start: commentStart } = commentWS;
      if (this.input.charCodeAt(commentStart - 1) === charCodes.comma) {
        // If a commentWhitespace follows a comma and the containingNode allows
        // list structures with trailing comma, merge it to the trailingComment
        // of the last non-null list element
        switch (node.type) {
          case "ObjectExpression":
          case "ObjectPattern":
          case "RecordExpression":
            adjustInnerComments(node, node.properties, commentWS);
            break;
          case "CallExpression":
          case "OptionalCallExpression":
            adjustInnerComments(node, node.arguments, commentWS);
            break;
          case "FunctionDeclaration":
          case "FunctionExpression":
          case "ArrowFunctionExpression":
          case "ObjectMethod":
          case "ClassMethod":
          case "ClassPrivateMethod":
            adjustInnerComments(node, node.params, commentWS);
            break;
          case "ArrayExpression":
          case "ArrayPattern":
          case "TupleExpression":
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

  /**
   * Drains remaining commentStack and applies finalizeComment
   * to each comment whitespace. Used only in parseExpression
   * where the top level AST node is _not_ Program
   * {@see {@link CommentsParser#finalizeComment}}
   *
   * @memberof CommentsParser
   */
  finalizeRemainingComments() {
    const { commentStack } = this.state;
    for (let i = commentStack.length - 1; i >= 0; i--) {
      this.finalizeComment(commentStack[i]);
    }
    this.state.commentStack = [];
  }

  /**
   * Reset previous node trailing comments. Used in object / class
   * property parsing. We parse `async`, `static`, `set` and `get`
   * as an identifier but may reinterpret it into an async/static/accessor
   * method later. In this case the identifier is not part of the AST and we
   * should sync the knowledge to commentStacks
   *
   * For example, when parsing */
  // async /* 1 */ function f() {}
  /*
   * the comment whitespace "* 1 *" has leading node Identifier(async). When
   * we see the function token, we create a Function node and mark "* 1 *" as
   * inner comments. So "* 1 *" should be detached from the Identifier node.
   *
   * @param {N.Node} node the last finished AST node _before_ current token
   * @returns
   * @memberof CommentsParser
   */
  resetPreviousNodeTrailingComments(node: Node) {
    const { commentStack } = this.state;
    const { length } = commentStack;
    if (length === 0) return;
    const commentWS = commentStack[length - 1];
    if (commentWS.leadingNode === node) {
      commentWS.leadingNode = null;
    }
  }

  /**
   * Attach a node to the comment whitespaces right before/after
   * the given range.
   *
   * This is used to properly attach comments around parenthesized
   * expressions as leading/trailing comments of the inner expression.
   *
   * @param {Node} node
   * @param {number} start
   * @param {number} end
   */
  takeSurroundingComments(node: Node, start: number, end: number) {
    const { commentStack } = this.state;
    const commentStackLength = commentStack.length;
    if (commentStackLength === 0) return;
    let i = commentStackLength - 1;

    for (; i >= 0; i--) {
      const commentWS = commentStack[i];
      const commentEnd = commentWS.end;
      const commentStart = commentWS.start;

      if (commentStart === end) {
        commentWS.leadingNode = node;
      } else if (commentEnd === start) {
        commentWS.trailingNode = node;
      } else if (commentEnd < start) {
        break;
      }
    }
  }
}
