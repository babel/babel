import undef from "@babel/runtime/helpers/esm/temporalUndefined";
import err from "@babel/runtime/helpers/esm/tdz";
export default function _temporalRef(val, name) {
  return val === undef ? err(name) : val;
}