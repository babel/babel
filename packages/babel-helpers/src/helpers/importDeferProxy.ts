/* @minVersion 7.23.0 */

export default function _importDeferProxy<T extends object>(
  init: () => T,
): ProxyHandler<T> {
  var ns: T | null = null;

  var constValue = function <V extends boolean | null>(v: V) {
    return function (): V {
      return v;
    };
  };

  var proxy = function (run: Function) {
    return function (target: T, p?: string | symbol, receiver?: any) {
      // Symbols and "then" do not trigger evaluation of a deferred namespace.
      // Symbols are detected without comparing `typeof p` to "symbol", so
      // that @babel/plugin-transform-typeof-symbol does not add `_typeof`.
      // `p` is undefined for `ownKeys`, which triggers evaluation.
      if (p === "then" || (p && typeof p !== "string")) {
        return run(target, p, receiver);
      }
      if (ns === null) ns = init();
      return run(ns, p, receiver);
    };
  };

  return new Proxy(
    {},
    {
      defineProperty: constValue(false),
      deleteProperty: constValue(false),
      get: proxy(Reflect.get),
      getOwnPropertyDescriptor: proxy(Reflect.getOwnPropertyDescriptor),
      getPrototypeOf: constValue(null),
      isExtensible: constValue(false),
      has: proxy(Reflect.has),
      ownKeys: proxy(Reflect.ownKeys),
      preventExtensions: constValue(true),
      set: constValue(false),
      setPrototypeOf: constValue(false),
    },
  );
}
