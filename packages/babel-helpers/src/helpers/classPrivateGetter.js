/* @minVersion 7.22.0 */

import assertClassBrand from "assertClassBrand";

export default function _classPrivateGetter(receiver, privateMap, getter) {
  return getter.call(assertClassBrand(receiver, privateMap));
}
