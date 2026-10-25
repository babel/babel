import arrayWithoutHoles from "./arrayWithoutHoles.js";
import iterableToArray from "./iterableToArray.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
import nonIterableSpread from "./nonIterableSpread.js";
function _toConsumableArray(a) {
  return arrayWithoutHoles(a) || iterableToArray(a) || unsupportedIterableToArray(a) || nonIterableSpread();
}
export { _toConsumableArray as default };