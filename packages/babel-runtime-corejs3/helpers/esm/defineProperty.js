import _Object$defineProperty from "core-js-pure/features/object/define-property.js";
import toPropertyKey from "./toPropertyKey.js";
export default function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? _Object$defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}