import * as defineMap from "../../helpers/define-map";
import * as t from "babel-types";

export let visitor = {
  ObjectExpression({ node }, file) {
    var hasAny = false;
    for (var prop of (node.properties: Array)) {
      if (prop.kind === "get" || prop.kind === "set") {
        hasAny = true;
        break;
      }
    }
    if (!hasAny) return;

    let mutatorMap = {};

    node.properties = node.properties.filter(function (prop) {
      if (prop.kind === "get" || prop.kind === "set") {
        defineMap.push(mutatorMap, prop, prop.kind, file);
        return false;
      } else {
        return true;
      }
    });

    return t.callExpression(
      t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")),
      [node, defineMap.toDefineObject(mutatorMap)]
    );
  }
};
