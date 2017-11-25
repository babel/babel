import syntaxOptionalCatchBinding from "@babel/plugin-syntax-optional-catch-binding";
import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";

export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    inherits: syntaxOptionalCatchBinding,

    visitor: {
      CatchClause(path) {
        if (path.node.param === null || !t.isIdentifier(path.node.param)) {
          return;
        }
        const binding = path.scope.getOwnBinding(path.node.param.name);
        if (binding.constantViolations.length > 0) {
          return;
        }
        if (!binding.referenced) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
