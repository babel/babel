/* @minVersion 7.23.0 */
/* @mangleFns */

export default function _importDeferProxy<T extends object>(
  init: () => T,
): ProxyHandler<T> {
  var ns: T | null = null;

  var constFalse = function () {
    return false;
  };

  var proxy = function (run: Function) {
    return function (_target: T, p?: string | symbol, receiver?: any) {
      if (ns === null) ns = init();
      return run(ns, p, receiver);
    };
  };

  return new Proxy(
    {},
    {
      defineProperty: constFalse,
      deleteProperty: constFalse,
      get: proxy(Reflect.get),
      getOwnPropertyDescriptor: proxy(Reflect.getOwnPropertyDescriptor),
      getPrototypeOf: function () {
        return null;
      },
      isExtensible: constFalse,
      has: proxy(Reflect.has),
      ownKeys: proxy(Reflect.ownKeys),
      preventExtensions: function () {
        return true;
      },
      set: constFalse,
      setPrototypeOf: constFalse,
    },
  );
}
