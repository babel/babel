import * as t from "babel-types";

export default function build(node, buildBody) {
  let self = node.blocks.shift();
  if (!self) return;

  let child = build(node, buildBody);
  if (!child) {
    // last item
    child = buildBody();

    // add a filter as this is our final stop
    if (node.filter) {
      child = t.ifStatement(node.filter, t.blockStatement([child]));
    }
  }

  return t.forOfStatement(
    t.variableDeclaration("let", [t.variableDeclarator(self.left)]),
    self.right,
    t.blockStatement([child])
  );
}
