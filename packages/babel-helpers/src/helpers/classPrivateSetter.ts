/* @minVersion 7.24.0 */

import assertClassBrand from "./assertClassBrand.ts";

export default function _classPrivateSetter(
  privateMap: WeakMap<any, any> | WeakSet<any>,
  setter: Function,
  receiver: any,
  value: any,
) {
  setter(assertClassBrand(privateMap, receiver), value);
  return value;
}
