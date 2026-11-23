/* @minVersion 7.23.0 */
/* @mangleFns */

export default function _importDeferProxy<T extends object>(
  init: () => T,
): ProxyHandler<T> {
  var ns: T;

  function constFalse() {
    return false;
  }

  function proxy(run: Function) {
    return function (target: T, p?: string | symbol, receiver?: any) {
      // Symbols and "then" do not trigger evaluation of a deferred namespace.
      // Symbols are detected without comparing `typeof p` to "symbol", so
      // that @babel/plugin-transform-typeof-symbol does not add `_typeof`.
      // `p` is undefined for `ownKeys`, which triggers evaluation.
      if (p === "then" || (p && typeof p !== "string")) {
        return run(target, p, receiver);
      }
      return run(ns || (ns = init()), p, receiver);
    };
  }

  return new Proxy({ __proto__: null } as T, {
    defineProperty: constFalse,
    deleteProperty: constFalse,
    get: proxy(Reflect.get),
    getOwnPropertyDescriptor: proxy(Reflect.getOwnPropertyDescriptor),
    isExtensible: constFalse,
    has: proxy(Reflect.has),
    ownKeys: proxy(Reflect.ownKeys),
    preventExtensions: function () {
      return true;
    },
    set: constFalse,
    setPrototypeOf: constFalse,
  });
}
