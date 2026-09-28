/* @minVersion 7.14.0 */

export default function _interopRequireWildcard(
  obj: any,
  nodeInterop: boolean,
) {
  if (typeof WeakMap === "function") {
    var cache = new WeakMap();
  }

  // @ts-expect-error: assign to function
  return (_interopRequireWildcard = function (obj: any, nodeInterop: boolean) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    // Temporary variable for output size
    var defineProp = Object.defineProperty as
      typeof Object.defineProperty | undefined;
    var newObj: Record<string, any> = { __proto__: null, default: obj };
    var desc: PropertyDescriptor | undefined;
    var key: string;

    if (
      obj === null ||
      (typeof obj !== "object" && typeof obj !== "function")
    ) {
      return newObj;
    }

    if (cache) {
      if (cache.has(obj)) return cache.get(obj);
      cache.set(obj, newObj);
    }

    for (key in obj) {
      if (key !== "default" && {}.hasOwnProperty.call(obj, key)) {
        desc = defineProp && Object.getOwnPropertyDescriptor(obj, key);
        if (desc && (desc.get || desc.set)) {
          defineProp!(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  })(obj, nodeInterop);
}
