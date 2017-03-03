export default function({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(path, state) {
        if (state.opts.spec) {
          const { node } = path;
          if (node.shadow) return;

          node.shadow = { this: false };
          node.type = "FunctionExpression";

          const boundThis = t.thisExpression();
          boundThis._forceShadow = path;

          // make sure that arrow function won't be instantiated
          path.ensureBlock();
          path
            .get("body")
            .unshiftContainer(
              "body",
              t.expressionStatement(
                t.callExpression(state.addHelper("newArrowCheck"), [
                  t.thisExpression(),
                  boundThis,
                ]),
              ),
            );

          path.replaceWith(
            t.callExpression(t.memberExpression(node, t.identifier("bind")), [
              t.thisExpression(),
            ]),
          );
        } else {
          path.arrowFunctionToShadowed();
        }
      },
    },
  };
}
