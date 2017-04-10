// @flow

import nameFunction from "babel-helper-function-name";
import { type NodePath } from "babel-traverse";
import typeof * as babelTypes from "babel-types";

export default function ({ types: t }: { types: babelTypes }) {
  return {
    visitor: {
      ArrowFunctionExpression(path: NodePath<BabelNodeArrowFunctionExpression>, state: Object) {
        if (state.opts.spec) {
          const { node } = path;
          if (node.shadow) return;

          node.shadow = { this: false };
          node.type = "FunctionExpression";

          const boundThis: any = t.thisExpression();
          boundThis._forceShadow = path;

          // make sure that arrow function won't be instantiated
          path.ensureBlock();
          path.get("body").unshiftContainer(
            "body",
            t.expressionStatement(t.callExpression(state.addHelper("newArrowCheck"), [
              t.thisExpression(),
              boundThis,
            ]))
          );

          const replacement = nameFunction(path);
          const named = replacement || node;

          path.replaceWith(t.callExpression(
            t.memberExpression(named, t.identifier("bind")),
            [t.thisExpression()]
          ));
        } else {
          path.arrowFunctionToShadowed();
        }
      },
    },
  };
}
