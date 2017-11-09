import { types as t } from "@babel/core";

import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      ObjectProperty: {
        exit({ node }) {
          const key = node.key;
          if (
            !node.computed &&
            t.isIdentifier(key) &&
            !t.isValidES3Identifier(key.name)
          ) {
            // default: "bar" -> "default": "bar"
            node.key = t.stringLiteral(key.name);
          }
        },
      },
    },
  };
}
