/* @minVersion 7.24.0 */

export default function _assertClassBrand(
  brand: Function | WeakMap<any, any> | WeakSet<any>,
  receiver: any,
  returnValue?: any,
) {
  if (typeof brand === "function" ? brand === receiver : brand.has(receiver)) {
    return arguments.length < 3 ? receiver : returnValue;
  }
  throw new TypeError("Private element is not present on this object");
}
