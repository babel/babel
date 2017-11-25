import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import syntaxAsyncGenerators from "@babel/plugin-syntax-async-generators";
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  const yieldStarVisitor = {
    Function(path) {
      path.skip();
    },

    YieldExpression({ node }, state) {
      if (!node.delegate) return;
      const callee = state.addHelper("asyncGeneratorDelegate");
      node.argument = t.callExpression(callee, [
        t.callExpression(state.addHelper("asyncIterator"), [node.argument]),
        state.addHelper("awaitAsyncGenerator"),
      ]);
    },
  };

  return {
    cacheKey: CACHE_KEY,
    inherits: syntaxAsyncGenerators,
    visitor: {
      Function(path, state) {
        if (!path.node.async || !path.node.generator) return;

        path.traverse(yieldStarVisitor, state);

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addHelper("wrapAsyncGenerator"),
          wrapAwait: state.addHelper("awaitAsyncGenerator"),
        });
      },
    },
  };
}
