import ReplaceSupers from "../../helpers/replace-supers";
import t from "../../../types";

export function check(node) {
  return t.isIdentifier(node, { name: "super" });
}

export function Property(node, parent, scope, file) {
  if (!node.method) return;

  var value = node.value;
  var thisExpr = scope.generateUidIdentifier("this");

  var replaceSupers = new ReplaceSupers({
    topLevelThisReference: thisExpr,
    methodNode:            node,
    className:             thisExpr,
    isStatic:              true,
    scope:                 scope,
    file:                  file
  });

  replaceSupers.replace();

  if (replaceSupers.hasSuper) {
    value.body.body.unshift(
      t.variableDeclaration("var", [
        t.variableDeclarator(thisExpr, t.thisExpression())
      ])
    );
  }
}
