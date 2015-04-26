import * as defineMap from "../../helpers/define-map";
import * as t from "../../../types";

export function shouldVisit(node) {
  return t.isProperty(node) && (node.kind === "get" || node.kind === "set");
}

export function ObjectExpression(node, parent, scope, file) {
  var mutatorMap = {};
  var hasAny = false;

  node.properties = node.properties.filter(function (prop) {
    if (prop.kind === "get" || prop.kind === "set") {
      hasAny = true;
      defineMap.push(mutatorMap, prop, prop.kind, file);
      return false;
    } else {
      return true;
    }
  });

  if (!hasAny) return;

  return t.callExpression(
    t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")),
    [node, defineMap.toDefineObject(mutatorMap)]
  );
}
