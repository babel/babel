export default function ({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(path, state) {
        if (state.opts.spec) {
          if (path.node.shadow) return;
          path.node.shadow = { this: false };

          var boundThis = t.thisExpression();
          boundThis._forceShadow = path;

          // make sure that arrow function won't be instantiated
          path.ensureBlock();
          path.get("body").unshiftContainer(
            "body",
            t.expressionStatement(t.callExpression(state.addHelper("new-arrow-check"), [
              t.thisExpression(),
              boundThis
            ]))
          );

          path.replaceWith(t.callExpression(
            t.memberExpression(path.node, t.identifier("bind")),
            [t.thisExpression()]
          ));
        } else {
          path.arrowFunctionToShadowed();
        }
      }
    }
  };
}
