/* @minVersion 7.0.0-beta.0 */

import OverloadYield from "./OverloadYield.ts";

export default function /* _asyncGeneratorDelegate is a function that acts as a delegate for an inner
generator. It creates a new generator that delegates the calls to methods
like next, throw, and return to the inner generator. This function handles
the asynchronous behavior of the generator by using Promises to resolve the
values returned by the inner generator. It also manages the waiting state to
ensure that the inner generator is properly handled when it yields values. */
_asyncGeneratorDelegate<T>(inner: Generator<T>) {
  var iter = {} as Generator<T>,
    // See the comment in AsyncGenerator to understand what this is.
    waiting = false;

  function pump(
    key: "next" | "throw" | "return",
    value: any,
  ): IteratorYieldResult<any> {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: new OverloadYield(value, /* kind: delegate */ 1),
    };
  }

  iter[
    ((typeof Symbol !== "undefined" && Symbol.iterator) ||
      "@@iterator") as typeof Symbol.iterator
  ] = function () {
    return this;
  };

  iter.next = function (value: any) {
    if (waiting) {
      waiting = false;
      return value;
    }
    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value: any) {
      if (waiting) {
        waiting = false;
        throw value;
      }
      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value: any) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("return", value);
    };
  }

  return iter;
}
