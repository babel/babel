import { declare } from "@babel/helper-plugin-utils";
import * as defineMap from "@babel/helper-define-map";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-property-mutators",

    visitor: {
      ObjectExpression(path, { file }) {
        const { node } = path;
        let mutatorMap: defineMap.MutatorMap | void;
        const newProperties = node.properties.filter(function (prop) {
          if (t.isObjectMethod(prop)) {
            if (prop.kind === "get" || prop.kind === "set") {
              mutatorMap ??= {};
              if (!prop.computed) {
                defineMap.push(mutatorMap, prop, null, file);
                return false;
              }
            }
          }
          return true;
        });

        if (mutatorMap === undefined) {
          return;
        }

        node.properties = newProperties;

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
});
