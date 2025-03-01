const circleSet = new Set();
let depth = 0;
// https://github.com/babel/babel/pull/14583#discussion_r882828856
function deepClone(
  value: any,
  cache: Map<any, any>,
  allowCircle: boolean,
): any {
  if (value !== null) {
    if (allowCircle) {
      if (cache.has(value)) return cache.get(value);
    } else if (++depth > 250) {
      if (circleSet.has(value)) {
        depth = 0;
        circleSet.clear();
        throw new Error("Babel-deepClone: Cycles are not allowed in AST");
      }
      circleSet.add(value);
    }
    let cloned: any;
    if (Array.isArray(value)) {
      cloned = new Array(value.length);
      if (allowCircle) cache.set(value, cloned);
      for (let i = 0; i < value.length; i++) {
        cloned[i] =
          typeof value[i] !== "object"
            ? value[i]
            : deepClone(value[i], cache, allowCircle);
      }
    } else {
      cloned = {};
      if (allowCircle) cache.set(value, cloned);
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        cloned[key] =
          typeof value[key] !== "object"
            ? value[key]
            : deepClone(
                value[key],
                cache,
                allowCircle ||
                  key === "leadingComments" ||
                  key === "innerComments" ||
                  key === "trailingComments" ||
                  key === "extra",
              );
      }
    }
    if (!allowCircle) {
      if (depth-- > 250) circleSet.delete(value);
    }
    return cloned;
  }
  return value;
}

export default function <T>(value: T): T {
  if (typeof value !== "object") return value;

  if (process.env.BABEL_8_BREAKING) {
    if (!process.env.IS_PUBLISH && depth > 0) {
      throw new Error("depth > 0");
    }
    return deepClone(value, new Map(), false);
  } else {
    try {
      return deepClone(value, new Map(), true);
    } catch (_) {
      return structuredClone(value);
    }
  }
}
