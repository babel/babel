/* @minVersion 7.3.2 */

import assertClassBrand from "assertClassBrand";
export default function _classStaticPrivateMethodGet(
  receiver,
  classConstructor,
  method,
) {
  assertClassBrand(classConstructor, receiver);
  return method;
}
