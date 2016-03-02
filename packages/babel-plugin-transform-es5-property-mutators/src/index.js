import * as defineMap from "babel-helper-define-map";

export default function ({ types: t }) {
  return {
    visitor: {
      ObjectExpression(path, file) {
        let { node } = path;
        let hasAny = false;
        for (let prop of node.properties) {
          if (prop.kind === "get" || prop.kind === "set") {
            hasAny = true;
            break;
          }
        }
        if (!hasAny) return;

        let mutatorMap = {};

        node.properties = node.properties.filter(function (prop) {
          if (!prop.computed && (prop.kind === "get" || prop.kind === "set")) {
            defineMap.push(mutatorMap, prop, null, file);
            return false;
          } else {
            return true;
          }
        });

        path.replaceWith(t.callExpression(
          t.memberExpression(t.identifier("Object"), t.identifier("defineProperties")),
          [node, defineMap.toDefineObject(mutatorMap)]
        ));
      }
    }
  };
}
