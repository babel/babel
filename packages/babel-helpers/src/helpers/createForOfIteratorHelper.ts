/* @minVersion 7.9.0 */

import unsupportedIterableToArray from "./unsupportedIterableToArray.ts";

export type IteratorFunction<T> = () => Iterator<T>;

export interface ForOfIteratorHelper<T> {
  // s: start (create the iterator)
  s: () => void;
  // n: next
  n: () => IteratorResult<T, undefined>;
  // e: error (called whenever something throws)
  e: (e: Error) => void;
  // f: finish (always called at the end)
  f: () => void;
}

export default function _createForOfIteratorHelper<T>(
  o: T[] | Iterable<T> | ArrayLike<T>,
  allowArrayLike: boolean,
): ForOfIteratorHelper<T> {
  var it: IteratorFunction<T> | Iterator<T> | T[] | undefined =
    (typeof Symbol !== "undefined" && (o as Iterable<T>)[Symbol.iterator]) ||
    (o as any)["@@iterator"];

  if (!it) {
    // Fallback for engines without symbol support
    if (
      Array.isArray(o) ||
      // union type doesn't work with function overload, have to use "as any".
      (it = unsupportedIterableToArray(o as any) as T[] | undefined) ||
      (allowArrayLike && o && typeof (o as ArrayLike<T>).length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          // After "Array.isArray" check, unsupportedIterableToArray to array, and allow arraylike
          // o is sure to be an array or arraylike, but TypeScript doesn't know that
          if (i >= (o as T[] | ArrayLike<T>).length) {
            // explicit missing the "value" (undefined) to reduce the bundle size
            return { done: true } as IteratorReturnResult<undefined>;
          }
          return { done: false, value: (o as T[] | ArrayLike<T>)[i++] };
        },
        e: function (e: Error) {
          throw e;
        },
        f: F,
      };
    }

    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
    );
  }

  var normalCompletion = true,
    didErr = false,
    err: Error | undefined;

  // "it" is being reassigned multiple times to reduce the variables (bundle size)
  // thus TypeScript can't infer the correct type of the "it"
  return {
    s: function () {
      it = (it as IteratorFunction<T>).call(o);
    },
    n: function () {
      var step = (it as Iterator<T>).next();
      normalCompletion = step.done!;
      return step;
    },
    e: function (e: Error) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && (it as Iterator<T>).return != null) {
          (it as Iterator<T>).return!();
        }
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        if (didErr) throw err!;
      }
    },
  };
}
