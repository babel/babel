/* @minVersion 7.22.0 */

import assertClassBrand from "assertClassBrand";

export default function _classPrivateSetter(
  receiver,
  privateMap,
  setter,
  value,
) {
  setter.call(assertClassBrand(receiver, privateMap), value);
  return value;
}
