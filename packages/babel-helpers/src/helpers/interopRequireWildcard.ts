/* @minVersion 7.14.0 */

function _getRequireWildcardCache(nodeInterop: boolean) {
  if (typeof WeakMap !== "function") return null;

  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  // @ts-expect-error assign to function
  return (_getRequireWildcardCache = function (nodeInterop: boolean) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

export default function _interopRequireWildcard(
  obj: any,
  nodeInterop: boolean,
) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }

  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj: { [key: string]: any } = { __proto__: null };
  var hasPropertyDescriptor =
    // @ts-expect-error check if Object.defineProperty is available
    (Object.defineProperty && Object.getOwnPropertyDescriptor) as
      | typeof Object.getOwnPropertyDescriptor
      | undefined;
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
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
