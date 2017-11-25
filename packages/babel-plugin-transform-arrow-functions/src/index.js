import type NodePath from "@babel/traverse";
import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function(api, options) {
  const { spec } = options;
  return {
    cacheKey: CACHE_KEY,
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
}
