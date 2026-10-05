/* @minVersion 7.15.9 */

type AsyncIteratorFn<T> = AsyncIterable<T>[typeof Symbol.asyncIterator];
type SyncIteratorFn<T> = Iterable<T>[typeof Symbol.iterator];

export default function _asyncIterator<T>(
  iterable: AsyncIterable<T> | Iterable<T>,
) {
  var method: AsyncIteratorFn<T> | SyncIteratorFn<T>,
    async: typeof Symbol.asyncIterator | "@@asyncIterator" | undefined,
    sync: typeof Symbol.iterator | "@@iterator" | undefined,
    retry = 2;

  if (typeof Symbol !== "undefined") {
    async = Symbol.asyncIterator;
    sync = Symbol.iterator;
  }

  while (retry--) {
    // TypeScript doesn't have in-function narrowing, and TypeScript can't narrow
    // AsyncIterable<T> | Iterable<T> down to AsyncIterable<T>. So let's use any here.
    if (async && (method = (iterable as any)[async]) != null) {
      return (method as AsyncIteratorFn<T>).call(iterable as AsyncIterable<T>);
    }
    // Same here, TypeScript can't narrow AsyncIterable<T> | Iterable<T> down to Iterable<T>.
    if (sync && (method = (iterable as any)[sync]) != null) {
      return new AsyncFromSyncIterator(
        (method as SyncIteratorFn<T>).call(iterable as Iterable<T>),
      );
    }

    async = "@@asyncIterator";
    sync = "@@iterator";
  }

  throw new TypeError("Object is not async iterable");
}

// AsyncFromSyncIterator is actually a class that implements AsyncIterator interface
declare class AsyncFromSyncIterator<
  T = any,
  TReturn = any,
  TNext = undefined,
> implements AsyncIterator<T, TReturn, TNext> {
  s: Iterator<T>;
  n: Iterator<T>["next"];
  constructor(s: Iterator<T>);

  next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
  return?(
    value?: TReturn | PromiseLike<TReturn>,
  ): Promise<IteratorResult<T, TReturn>>;
  throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}

// Actual implementation of AsyncFromSyncIterator starts here
// class only exists in ES6, so we need to use the old school way
// This makes ESLint and TypeScript complain a lot, but it's the only way
function AsyncFromSyncIterator<T, TReturn = any, TNext = undefined>(s: any) {
  // @ts-expect-error - Intentionally overriding the constructor.
  AsyncFromSyncIterator = function (
    this: AsyncFromSyncIterator,
    s: Iterator<T>,
  ) {
    this.s = s;
    this.n = s.next;
  };
  AsyncFromSyncIterator.prototype = {
    // Initiating the "s" and "n", use "any" to prevent TS from complaining
    /* SyncIterator */ s: null as any,
    /* SyncIterator.[[Next]] */ n: null as any,
    next: function () {
      return AsyncFromSyncIteratorContinuation<T, TReturn>(
        // Use "arguments" here for better compatibility and smaller bundle size
        // Intentionally casting "arguments" to an array for the type of func.apply
        this.n.apply(this.s, arguments as any as [] | [undefined]),
        this.s,
      );
    },
    return: function (value) {
      var ret = this.s["return"];
      if (ret === undefined) {
        return Promise.resolve<IteratorReturnResult<TReturn>>({
          // "TReturn | PromiseLike<TReturn>" should have been unwrapped by Awaited<T>,
          // but TypeScript choked, let's just casting it away
          value: value as TReturn,
          done: true,
        });
      }
      return AsyncFromSyncIteratorContinuation<T, TReturn>(
        ret.apply(
          this.s,
          // Use "arguments" here for better compatibility and smaller bundle size
          // Intentionally casting "arguments" to an array for the type of func.apply
          arguments as any as [] | [TReturn | PromiseLike<TReturn>],
        ),
      );
    },
    throw: function () {
      var s = this.s;
      var thr = s["throw"];
      if (thr === undefined) {
        // The sync iterator has no "throw": close it, then reject with a
        // TypeError for the protocol violation. If "return" throws, reject
        // with that error instead.
        return new Promise<IteratorResult<T, TReturn>>(function (_, reject) {
          var ret = s["return"];
          if (ret != null) ret.call(s);
          reject(
            new TypeError("The iterator does not provide a 'throw' method"),
          );
        });
      }
      return AsyncFromSyncIteratorContinuation<T, TReturn>(
        // Use "arguments" here for better compatibility and smaller bundle size
        // Intentionally casting "arguments" to an array for the type of func.apply
        thr.apply(s, arguments as any as [any]),
        s,
      );
    },
  } satisfies AsyncFromSyncIterator<T, TReturn, TNext>;

  // "s" is the sync iterator to close if the value rejects. It is omitted
  // for "return", since the iterator is already being closed.
  function AsyncFromSyncIteratorContinuation<T, TReturn>(
    r: any,
    s?: Iterator<T>,
  ) {
    // This step is _before_ calling AsyncFromSyncIteratorContinuation in the spec.
    if (Object(r) !== r) {
      return Promise.reject(new TypeError(r + " is not an object."));
    }

    var done = r.done,
      value = r.value,
      p: Promise<any>;
    try {
      p = Promise.resolve(value);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      p = Promise.reject(e);
    }
    return p.then<IteratorResult<T, TReturn>>(
      function (value) {
        return { value: value, done: done };
      },
      s && !done
        ? function (e) {
            // Close the sync iterator, ignoring any error from "return",
            // then reject with the original error.
            try {
              var ret = s["return"];
              if (ret != null) ret.call(s);
            } catch (_) {}
            throw e;
          }
        : undefined,
    );
  }

  return new AsyncFromSyncIterator(s);
}
