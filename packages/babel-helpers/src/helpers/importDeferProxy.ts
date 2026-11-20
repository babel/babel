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
      // "then" does not trigger evaluation of a deferred namespace, so that it
      // is not evaluated (or used as a thenable) when a promise resolves to it.
      if (p === "then") return run(target, p, receiver);
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
