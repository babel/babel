import * as defineMap from "@babel/helper-define-map";
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      ObjectExpression(path, file) {
        const { node } = path;
        let hasAny = false;
        for (const prop of (node.properties: Array)) {
          if (prop.kind === "get" || prop.kind === "set") {
            hasAny = true;
            break;
          }
        }
        if (!hasAny) return;

        const mutatorMap = {};

        node.properties = node.properties.filter(function(prop) {
          if (!prop.computed && (prop.kind === "get" || prop.kind === "set")) {
            defineMap.push(mutatorMap, prop, null, file);
            return false;
          } else {
            return true;
          }
        });

        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.identifier("Object"),
              t.identifier("defineProperties"),
            ),
            [node, defineMap.toDefineObject(mutatorMap)],
          ),
        );
      },
    },
  };
}
