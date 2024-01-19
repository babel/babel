import type { Comment } from "@babel/types";

export = function convertComments(comments: Comment[]) {
  for (const comment of comments) {
    // @ts-expect-error eslint
    comment.type = comment.type === "CommentBlock" ? "Block" : "Line";

    // sometimes comments don't get ranges computed,
    // even with options.ranges === true

    // @ts-expect-error eslint
    comment.range ||= [comment.start, comment.end];
  }
};
