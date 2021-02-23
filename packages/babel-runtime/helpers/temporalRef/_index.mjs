import undef from "@babel/runtime/helpers/temporalUndefined";
import err from "@babel/runtime/helpers/tdz";
export default function _temporalRef(val, name) {
  return val === undef ? err(name) : val;
}