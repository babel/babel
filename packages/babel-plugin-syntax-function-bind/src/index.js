import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("functionBind");
    },
  };
}
