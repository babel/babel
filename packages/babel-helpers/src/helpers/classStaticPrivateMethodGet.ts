/* @minVersion 7.3.2 */

import assertClassBrand from "./assertClassBrand.ts";
export default function _classStaticPrivateMethodGet<T extends Function>(
  receiver: Function,
  classConstructor: Function,
  method: T,
) {
  assertClassBrand(classConstructor, receiver);
  return method;
}
