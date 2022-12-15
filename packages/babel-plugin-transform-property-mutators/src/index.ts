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

        let hasSideEffect = false;
        let hasMutators = false;

        const computedKeys = new Map<
          t.ObjectMethod | t.ObjectProperty,
          t.Identifier
        >();
        const computedKeysInits = [];

        for (const prop of node.properties) {
          if (t.isObjectMethod(prop) || t.isObjectProperty(prop)) {
            if (t.isObjectMethod(prop)) {
              if (prop.kind === "get" || prop.kind === "set") {
                hasMutators = true;
              }
            }

            if (prop.computed && !path.scope.isStatic(prop.key)) {
              hasSideEffect = true;

              const id =
                path.scope.generateDeclaredUidIdentifier("computedKey");
              computedKeys.set(prop, id);
              computedKeysInits.push(
                t.assignmentExpression("=", id, prop.key as t.Expression),
              );
            }
          }
        }

        if (!hasMutators) return;

        if (hasSideEffect) {
          for (const [propNode, id] of computedKeys) {
            propNode.key = t.cloneNode(id);
          }
          path.replaceWith(t.sequenceExpression([...computedKeysInits, node]));
        } else {
          let mutatorMap: MutatorMap | undefined;
          const newProperties = node.properties.filter(function (prop) {
            if (
              t.isObjectMethod(prop) &&
              (prop.kind === "get" || prop.kind === "set")
            ) {
              pushAccessor(
                (mutatorMap ??= {}),
                prop as t.ObjectMethod & {
                  kind: "get" | "set";
                },
              );
              return false;
            }
            return true;
          });

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
        }
      },
    },
  };
});
