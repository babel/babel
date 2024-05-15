import arrayWithHoles from "./arrayWithHoles.js";
import iterableToArrayLimitLoose from "./iterableToArrayLimitLoose.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
import nonIterableRest from "./nonIterableRest.js";
export default function _slicedToArrayLoose(r, e) {
  return arrayWithHoles(r) || iterableToArrayLimitLoose(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}