/* @minVersion 7.0.0-beta.0 */

import undef from "./temporalUndefined.ts";
import err from "./tdz.ts";

export default function _temporalRef<T>(val: T, name: string) {
  return val === undef ? err(name) : val;
}
