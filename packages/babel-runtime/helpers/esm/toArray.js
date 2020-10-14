import arrayWithHoles from "@babel/runtime/helpers/esm/arrayWithHoles";
import iterableToArray from "@babel/runtime/helpers/esm/iterableToArray";
import unsupportedIterableToArray from "@babel/runtime/helpers/esm/unsupportedIterableToArray";
import nonIterableRest from "@babel/runtime/helpers/esm/nonIterableRest";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}