// @flow

import gensync, { type Gensync, type Handler } from "gensync";

type MaybePromise<T> = T | Promise<T>;

const id = x => x;

const runGenerator = gensync(function*(item) {
  return yield* item;
});

// This Gensync returns true if the current execution contect is
// asynchronous, otherwise it returns false.
export const isAsync = gensync<[], boolean>({
  sync: () => false,
  errback: cb => cb(null, true),
});

// This function wraps any functions (which could be either synchronous or
// asynchronous) with a Gensync. If the wrapped function returns a promise
// but the current execution context is synchronous, it will throw the
// provided error.
// This is used to handle user-provided functions which could be asynchronous.
export function maybeAsync<T, Args: any[]>(
  fn: (...args: Args) => T,
  message: string,
): Gensync<Args, T> {
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

const withKind = (gensync<[any], any>({
  sync: cb => cb("sync"),
  async: cb => cb("async"),
}): <T>(cb: (kind: "sync" | "async") => MaybePromise<T>) => Handler<T>);

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
export function forwardAsync<ActionArgs: mixed[], ActionReturn, Return>(
  action: (...args: ActionArgs) => Handler<ActionReturn>,
  cb: (
    adapted: (...args: ActionArgs) => MaybePromise<ActionReturn>,
  ) => MaybePromise<Return>,
): Handler<Return> {
  const g = gensync<ActionArgs, ActionReturn>(action);
  return withKind<Return>(kind => {
    const adapted = g[kind];
    return cb(adapted);
  });
}

// If the given generator is executed asynchronously, the first time that it
// is paused (i.e. When it yields a gensync generator which can't be run
// synchronously), call the "firstPause" callback.
export const onFirstPause = (gensync<[any, any], any>({
  name: "onFirstPause",
  arity: 2,
  sync: function(item) {
    return runGenerator.sync(item);
  },
  errback: function(item, firstPause, cb) {
    let completed = false;

    runGenerator.errback(item, (err, value) => {
      completed = true;
      cb(err, value);
    });

    if (!completed) {
      firstPause();
    }
  },
}): <T>(gen: Generator<*, T, *>, cb: Function) => Handler<T>);

// Wait for the given promise to be resolved
export const waitFor = (gensync<[any], any>({
  sync: id,
  async: id,
}): <T>(p: T | Promise<T>) => Handler<T>);

export function isThenable(val: mixed): boolean %checks {
  return (
    /*:: val instanceof Promise && */
    !!val &&
    (typeof val === "object" || typeof val === "function") &&
    !!val.then &&
    typeof val.then === "function"
  );
}
