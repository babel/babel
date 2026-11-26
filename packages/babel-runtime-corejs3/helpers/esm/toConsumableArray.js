import arrayLikeToArray from "./arrayLikeToArray.js";
import iterableToArray from "./iterableToArray.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
import nonIterableSpread from "./nonIterableSpread.js";
function _toConsumableArray(r) {
  var a = iterableToArray(r);
  return a === r ? arrayLikeToArray(r) : a || unsupportedIterableToArray(r) || nonIterableSpread();
}
export { _toConsumableArray as default };