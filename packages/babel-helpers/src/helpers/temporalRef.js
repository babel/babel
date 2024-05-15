/* @minVersion 7.0.0-beta.0 */

import undef from "temporalUndefined";
import err from "tdz";

export default function _temporalRef(val, name) {
  return val === undef ? err(name) : val;
}
