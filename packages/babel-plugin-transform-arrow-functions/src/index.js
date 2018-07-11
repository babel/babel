import { declare } from "@babel/helper-plugin-utils";
import type NodePath from "@babel/traverse";

export default declare((api, options) => {
  api.assertVersion(7);

  const { spec } = options;
  return {
    visitor: {
      ArrowFunctionExpression(
        path: NodePath<BabelNodeArrowFunctionExpression>,
      ) {
        // In some conversion cases, it may have already been converted to a function while this callback
        // was queued up.
        if (!path.isArrowFunctionExpression()) return;

        path.arrowFunctionToExpression({
          // While other utils may be fine inserting other arrows to make more transforms possible,
          // the arrow transform itself absolutely cannot insert new arrow functions.
          allowInsertArrow: false,
          specCompliant: !!spec,
        });
      },
    },
  };
});
