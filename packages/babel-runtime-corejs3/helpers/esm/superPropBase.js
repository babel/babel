import getPrototypeOf from "./getPrototypeOf.js";
function _superPropBase(o, t) {
  for (; !{}.hasOwnProperty.call(o, t) && null !== (o = getPrototypeOf(o)););
  return o;
}
export { _superPropBase as default };