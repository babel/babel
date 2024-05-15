/* @minVersion 7.13.10 */
/* @onlyBabel7 */

import assertClassBrand from "assertClassBrand";
export default function _classCheckPrivateStaticAccess(
  receiver,
  classConstructor,
  returnValue,
) {
  return assertClassBrand(classConstructor, receiver, returnValue);
}
