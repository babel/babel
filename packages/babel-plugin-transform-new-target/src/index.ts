import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";
import type { NodePath } from "@babel/traverse";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-new-target",

    visitor: {
      MetaProperty(path) {
        const meta = path.get("meta");
        const property = path.get("property");
        const { scope } = path;

        if (
          meta.isIdentifier({ name: "new" }) &&
          property.isIdentifier({ name: "target" })
        ) {
          const func = path.findParent(path => {
            if (path.isClass()) return true;
            if (path.isFunction() && !path.isArrowFunctionExpression()) {
              if (path.isClassMethod({ kind: "constructor" })) {
                return false;
              }

              return true;
            }
            return false;
          }) as NodePath<
            | t.FunctionDeclaration
            | t.FunctionExpression
            | t.Class
            | t.ClassMethod
            | t.ClassPrivateMethod
          >;

          if (!func) {
            throw path.buildCodeFrameError(
              "new.target must be under a (non-arrow) function or a class.",
            );
          }

          const { node } = func;
          if (t.isMethod(node)) {
            path.replaceWith(scope.buildUndefinedNode());
            return;
          }

          const constructor = t.memberExpression(
            t.thisExpression(),
            t.identifier("constructor"),
          );

          if (func.isClass()) {
            path.replaceWith(constructor);
            return;
          }

          if (!node.id) {
            node.id = scope.generateUidIdentifier("target");
          } else {
            // packages/babel-helper-create-class-features-plugin/src/fields.ts#L192 unshadow
            let scope = path.scope;
            const name = node.id.name;
            while (scope !== func.parentPath.scope) {
              if (
                scope.hasOwnBinding(name) &&
                !scope.bindingIdentifierEquals(name, node.id)
              ) {
                scope.rename(name);
              }
              scope = scope.parent;
            }
          }

          path.replaceWith(
            t.conditionalExpression(
              t.binaryExpression(
                "instanceof",
                t.thisExpression(),
                t.cloneNode(node.id),
              ),
              constructor,
              scope.buildUndefinedNode(),
            ),
          );
        }
      },
    },
  };
});
