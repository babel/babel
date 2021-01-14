import undef from "@babel/runtime-corejs2/helpers/temporalUndefined";
import err from "@babel/runtime-corejs2/helpers/tdz";
export default function _temporalRef(val, name) {
  return val === undef ? err(name) : val;
}