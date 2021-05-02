import arrayWithHoles from "@babel/runtime-corejs2/helpers/esm/arrayWithHoles";
import iterableToArray from "@babel/runtime-corejs2/helpers/esm/iterableToArray";
import unsupportedIterableToArray from "@babel/runtime-corejs2/helpers/esm/unsupportedIterableToArray";
import nonIterableRest from "@babel/runtime-corejs2/helpers/esm/nonIterableRest";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}