import arrayLikeToArray from "./arrayLikeToArray.js";
import iterableToArray from "./iterableToArray.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
import nonIterableSpread from "./nonIterableSpread.js";
function _toConsumableArray(t) {
  var m = iterableToArray(t);
  return m === t ? arrayLikeToArray(t) : m || unsupportedIterableToArray(t) || nonIterableSpread();
}
export { _toConsumableArray as default };