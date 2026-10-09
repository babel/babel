/* @minVersion 7.25.0 */

import set from "./set.ts";
import getPrototypeOf from "./getPrototypeOf.ts";

export default function _superPropSet(
  classArg: any,
  property: string,
  value: any,
  receiver: any,
  isStrict: boolean,
  prototype?: 1,
) {
  return set(
    getPrototypeOf(prototype ? classArg.prototype : classArg),
    property,
    value,
    receiver,
    isStrict,
  );
}
