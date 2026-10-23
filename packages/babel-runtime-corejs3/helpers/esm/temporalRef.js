import temporalUndefined from "./temporalUndefined.js";
import tdz from "./tdz.js";
function _temporalRef(e, o) {
  return e === temporalUndefined ? tdz(o) : e;
}
export { _temporalRef as default };