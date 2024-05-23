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
    return function (_target: T, p?: string | symbol, receiver?: any) {
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
