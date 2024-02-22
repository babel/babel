/* @minVersion 7.22.0 */

import assertClassBrand from "./assertClassBrand.ts";

export default function _classPrivateGetter(
  privateMap: WeakMap<any, any> | WeakSet<any>,
  receiver: any,
  getter: Function,
) {
  return getter.call(assertClassBrand(privateMap, receiver));
}
