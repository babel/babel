/* @minVersion 7.27.0 */
/* @mangleFns */
/* @internal */

import OverloadYield from "./OverloadYield.ts";
import define from "./regeneratorDefine.ts";
import tryCatch from "./tryCatch.ts";
import defineIteratorMethods from "./regeneratorDefineIM.ts";

export default /* @no-mangle */ function AsyncIterator(
  this: any,
  generator: Generator,
  PromiseImpl: PromiseConstructor,
) {
  if (!this.next) {
    defineIteratorMethods(AsyncIterator.prototype);
    define(
      AsyncIterator.prototype,
      (typeof Symbol === "function" && Symbol.asyncIterator) ||
        "@asyncIterator",
      function (this: any) {
        return this;
      },
    );
  }

  function invoke(
    method: "next" | "throw" | "return",
    arg: any,
    resolve: (value: any) => void,
    reject: (error: any) => void,
  ): any {
    var record = tryCatch(generator[method], generator, arg);
    if (/* error */ record.e) {
      reject(record.v);
    } else {
      var result = record.v;
      var value = result.value;
      if (value && value instanceof OverloadYield) {
        return PromiseImpl.resolve(value.v).then(
          function (value) {
            invoke("next", value, resolve, reject);
          },
          function (err) {
            invoke("throw", err, resolve, reject);
          },
        );
      }

      return PromiseImpl.resolve(value).then(
        function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        },
        function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        },
      );
    }
  }

  var previousPromise: Promise<any>;

  function enqueue(method: "next" | "throw" | "return", arg: any) {
    function callInvokeWithMethodAndArg() {
      return new PromiseImpl(function (resolve, reject) {
        invoke(method, arg, resolve, reject);
      });
    }

    return (previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise
        ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg,
          )
        : callInvokeWithMethodAndArg());
  }

  // Define the unified helper method that is used to implement .next,
  // .throw, and .return (see defineIteratorMethods).
  define(this, "_invoke", enqueue, true);
}
