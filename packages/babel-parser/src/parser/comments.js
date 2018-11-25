// @flow

/**
 * Based on the comment attachment algorithm used in espree and estraverse.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import BaseParser from "./base";
import type { Comment, Node } from "../types";

function last<T>(stack: $ReadOnlyArray<T>): T {
  return stack[stack.length - 1];
}

export default class CommentsParser extends BaseParser {
  addComment(comment: Comment): void {
    if (this.filename) comment.loc.filename = this.filename;
    this.state.trailingComments.push(comment);
    this.state.leadingComments.push(comment);
  }

  processComment(node: Node): void {
    if (node.type === "Program" && node.body.length > 0) return;

    const stack = this.state.commentStack;

    let firstChild, lastChild, trailingComments, i, j;

    if (this.state.trailingComments.length > 0) {
      // If the first comment in trailingComments comes after the
      // current node, then we're good - all comments in the array will
      // come after the node and so it's safe to add them as official
      // trailingComments.
      if (this.state.trailingComments[0].start >= node.end) {
        trailingComments = this.state.trailingComments;
        this.state.trailingComments = [];
      } else {
        // Otherwise, if the first comment doesn't come after the
        // current node, that means we have a mix of leading and trailing
        // comments in the array and that leadingComments contains the
        // same items as trailingComments. Reset trailingComments to
        // zero items and we'll handle this by evaluating leadingComments
        // later.
        this.state.trailingComments.length = 0;
      }
    } else if (stack.length > 0) {
      const lastInStack = last(stack);
      if (
        lastInStack.trailingComments &&
        lastInStack.trailingComments[0].start >= node.end
      ) {
        trailingComments = lastInStack.trailingComments;
        delete lastInStack.trailingComments;
      }
    }

    // Eating the stack.
    if (stack.length > 0 && last(stack).start >= node.start) {
      firstChild = stack.pop();
    }

    while (stack.length > 0 && last(stack).start >= node.start) {
      lastChild = stack.pop();
    }

    if (!lastChild && firstChild) lastChild = firstChild;

    // Attach comments that follow a trailing comma on the last
    // property in an object literal or a trailing comma in function arguments
    // as trailing comments
    if (firstChild && this.state.leadingComments.length > 0) {
      const lastComment = last(this.state.leadingComments);

      if (firstChild.type === "ObjectProperty") {
        if (lastComment.start >= node.start) {
          if (this.state.commentPreviousNode) {
            for (j = 0; j < this.state.leadingComments.length; j++) {
              if (
                this.state.leadingComments[j].end <
                this.state.commentPreviousNode.end
              ) {
                this.state.leadingComments.splice(j, 1);
                j--;
              }
            }

            if (this.state.leadingComments.length > 0) {
              firstChild.trailingComments = this.state.leadingComments;
              this.state.leadingComments = [];
            }
          }
        }
      } else if (
        node.type === "CallExpression" &&
        node.arguments &&
        node.arguments.length
      ) {
        const lastArg = last(node.arguments);

        if (
          lastArg &&
          lastComment.start >= lastArg.start &&
          lastComment.end <= node.end
        ) {
          if (this.state.commentPreviousNode) {
            for (j = 0; j < this.state.leadingComments.length; j++) {
              if (
                this.state.leadingComments[j].end <
                this.state.commentPreviousNode.end
              ) {
                this.state.leadingComments.splice(j, 1);
                j--;
              }
            }
            if (this.state.leadingComments.length > 0) {
              lastArg.trailingComments = this.state.leadingComments;
              this.state.leadingComments = [];
            }
          }
        }
      }
    }

    if (lastChild) {
      if (lastChild.leadingComments) {
        if (
          lastChild !== node &&
          lastChild.leadingComments.length > 0 &&
          last(lastChild.leadingComments).end <= node.start
        ) {
          node.leadingComments = lastChild.leadingComments;
          delete lastChild.leadingComments;
        } else {
          // A leading comment for an anonymous class had been stolen by its first ClassMethod,
          // so this takes back the leading comment.
          // See also: https://github.com/eslint/espree/issues/158
          for (i = lastChild.leadingComments.length - 2; i >= 0; --i) {
            if (lastChild.leadingComments[i].end <= node.start) {
              node.leadingComments = lastChild.leadingComments.splice(0, i + 1);
              break;
            }
          }
        }
      }
    } else if (this.state.leadingComments.length > 0) {
      if (last(this.state.leadingComments).end <= node.start) {
        if (this.state.commentPreviousNode) {
          for (j = 0; j < this.state.leadingComments.length; j++) {
            if (
              this.state.leadingComments[j].end <
              this.state.commentPreviousNode.end
            ) {
              this.state.leadingComments.splice(j, 1);
              j--;
            }
          }
        }
        if (this.state.leadingComments.length > 0) {
          node.leadingComments = this.state.leadingComments;
          this.state.leadingComments = [];
        }
      } else {
        // https://github.com/eslint/espree/issues/2
        //
        // In special cases, such as return (without a value) and
        // debugger, all comments will end up as leadingComments and
        // will otherwise be eliminated. This step runs when the
        // commentStack is empty and there are comments left
        // in leadingComments.
        //
        // This loop figures out the stopping point between the actual
        // leading and trailing comments by finding the location of the
        // first comment that comes after the given node.
        for (i = 0; i < this.state.leadingComments.length; i++) {
          if (this.state.leadingComments[i].end > node.start) {
            break;
          }
        }

        // Split the array based on the location of the first comment
        // that comes after the node. Keep in mind that this could
        // result in an empty array, and if so, the array must be
        // deleted.
        const leadingComments = this.state.leadingComments.slice(0, i);

        if (leadingComments.length) {
          node.leadingComments = leadingComments;
        }

        // Similarly, trailing comments are attached later. The variable
        // must be reset to null if there are no trailing comments.
        trailingComments = this.state.leadingComments.slice(i);
        if (trailingComments.length === 0) {
          trailingComments = null;
        }
      }
    }

    this.state.commentPreviousNode = node;

    if (trailingComments) {
      if (
        trailingComments.length &&
        trailingComments[0].start >= node.start &&
        last(trailingComments).end <= node.end
      ) {
        node.innerComments = trailingComments;
      } else {
        node.trailingComments = trailingComments;
      }
    }

    stack.push(node);
  }
}
