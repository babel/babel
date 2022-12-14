import { declare } from "@babel/helper-plugin-utils";
import { type MutatorMap, pushAccessor, toDefineObject } from "./define-map";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-property-mutators",

    visitor: {
      ObjectExpression(path) {
        const { node } = path;
        let mutatorMap: MutatorMap | undefined;
        const newProperties = node.properties.filter(function (prop) {
          if (
            t.isObjectMethod(prop) &&
            !prop.computed &&
            (prop.kind === "get" || prop.kind === "set")
          ) {
            pushAccessor(
              (mutatorMap ??= {}),
              prop as t.ObjectMethod & { kind: "get" | "set"; computed: false },
            );
            return false;
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
            [node, toDefineObject(mutatorMap)],
          ),
        );
      },
    },
  };
});
