// @flow

/*:: declare var invariant; */

import BaseParser from "./base";
import type { Comment, Node } from "../types";
import * as charCodes from "charcodes";

function setInnerComments(node: Node, comments: Array<Comment>) {
  if (node.innerComments === undefined) {
    node.innerComments = comments;
  } else {
    node.innerComments.push(...comments);
  }
}

function adjustInnerComments(
  node: Node,
  elements: Array<Node>,
  comments: Array<Comment>,
) {
  let lastElement = null;
  let i = elements.length;
  while (lastElement === null && i > 0) {
    lastElement = elements[--i];
  }
  if (lastElement === null) {
    setInnerComments(node, comments);
  } else if (lastElement.trailingComments === undefined) {
    lastElement.trailingComments = comments;
  } else {
    lastElement.trailingComments.push(...comments);
  }
}

export default class CommentsParser extends BaseParser {
  addComment(comment: Comment): void {
    if (this.filename) comment.loc.filename = this.filename;
    this.state.comments.push(comment);
  }

  processComment(node: Node): void {
    const { unattachedCommentStack } = this.state;
    const commentStackLength = unattachedCommentStack.length;
    if (commentStackLength === 0) return;
    let i = commentStackLength - 1;
    const lastComments = unattachedCommentStack[i];

    if (lastComments.start === node.end) {
      lastComments.leadingNode = node;
      i--;
    }
    // invariant: for all 0 <= j <= i, c = commentStack[j] satisfies c.end < node.end
    const nodeStart = node.start;
    for (; i >= 0; i--) {
      const commentWS = unattachedCommentStack[i];
      const commentEnd = commentWS.end;
      if (commentEnd > nodeStart) {
        // by definition of commentWhiteSpace, this implies commentWS.start > nodeStart
        // so node can be a containerNode candidate
        const { containerNode } = commentWS;
        if (containerNode === null) {
          commentWS.containerNode = node;
        } else {
          if (containerNode.end - containerNode.start < node.end - nodeStart) {
            unattachedCommentStack.splice(i, 1);
          } else if (node.type !== "Program") {
            // we have a node with the same length of containerNode, but its finishNode is invoked later
            // than containerNode, so this node is the outer node and should replace the inner node.
            // E.g. ExpressionStatement contains a VariableDeclaration
            commentWS.containerNode = node;
          }
        }
      } else if (commentEnd === nodeStart) {
        commentWS.trailingNode = node;
        break;
      }
    }
  }

  finalizeComment() {
    const { commentStack } = this.state;
    const commentStackLength = commentStack.length;
    for (let i = 0; i < commentStackLength; i++) {
      const commentWS = commentStack[i];
      if (commentWS.leadingNode !== null || commentWS.trailingNode !== null) {
        if (commentWS.leadingNode !== null) {
          commentWS.leadingNode.trailingComments = commentWS.comments;
        }
        if (commentWS.trailingNode !== null) {
          commentWS.trailingNode.leadingComments = commentWS.comments;
        }
      } else {
        /*:: invariant(commentWS.containerNode !== null) */
        const {
          containerNode: node,
          comments,
          start: commentStart,
        } = commentWS;
        if (this.input.charCodeAt(commentStart - 1) === charCodes.comma) {
          switch (node.type) {
            case "ObjectExpression":
            case "ObjectPattern":
              adjustInnerComments(node, node.properties, comments);
              break;
            case "CallExpression":
              adjustInnerComments(node, node.arguments, comments);
              break;
            case "ArrayExpression":
            case "ArrayPattern":
              adjustInnerComments(node, node.elements, comments);
              break;
            case "ExportNamedDeclaration":
            case "ImportDeclaration":
              adjustInnerComments(node, node.specifiers, comments);
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
}
