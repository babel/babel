import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    visitor: {
      CallExpression: function(path, file) {
        if (path.get("callee").matchesPattern("Object.assign")) {
          path.node.callee = file.addHelper("extends");
        }
      },
    },
  };
}
