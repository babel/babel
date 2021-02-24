import arrayWithHoles from "../arrayWithHoles/_index.mjs";
import iterableToArray from "../iterableToArray/_index.mjs";
import unsupportedIterableToArray from "../unsupportedIterableToArray/_index.mjs";
import nonIterableRest from "../nonIterableRest/_index.mjs";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}