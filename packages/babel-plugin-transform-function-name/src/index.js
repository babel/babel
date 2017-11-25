import nameFunction from "@babel/helper-function-name";
import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      FunctionExpression: {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            const replacement = nameFunction(path);
            if (replacement) path.replaceWith(replacement);
          }
        },
      },

      ObjectProperty(path) {
        const value = path.get("value");
        if (value.isFunction()) {
          const newNode = nameFunction(value);
          if (newNode) value.replaceWith(newNode);
        }
      },
    },
  };
}
