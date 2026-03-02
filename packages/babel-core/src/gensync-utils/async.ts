import gensync, { type Gensync, type Handler, type Callback } from "gensync";

type MaybePromise<T> = T | Promise<T>;

const runGenerator: {
  sync<Return>(gen: Handler<Return>): Return;
  async<Return>(gen: Handler<Return>): Promise<Return>;
  errback<Return>(gen: Handler<Return>, cb: Callback<Return>): void;
} = gensync(function* (item: Handler<any>): Handler<any> {
  return yield* item;
});

// This Gensync returns true if the current execution context is
// asynchronous, otherwise it returns false.
export const isAsync = gensync({
  sync: () => false,
  errback: cb => cb(null, true),
});

// This function wraps any functions (which could be either synchronous or
// asynchronous) with a Gensync. If the wrapped function returns a promise
// but the current execution context is synchronous, it will throw the
// provided error.
// This is used to handle user-provided functions which could be asynchronous.
export function maybeAsync<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  message: string,
): Gensync<Args, Return> {
  return gensync({
    sync(...args) {
      const result = fn.apply(this, args);
      if (isThenable(result)) throw new Error(message);
      return result;
    },
    async(...args) {
      return Promise.resolve(fn.apply(this, args));
    },
  });
}

const withKind = gensync({
  sync: cb => cb("sync"),
  async: async cb => cb("async"),
}) as <T>(cb: (kind: "sync" | "async") => MaybePromise<T>) => Handler<T>;

// This function wraps a generator (or a Gensync) into another function which,
// when called, will run the provided generator in a sync or async way, depending
// on the execution context where this forwardAsync function is called.
// This is useful, for example, when passing a callback to a function which isn't
// aware of gensync, but it only knows about synchronous and asynchronous functions.
// An example is cache.using, which being exposed to the user must be as simple as
// possible:
//     yield* forwardAsync(gensyncFn, wrappedFn =>
//       cache.using(x => {
//         // Here we don't know about gensync. wrappedFn is a
//         // normal sync or async function
//         return wrappedFn(x);
//       })
//     )
export function forwardAsync<Args extends unknown[], Return>(
  action: (...args: Args) => Handler<Return>,
  cb: (
    adapted: (...args: Args) => MaybePromise<Return>,
  ) => MaybePromise<Return>,
): Handler<Return> {
  const g = gensync(action);
  return withKind(kind => {
    const adapted = g[kind];
    return cb(adapted);
  });
}

// If the given generator is executed asynchronously, the first time that it
// is paused (i.e. When it yields a gensync generator which can't be run
// synchronously), call the "firstPause" callback.
export const onFirstPause = gensync<
  [gen: Handler<unknown>, firstPause: () => void],
  unknown
>({
  name: "onFirstPause",
  arity: 2,
  sync: function (item) {
    return runGenerator.sync(item);
  },
  errback: function (item, firstPause, cb) {
    let completed = false;

    runGenerator.errback(item, (err, value) => {
      completed = true;
      cb(err, value);
    });

    if (!completed) {
      firstPause();
    }
  },
}) as <T>(gen: Handler<T>, firstPause: () => void) => Handler<T>;

// Wait for the given promise to be resolved
export const waitFor = gensync({
  sync: x => x,
  async: async x => x,
}) as <T>(p: T | Promise<T>) => Handler<T>;

export function isThenable<T = any>(val: any): val is PromiseLike<T> {
  return (
    !!val &&
    (typeof val === "object" || typeof val === "function") &&
    !!val.then &&
    typeof val.then === "function"
  );
}
