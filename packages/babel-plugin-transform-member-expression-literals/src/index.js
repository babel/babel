import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      MemberExpression: {
        exit({ node }) {
          const prop = node.property;
          if (
            !node.computed &&
            t.isIdentifier(prop) &&
            !t.isValidES3Identifier(prop.name)
          ) {
            // foo.default -> foo["default"]
            node.property = t.stringLiteral(prop.name);
            node.computed = true;
          }
        },
      },
    },
  };
}
