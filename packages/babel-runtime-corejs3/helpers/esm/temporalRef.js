import temporalUndefined from "./temporalUndefined.js";
import tdz from "./tdz.js";
export default function _temporalRef(r, e) {
  return r === temporalUndefined ? tdz(e) : r;
}