/* @minVersion 7.24.4 */

// @ts-expect-error helper
import set from "set";
// @ts-expect-error helper
import getPrototypeOf from "getPrototypeOf";

export default function _superPropertySet(
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
