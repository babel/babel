import iterableToArrayLimit from "./iterableToArrayLimit.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
import nonIterableRest from "./nonIterableRest.js";
function _slicedToArray(e, i) {
  return iterableToArrayLimit(e, i) || unsupportedIterableToArray(e, i) || nonIterableRest();
}
export { _slicedToArray as default };