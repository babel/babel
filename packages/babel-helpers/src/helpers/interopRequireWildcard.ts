/* @minVersion 7.14.0 */

function _getRequireWildcardCache<K extends WeakKey, V = any>(
  nodeInterop: boolean,
): WeakMap<K, V> | null {
  if (typeof WeakMap !== "function") return null;

  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();

  return ((_getRequireWildcardCache as (n: boolean) => WeakMap<K, V>) =
    function (nodeInterop: boolean) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}

type TReturnType<T> = { default: T; [key: string]: any };
export default function _interopRequireWildcard<T>(
  obj: T,
  nodeInterop: boolean,
): TReturnType<T> {
  if (!nodeInterop && obj && typeof obj === "object" && "__esModule" in obj) {
    return obj as unknown as TReturnType<T>;
  }

  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }

  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj: { __proto__: null; default: T; [key: string]: any } = {
    __proto__: null,
    default: obj,
  };

  var hasPropertyDescriptor =
    "defineProperty" in Object ? Object.getOwnPropertyDescriptor : undefined;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
