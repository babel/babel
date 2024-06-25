/* @minVersion 7.24.4 */

import get from "./get.ts";
import getPrototypeOf from "./getPrototypeOf.ts";

const enum Flags {
  Prototype = 0b1,
  Call = 0b10,
}

export default function _superPropertyGetCall(
  classArg: any,
  property: string,
  receiver: any,
  flags?: number,
) {
  var result = get(
    getPrototypeOf(
      // @ts-expect-error flags may be undefined
      flags & Flags.Prototype ? classArg.prototype : classArg,
    ),
    property,
    receiver,
  );
  // @ts-expect-error flags may be undefined
  return flags & Flags.Call
    ? function (args: any[]) {
        return result.apply(receiver, args);
      }
    : result;
}
