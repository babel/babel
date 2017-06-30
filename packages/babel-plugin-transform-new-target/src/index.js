export default function ({ types: t }) {

  return {
    name: "transform-new-target",

    visitor: {
      MetaProperty(path) {
        const meta = path.get("meta");
        const property = path.get("property");
        if (meta.isIdentifier({ name: "new" }) && property.isIdentifier({ name: "target" })) {
          const func = path.findParent((path) => {
            if (path.isClass()) return true;
            if (path.isFunction() && !path.isArrowFunctionExpression()) {
              if (path.isClassMethod() && path.get("key").isIdentifier({ name: "constructor" })) {
                return false;
              }

              return true;
            }
            return false;
          });

          const { id } = func.node;
          if (!id) {
            return;
          }

          path.replaceWith(t.conditionalExpression(
            t.binaryExpression("instanceof", t.thisExpression(), id),
            t.memberExpression(t.thisExpression(), t.identifier("constructor")),
            path.scope.buildUndefinedNode()
          ));
        }
      },
    },
  };
}
