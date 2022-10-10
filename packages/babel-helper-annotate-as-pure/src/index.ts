import { types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";

const PURE_ANNOTATION = "#__PURE__";

const isPureAnnotated = ({ leadingComments }: t.Node): boolean =>
  !!leadingComments &&
  leadingComments.some(comment => /[@#]__PURE__/.test(comment.value));

export default function annotateAsPure(pathOrNode: t.Node | NodePath): void {
  const node =
    // @ts-expect-error Node will not have `node` property
    (pathOrNode["node"] || pathOrNode) as t.Node;
  if (isPureAnnotated(node)) {
    return;
  }
  t.addComment(node, "leading", PURE_ANNOTATION);
}
