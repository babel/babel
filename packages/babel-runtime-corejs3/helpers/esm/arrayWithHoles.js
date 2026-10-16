import _Array$isArray from "core-js-pure/features/array/is-array.js";
function _arrayWithHoles(r) {
  if (_Array$isArray(r) && r[Symbol.iterator] === Array.prototype[Symbol.iterator]) return r;
}
export { _arrayWithHoles as default };