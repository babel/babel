/* @minVersion 7.18.0 */
/* @mangleFns */
/* @internal */

export default function _regeneratorValues(iterable: any) {
  if (iterable != null) {
    var iteratorMethod =
      iterable[
        (typeof Symbol === "function" && Symbol.iterator) || "@@iterator"
      ];
    if (iteratorMethod) {
      return iteratorMethod.call(iterable);
    }

    if (typeof iterable.next === "function") {
      return iterable;
    }

    if (!isNaN(iterable.length)) {
      var i = -1,
        next = function next() {
          while (++i < iterable.length) {
            if ({}.hasOwnProperty.call(iterable, i)) {
              // @ts-expect-error assign to () => ...
              next.value = iterable[i];
              // @ts-expect-error assign to () => ...
              next.done = false;
              return next;
            }
          }

          // @ts-expect-error assign to () => ...
          next.value = undefined;
          // @ts-expect-error assign to () => ...
          next.done = true;

          return next;
        };

      // @ts-expect-error assign to () => ...
      return (next.next = next);
    }
  }

  throw new TypeError(typeof iterable + " is not iterable");
}
