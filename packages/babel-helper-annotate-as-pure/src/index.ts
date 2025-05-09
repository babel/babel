import { addComment, type Node } from "@babel/types";

const PURE_ANNOTATION = "#__PURE__";

const isPureAnnotated = ({ leadingComments }: Node): boolean =>
  !!leadingComments &&
  leadingComments.some(comment => /[@#]__PURE__/.test(comment.value));

export default function annotateAsPure(
  pathOrNode: Node | { node: Node },
): void {
  const node =
    // @ts-expect-error Node will not have `node` property
    (pathOrNode.node || pathOrNode) as Node;
  if (isPureAnnotated(node)) {
    return;
  }
  addComment(node, "leading", PURE_ANNOTATION);
}
