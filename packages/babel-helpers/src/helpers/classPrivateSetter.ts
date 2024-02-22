/* @minVersion 7.22.0 */

import assertClassBrand from "./assertClassBrand.ts";

export default function _classPrivateSetter(
  privateMap: WeakMap<any, any> | WeakSet<any>,
  setter: Function,
  receiver: any,
  value: any,
) {
  setter.call(assertClassBrand(privateMap, receiver), value);
  return value;
}
