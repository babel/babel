// @flow

import BaseParser from "./base";
import type { Comment, Node } from "../types";
import { types as tt } from "../tokenizer/types";

export type TokenTreeItem = {
  type: "",
  start: number,
  end: number,
  groupEnd: boolean,
  permeable: boolean,
};

export default class CommentsParser extends BaseParser {
  addComment(comment: Comment): void {
    if (this.filename) comment.loc.filename = this.filename;

    this.state.commentQueue.push(comment);
  }

  processTokenOnFinish(): void {
    const { commentTokenTree, start, end, type } = this.state;

    commentTokenTree.push({
      type: "",
      start,
      end,

      // We treat commas and semicolons as "permeable" so that comments that
      // come _after_ commas and semicolons are allowed to attach to nodes
      // that come immediately before them.
      permeable: type === tt.comma || type === tt.semi,

      // We mark right-hand closing tokens as group end tokens so that any
      // comments between nodes and these tokens automatically count as
      // trailing comments.
      groupEnd:
        type === tt.bracketR || type === tt.braceR || type === tt.parenR,
    });
  }

  processNodeOnFinish(node: Node): void {
    const { commentQueue } = this.state;

    const children = this._pushTokenTreeNode(node);

    // Find the start of the comments for this node's children.
    const firstCommentIndex = this._findCommentQueueStart(node);
    let commentIndex = firstCommentIndex;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === "") continue;

      // Apply any applicable leading comments.
      while (
        commentIndex < commentQueue.length &&
        commentQueue[commentIndex].end <= child.start
      ) {
        child.leadingComments = child.leadingComments || [];
        child.leadingComments.push(commentQueue[commentIndex]);
        commentIndex += 1;
      }

      // Apply any applicable inner comments.
      while (
        commentIndex < commentQueue.length &&
        commentQueue[commentIndex].end <= child.end
      ) {
        child.innerComments = child.innerComments || [];
        child.innerComments.push(commentQueue[commentIndex]);
        commentIndex += 1;
      }

      const {
        maxEnd = node.end,
        requireSameLine,
      } = this._buildTrailingCommentMetadata(child, children, i);

      while (
        commentIndex < commentQueue.length &&
        commentQueue[commentIndex].end <= maxEnd &&
        (!requireSameLine ||
          commentQueue[commentIndex].loc.start.line <= child.loc.end.line)
      ) {
        child.trailingComments = child.trailingComments || [];
        child.trailingComments.push(commentQueue[commentIndex]);
        commentIndex += 1;
      }
    }

    if (commentIndex !== firstCommentIndex) {
      commentQueue.splice(firstCommentIndex, commentIndex - firstCommentIndex);
    }
  }

  /**
   * Find the index of the first comment that comes after the start off
   * the given node, if there is one.
   */
  _findCommentQueueStart(node: Node): number {
    const { commentQueue } = this.state;

    // We start at the index we ended with last time because the vast majority
    // of the time it should already be the right index, since we exit nodes
    // much more frequently than we attach comments.
    // We could also do a binary search for the index, since the comment queue
    // is a sorted list, but we'd likely want benchmarks showing the complexity
    // would actually be worth it.
    let firstCommentIndex = this.state.commentQueueLastIndex;
    while (
      firstCommentIndex - 1 >= 0 &&
      firstCommentIndex - 1 < commentQueue.length &&
      commentQueue[firstCommentIndex - 1].end > node.start
    ) {
      firstCommentIndex--;
    }
    while (
      firstCommentIndex < commentQueue.length &&
      commentQueue[firstCommentIndex].end <= node.start
    ) {
      firstCommentIndex++;
    }
    this.state.commentQueueLastIndex = firstCommentIndex;

    return firstCommentIndex;
  }

  /**
   * The 'commentTokenTree' structure is essentially a list of all parents and
   * and all previous siblings. Whenever a node is pushed, we're essentially
   * replacing any nodes or tokens that are within the node's range with
   * the node itself. This means that as we are attaching comments, we can
   * easily access nodes as well as sibling nodes/tokens.
   */
  _pushTokenTreeNode(node: Node): Array<Node | TokenTreeItem> {
    const { commentTokenTree } = this.state;

    // Pop any tokens and child nodes that are inside the node being finished,
    // so we can walk through them to apply comments to them.
    let commentStackStart = commentTokenTree.length;
    while (
      commentStackStart - 1 >= 0 &&
      commentTokenTree[commentStackStart - 1].start >= node.start
    ) {
      commentStackStart--;
    }
    let commentStackEnd = commentStackStart;
    while (
      commentStackEnd < commentTokenTree.length &&
      commentTokenTree[commentStackEnd].end <= node.end
    ) {
      commentStackEnd++;
    }

    const children = commentTokenTree.splice(
      commentStackStart,
      commentStackEnd - commentStackStart,
      node,
    );

    // The parser may 'finish' a node multiple times in some cases, so we
    // need to make sure that we don't consider the already-pushed node
    // as its own child.
    if (children.length > 0 && children[0] === node) {
      children.shift();
    }

    return children;
  }

  /**
   * Build metadata about how far ahead of the current node we should look
   * when searching for trailing comments to the given child node.
   */
  _buildTrailingCommentMetadata(
    child: Node,
    children: Array<Node | TokenTreeItem>,
    // This is always 'children.indexOf(child)', but recalculating that
    // would be a waste.
    childIndex: number,
  ): {
    maxEnd: number | void,
    requireSameLine?: boolean,
  } {
    let nextSiblingNode = null;
    const nextSiblingTokens = [];
    for (let j = childIndex + 1; j < children.length; j++) {
      const sibling = children[j];

      if (sibling.type !== "") {
        nextSiblingNode = sibling;
        break;
      }
      nextSiblingTokens.push(sibling);
    }

    if (!nextSiblingNode) {
      return {
        // If there is no next node, we leave the value 'undefined' so the
        // caller can set the proper bound based on the parent context.
        maxEnd: undefined,
      };
    }

    // If there is a groupEnd token in the mix, any comment before the
    // groupEnd sibling needs to be a trailing comment on this node.
    for (let j = nextSiblingTokens.length - 1; j >= 0; j--) {
      const token = nextSiblingTokens[j];
      if (token.groupEnd) {
        // Take _all_ comments before group end
        return {
          maxEnd: token.start,
        };
      }
    }

    if (child.loc.end.line === nextSiblingNode.loc.start.line) {
      return {
        maxEnd:
          nextSiblingTokens.length > 0
            ? // When this node and the next are on the same line, we only take
              // comments that are before any other tokens, leaving the rest to
              // be leadingComments on the next sibling.
              nextSiblingTokens[0].start
            : // Use the child end as an easy way to bail out and not collect
              // any comments. Any before the child end will have already been
              // processed by earlier iterations.
              child.end,
      };
    }

    let maxEnd;
    if (
      nextSiblingTokens.length === 0 ||
      (nextSiblingTokens.length === 1 && nextSiblingTokens[0].permeable)
    ) {
      // Pass through any permeable sibling token in the simple case.
      maxEnd = nextSiblingNode.start;
    } else if (nextSiblingTokens[0].permeable) {
      // Reach through the first permeable token.
      maxEnd = nextSiblingTokens[1].start;
    } else {
      // Stop at the very first token if it isn't permeable.
      maxEnd = nextSiblingTokens[0].start;
    }

    return {
      maxEnd,
      requireSameLine: true,
    };
  }
}
