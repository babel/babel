import arrayWithHoles from "@babel/runtime-corejs2/helpers/arrayWithHoles";
import iterableToArray from "@babel/runtime-corejs2/helpers/iterableToArray";
import unsupportedIterableToArray from "@babel/runtime-corejs2/helpers/unsupportedIterableToArray";
import nonIterableRest from "@babel/runtime-corejs2/helpers/nonIterableRest";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}