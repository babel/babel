/* @minVersion 7.15.9 */

export default function _asyncIterator(iterable) {
  var method,
    async,
    sync,
    retry = 2;

  if (typeof Symbol !== "undefined") {
    async = Symbol.asyncIterator;
    sync = Symbol.iterator;
  }

  while (retry--) {
    if (async && (method = iterable[async]) != null) {
      return method.call(iterable);
    }
    if (sync && (method = iterable[sync]) != null) {
      return method.call(iterable);
    }

    async = "@@asyncIterator";
    sync = "@@iterator";
  }

  throw new TypeError("Object is not async iterable");
}
