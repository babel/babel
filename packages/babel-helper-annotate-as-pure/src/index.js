import * as t from "@babel/types";

const PURE_ANNOTATION = "#__PURE__";

const isPureAnnotated = ({ leadingComments }) =>
  !!leadingComments &&
  leadingComments.some(comment => /[@#]__PURE__/.test(comment.value));

export default function annotateAsPure(pathOrNode) {
  const node = pathOrNode.node || pathOrNode;
  if (isPureAnnotated(node)) {
    return;
  }
  t.addComment(node, "leading", PURE_ANNOTATION);
}
