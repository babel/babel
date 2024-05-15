/* @minVersion 7.1.6 */
/* @onlyBabel7 */

import assertClassBrand from "assertClassBrand";
export default function _classPrivateMethodGet(receiver, privateSet, fn) {
  assertClassBrand(privateSet, receiver);
  return fn;
}
