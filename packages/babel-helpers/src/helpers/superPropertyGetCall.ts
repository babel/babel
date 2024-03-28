/* @minVersion 7.24.4 */

// @ts-expect-error helper
import get from "get";
// @ts-expect-error helper
import getPrototypeOf from "getPrototypeOf";

export default function _superPropertyGetCall(
  classArg: any,
  property: string,
  receiver: any,
  prototype?: 0 | 1,
  args?: any[],
) {
  var _ = get(
    getPrototypeOf(prototype ? classArg.prototype : classArg),
    property,
    receiver,
  );
  return args ? _.apply(receiver, args) : _;
}
