/* @minVersion 7.24.0 */

import assertClassBrand from "./assertClassBrand.ts";

export default function _classPrivateFieldSet2(
  privateMap: WeakMap<any, any>,
  receiver: any,
  value: any,
) {
  privateMap.set(assertClassBrand(privateMap, receiver), value);
  return value;
}
