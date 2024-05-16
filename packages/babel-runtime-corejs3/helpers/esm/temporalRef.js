import undef from "./temporalUndefined.js";
import err from "./tdz.js";
export default function _temporalRef(r, e) {
  return r === undef ? err(e) : r;
}