import { types as t } from "@babel/core";
import CACHE_KEY from "./_cache-key";
export { CACHE_KEY };

export default function() {
  return {
    cacheKey: CACHE_KEY,
    pre(file) {
      file.set("helpersNamespace", t.identifier("babelHelpers"));
    },
  };
}
