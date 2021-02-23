import undef from "../temporalUndefined/_index.mjs";
import err from "../tdz/_index.mjs";
export default function _temporalRef(val, name) {
  return val === undef ? err(name) : val;
}