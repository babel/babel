/* @minVersion 7.0.0-beta.0 */

export default function _iterableToArrayLimit<T>(arr: Iterable<T>, i: number) {
  // this is an expanded form of \`for...of\` that properly supports abrupt completions of
  // iterators etc.

  var iterator: Iterator<T> =
    arr == null
      ? null
      : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
        (arr as any)["@@iterator"];
  if (iterator == null) return;

  var _arr: T[] = [];
  var iteratorNormalCompletion = true;
  var didIteratorError = false;
  var step, iteratorError, next, _return;
  try {
    next = (iterator = (iterator as unknown as Function).call(arr)).next;
    if (i === 0) {
      if (Object(iterator) !== iterator) return;
      iteratorNormalCompletion = false;
    } else {
      for (
        ;
        !(iteratorNormalCompletion = (step = next.call(iterator)).done);
        iteratorNormalCompletion = true
      ) {
        _arr.push(step.value);
        if (_arr.length === i) break;
      }
    }
  } catch (err) {
    didIteratorError = true;
    iteratorError = err;
  } finally {
    try {
      if (!iteratorNormalCompletion && iterator["return"] != null) {
        _return = iterator["return"]();
        // eslint-disable-next-line no-unsafe-finally
        if (Object(_return) !== _return) return;
      }
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      if (didIteratorError) throw iteratorError;
    }
  }
  return _arr;
}
