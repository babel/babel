/* @minVersion 7.1.5 */

// https://tc39.es/ecma262/#sec-topropertykey

import toPrimitive from "./toPrimitive.ts";

export default function toPropertyKey(arg: unknown) {
  var key = toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
