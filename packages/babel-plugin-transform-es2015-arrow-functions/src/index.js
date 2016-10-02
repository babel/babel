export default function ({ types: t }) {
  return {
    visitor: {
      ArrowFunctionExpression(path, state) {
        if (state.opts.spec) {
          let { node } = path;
          if (node.shadow) return;

          node.shadow = { this: false };
          node.type = "FunctionExpression";

          let boundThis = t.thisExpression();

          // make sure that arrow function won't be instantiated
          path.ensureBlock();
          path.get("body").unshiftContainer(
            "body",
            t.expressionStatement(t.callExpression(state.addHelper("newArrowCheck"), [
              t.thisExpression(),
              boundThis
            ]))
          );

          path.replaceWith(t.callExpression(
            t.memberExpression(node, t.identifier("bind")),
            [t.thisExpression()]
          ));

          // ensure that boundThis is hoisted up although this should not be hoisted
          boundThis._forceShadow = path.get("callee.object");
        } else {
          path.arrowFunctionToShadowed();
        }
      }
    }
  };
}
