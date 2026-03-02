/* @minVersion 7.9.0 */

import unsupportedIterableToArray from "./unsupportedIterableToArray.ts";

import type { IteratorFunction } from "./createForOfIteratorHelper.ts";

export default function _createForOfIteratorHelperLoose<T>(
  o: T[] | Iterable<T> | ArrayLike<T>,
  allowArrayLike: boolean,
): () => IteratorResult<T, undefined> {
  var it:
    | IteratorFunction<T>
    | Iterator<T>
    | T[]
    | IteratorResult<T, undefined>
    | undefined =
    (typeof Symbol !== "undefined" && (o as Iterable<T>)[Symbol.iterator]) ||
    (o as any)["@@iterator"];

  if (it) return (it = (it as IteratorFunction<T>).call(o)).next.bind(it);

  // Fallback for engines without symbol support
  if (
    Array.isArray(o) ||
    // union type doesn't work with function overload, have to use "as any".
    (it = unsupportedIterableToArray(o as any) as T[] | undefined) ||
    (allowArrayLike && o && typeof (o as ArrayLike<T>).length === "number")
  ) {
    if (it) o = it;
    var i = 0;
    return function () {
      // After "Array.isArray" check, unsupportedIterableToArray to array, and allow arraylike
      // o is sure to be an array or arraylike, but TypeScript doesn't know that
      if (i >= (o as T[] | ArrayLike<T>).length) {
        // explicit missing the "value" (undefined) to reduce the bundle size
        return { done: true } as IteratorReturnResult<undefined>;
      }

      return { done: false, value: (o as T[] | ArrayLike<T>)[i++] };
    };
  }

  throw new TypeError(
    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
  );
}
