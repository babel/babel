import * as t from "@babel/types";
export { default as CACHE_KEY } from "./_cache-key";

const PURE_ANNOTATION = "#__PURE__";

const isPureAnnotated = node => {
  const { leadingComments } = node;
  if (leadingComments === undefined) {
    return false;
  }
  return leadingComments.some(comment => /[@#]__PURE__/.test(comment.value));
};

export default function annotateAsPure(pathOrNode) {
  const node = pathOrNode.node || pathOrNode;
  if (isPureAnnotated(node)) {
    return;
  }
  t.addComment(node, "leading", PURE_ANNOTATION);
}
