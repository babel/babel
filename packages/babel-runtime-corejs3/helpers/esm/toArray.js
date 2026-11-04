import iterableToArray from "./iterableToArray.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
import nonIterableRest from "./nonIterableRest.js";
function _toArray(e) {
  return iterableToArray(e) || unsupportedIterableToArray(e) || nonIterableRest();
}
export { _toArray as default };