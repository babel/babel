/* @minVersion 7.0.0-beta.0 */

import OverloadYield from "./OverloadYield.ts";

type AsyncIteratorMethod = "next" | "throw" | "return";

interface AsyncGeneratorImpl<T = unknown, TReturn = any, TNext = unknown>
  extends AsyncGenerator<T, TReturn, TNext> {
  _invoke: (
    key: AsyncIteratorMethod,
    arg: IteratorResult<T>,
  ) => Promise<IteratorResult<T, TReturn>>;

  next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
  return(
    value: TReturn | PromiseLike<TReturn>,
  ): Promise<IteratorResult<T, TReturn>>;
  throw(e: any): Promise<IteratorResult<T, TReturn>>;
  [Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;
}

interface AsyncGeneratorImplConstructor {
  new <T = unknown, TReturn = any, TNext = unknown>(
    gen: Generator<T, TReturn, TNext>,
  ): AsyncGeneratorImpl<T, TReturn, TNext>;
  prototype: AsyncGeneratorImpl;
}

interface AsyncGeneratorRequest<T = unknown, TReturn = any, TNext = unknown> {
  key: AsyncIteratorMethod;
  arg: IteratorResult<T>;
  resolve: (value: IteratorResult<T, TReturn>) => void;
  reject: (error: any) => void;
  next: AsyncGeneratorRequest<T, TReturn, TNext> | null;
}

var AsyncGeneratorImpl = function <T = unknown, TReturn = any, TNext = unknown>(
  this: AsyncGeneratorImpl<T, TReturn, TNext>,
  gen: Generator<T, TReturn, TNext>,
) {
  var front: AsyncGeneratorRequest<T, TReturn, TNext> | null,
    back: AsyncGeneratorRequest<T, TReturn, TNext> | null;

  function send(key: AsyncIteratorMethod, arg: IteratorResult<T>) {
    return new Promise<IteratorResult<T, TReturn>>(function (resolve, reject) {
      var request: AsyncGeneratorRequest<T, TReturn, TNext> = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null,
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key: AsyncIteratorMethod, arg: IteratorResult<T, TReturn>) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var overloaded = value instanceof OverloadYield;

      Promise.resolve(
        overloaded ? (value as OverloadYield<T | TReturn>).v : value,
      ).then(
        function (arg: any) {
          if (overloaded) {
            // Overloaded yield requires calling into the generator twice:
            //  - first we get the iterator result wrapped in a promise
            //    (the gen[key](arg) call above)
            //  - then we await it (the Promise.resolve call above)
            //  - then we give the result back to the iterator, so that it can:
            //    * if it was an await, use its result
            //    * if it was a yield*, possibly return the `done: true` signal
            //      so that yield* knows that the iterator is finished.
            //      This needs to happen in the second call, because in the
            //      first one `done: true` was hidden in the promise and thus
            //      not visible to the (sync) yield*.
            //      The other part of this implementation is in asyncGeneratorDelegate.
            var nextKey: "return" | "next" =
              key === "return" ? "return" : "next";
            if (
              !(value as OverloadYield<IteratorReturnResult<T>>).k ||
              arg.done
            ) {
              // await or end of yield*
              resume(nextKey, arg);
              return;
            } else {
              // yield*, not done
              arg = gen[nextKey](arg).value;
            }
          }

          settle(result.done ? "return" : "normal", arg);
        },
        function (err) {
          resume("throw", err);
        },
      );
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type: AsyncIteratorMethod | "normal", value: any) {
    switch (type) {
      case "return":
        front!.resolve({ value: value, done: true });
        break;
      case "throw":
        front!.reject(value);
        break;
      default:
        front!.resolve({ value: value, done: false });
        break;
    }

    front = front!.next;
    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  // Hide "return" method if generator return is not supported
  if (typeof gen.return !== "function") {
    // @ts-expect-error -- intentionally remove "return" when not supported
    this.return = undefined;
  }
} as any as AsyncGeneratorImplConstructor;

AsyncGeneratorImpl.prototype[
  ((typeof Symbol === "function" && Symbol.asyncIterator) ||
    "@@asyncIterator") as typeof Symbol.asyncIterator
] = function () {
  return this;
};

AsyncGeneratorImpl.prototype.next = function (arg: IteratorResult<any>) {
  return this._invoke("next", arg);
};
AsyncGeneratorImpl.prototype.throw = function (arg: IteratorResult<any>) {
  return this._invoke("throw", arg);
};
AsyncGeneratorImpl.prototype.return = function (arg: IteratorResult<any>) {
  return this._invoke("return", arg);
};

export default AsyncGeneratorImpl;
