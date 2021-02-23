import arrayWithHoles from "@babel/runtime/helpers/arrayWithHoles";
import iterableToArray from "@babel/runtime/helpers/iterableToArray";
import unsupportedIterableToArray from "@babel/runtime/helpers/unsupportedIterableToArray";
import nonIterableRest from "@babel/runtime/helpers/nonIterableRest";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}