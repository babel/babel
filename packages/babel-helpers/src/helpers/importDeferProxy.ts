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
    return function (_target: T, p?: string | symbol, receiver?: any) {
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
