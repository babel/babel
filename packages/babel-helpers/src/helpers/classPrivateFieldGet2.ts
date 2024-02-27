/* @minVersion 7.22.0 */

import assertClassBrand from "./assertClassBrand.ts";

export default function _classPrivateFieldGet2(
  privateMap: WeakMap<any, any>,
  receiver: any,
) {
  return privateMap.get(assertClassBrand(privateMap, receiver));
}
