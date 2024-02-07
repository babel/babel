/* @minVersion 7.22.0 */

export default function _assertClassBrand(receiver, brand, returnValue) {
  if (typeof brand === "function" ? brand === receiver : brand.has(receiver)) {
    return arguments.length < 3 ? receiver : returnValue;
  }
  throw new TypeError("Private element is not present on this object");
}
