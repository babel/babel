// A plain array keeps the fast path (returned by reference).
const plain = [1, 2, 3];
expect(HELPER_ARRAY_WITH_HOLES(plain)).toBe(plain);

// An array-backed Proxy that does not override Symbol.iterator also keeps
// the fast path: Array.isArray pierces the proxy and the iterator is inherited.
const plainProxy = new Proxy(["a"], {});
expect(HELPER_ARRAY_WITH_HOLES(plainProxy)).toBe(plainProxy);

// An array-backed Proxy that overrides Symbol.iterator must NOT take the fast
// path: native destructuring would use the custom iterator, so the helper has
// to fall through to the iterator path instead of reading `proxy[0]`.
const target = ["real-value"];
const proxy = new Proxy(target, {
  get(t, prop) {
    if (prop === Symbol.iterator) {
      return function* () {
        yield "real-value";
      };
    }
    return undefined;
  },
});
expect(HELPER_ARRAY_WITH_HOLES(proxy)).toBe(undefined);
