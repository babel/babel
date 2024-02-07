/* @minVersion 7.22.0 */

import assertClassBrand from "assertClassBrand";

export default function _classPrivateFieldGet2(receiver, privateMap) {
  return privateMap.get(assertClassBrand(receiver, privateMap));
}
