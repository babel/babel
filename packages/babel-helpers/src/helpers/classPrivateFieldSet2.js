/* @minVersion 7.22.0 */

import assertClassBrand from "assertClassBrand";

export default function _classPrivateFieldSet2(receiver, privateMap, value) {
  privateMap.set(assertClassBrand(receiver, privateMap), value);
  return value;
}
