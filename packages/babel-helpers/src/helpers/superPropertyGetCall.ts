/* @minVersion 7.24.4 */

import get from "./get.ts";
import getPrototypeOf from "./getPrototypeOf.ts";

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
