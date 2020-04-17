// @flow

import gensync, { type Handler } from "gensync";
import {
  maybeAsync,
  isAsync,
  onFirstPause,
  waitFor,
  isThenable,
} from "../gensync-utils/async";
import { isIterableIterator } from "./util";

export type { CacheConfigurator };

export type SimpleCacheConfigurator = SimpleCacheConfiguratorFn &
  SimpleCacheConfiguratorObj;

type SimpleCacheConfiguratorFn = {
  (boolean): void,
  <T>(handler: () => T): T,
};
type SimpleCacheConfiguratorObj = {
  forever: () => void,
  never: () => void,
  using: <T>(handler: () => T) => T,
  invalidate: <T>(handler: () => T) => T,
};

export type CacheEntry<ResultT, SideChannel> = Array<{
  value: ResultT,
  valid: SideChannel => Handler<boolean>,
}>;

const synchronize = <ArgsT, ResultT>(
  gen: (...ArgsT) => Handler<ResultT>,
  // $FlowIssue https://github.com/facebook/flow/issues/7279
): ((...args: ArgsT) => ResultT) => {
  return gensync(gen).sync;
};

// eslint-disable-next-line require-yield, no-unused-vars
function* genTrue(data: any) {
  return true;
}

export function makeWeakCache<ArgT, ResultT, SideChannel>(
  handler: (ArgT, CacheConfigurator<SideChannel>) => Handler<ResultT> | ResultT,
): (ArgT, SideChannel) => Handler<ResultT> {
  return makeCachedFunction<ArgT, ResultT, SideChannel, *>(WeakMap, handler);
}

export function makeWeakCacheSync<ArgT, ResultT, SideChannel>(
  handler: (ArgT, CacheConfigurator<SideChannel>) => ResultT,
): (ArgT, SideChannel) => ResultT {
  return synchronize<[ArgT, SideChannel], ResultT>(
    makeWeakCache<ArgT, ResultT, SideChannel>(handler),
  );
}

export function makeStrongCache<ArgT, ResultT, SideChannel>(
  handler: (ArgT, CacheConfigurator<SideChannel>) => Handler<ResultT> | ResultT,
): (ArgT, SideChannel) => Handler<ResultT> {
  return makeCachedFunction<ArgT, ResultT, SideChannel, *>(Map, handler);
}

export function makeStrongCacheSync<ArgT, ResultT, SideChannel>(
  handler: (ArgT, CacheConfigurator<SideChannel>) => ResultT,
): (ArgT, SideChannel) => ResultT {
  return synchronize<[ArgT, SideChannel], ResultT>(
    makeStrongCache<ArgT, ResultT, SideChannel>(handler),
  );
}

/* NOTE: Part of the logic explained in this comment is explained in the
 *       getCachedValueOrWait and setupAsyncLocks functions.
 *
 * > There are only two hard things in Computer Science: cache invalidation and naming things.
 * > -- Phil Karlton
 *
 * I don't know if Phil was also thinking about handling a cache whose invalidation function is
 * defined asynchronously is considered, but it is REALLY hard to do correctly.
 *
 * The implemented logic (only when gensync is run asynchronously) is the following:
 *   1. If there is a valid cache associated to the current "arg" parameter,
 *       a. RETURN the cached value
 *   3. If there is a FinishLock associated to the current "arg" parameter representing a valid cache,
 *       a. Wait for that lock to be released
 *       b. RETURN the value associated with that lock
 *   5. Start executing the function to be cached
 *       a. If it pauses on a promise, then
 *           i. Let FinishLock be a new lock
 *          ii. Store FinishLock as associated to the current "arg" parameter
 *         iii. Wait for the function to finish executing
 *          iv. Release FinishLock
 *           v. Send the function result to anyone waiting on FinishLock
 *   6. Store the result in the cache
 *   7. RETURN the result
 */
function makeCachedFunction<ArgT, ResultT, SideChannel, Cache: *>(
  CallCache: Class<Cache>,
  handler: (ArgT, CacheConfigurator<SideChannel>) => Handler<ResultT> | ResultT,
): (ArgT, SideChannel) => Handler<ResultT> {
  const callCacheSync = new CallCache();
  const callCacheAsync = new CallCache();
  const futureCache = new CallCache();

  return function* cachedFunction(arg: ArgT, data: SideChannel) {
    const asyncContext = yield* isAsync();
    const callCache = asyncContext ? callCacheAsync : callCacheSync;

    const cached = yield* getCachedValueOrWait(
      asyncContext,
      callCache,
      futureCache,
      arg,
      data,
    );
    if (cached.valid) return cached.value;

    const cache = new CacheConfigurator(data);

    const handlerResult = handler(arg, cache);

    let finishLock: ?Lock<ResultT>;
    let value: ResultT;

    if (isIterableIterator(handlerResult)) {
      // Flow refines handlerResult to Generator<any, any, any>
      const gen = (handlerResult: Generator<*, ResultT, *>);

      value = yield* onFirstPause(gen, () => {
        finishLock = setupAsyncLocks(cache, futureCache, arg);
      });
    } else {
      // $FlowIgnore doesn't refine handlerResult to ResultT
      value = (handlerResult: ResultT);
    }

    updateFunctionCache(callCache, cache, arg, value);

    if (finishLock) {
      futureCache.delete(arg);
      finishLock.release(value);
    }

    return value;
  };
}

type CacheMap<ArgT, ResultT, SideChannel> =
  | Map<ArgT, CacheEntry<ResultT, SideChannel>>
  | WeakMap<ArgT, CacheEntry<ResultT, SideChannel>>;

function* getCachedValue<
  ArgT,
  ResultT,
  SideChannel,
  // $FlowIssue https://github.com/facebook/flow/issues/4528
  Cache: CacheMap<ArgT, ResultT, SideChannel>,
>(
  cache: Cache,
  arg: ArgT,
  data: SideChannel,
): Handler<{ valid: true, value: ResultT } | { valid: false, value: null }> {
  const cachedValue: CacheEntry<ResultT, SideChannel> | void = cache.get(arg);

  if (cachedValue) {
    for (const { value, valid } of cachedValue) {
      if (yield* valid(data)) return { valid: true, value };
    }
  }

  return { valid: false, value: null };
}

function* getCachedValueOrWait<ArgT, ResultT, SideChannel>(
  asyncContext: boolean,
  callCache: CacheMap<ArgT, ResultT, SideChannel>,
  futureCache: CacheMap<ArgT, Lock<ResultT>, SideChannel>,
  arg: ArgT,
  data: SideChannel,
): Handler<{ valid: true, value: ResultT } | { valid: false, value: null }> {
  const cached = yield* getCachedValue(callCache, arg, data);
  if (cached.valid) {
    return cached;
  }

  if (asyncContext) {
    const cached = yield* getCachedValue(futureCache, arg, data);
    if (cached.valid) {
      const value = yield* waitFor<ResultT>(cached.value.promise);
      return { valid: true, value };
    }
  }

  return { valid: false, value: null };
}

function setupAsyncLocks<ArgT, ResultT, SideChannel>(
  config: CacheConfigurator<SideChannel>,
  futureCache: CacheMap<ArgT, Lock<ResultT>, SideChannel>,
  arg: ArgT,
): Lock<ResultT> {
  const finishLock = new Lock<ResultT>();

  updateFunctionCache(futureCache, config, arg, finishLock);

  return finishLock;
}

function updateFunctionCache<
  ArgT,
  ResultT,
  SideChannel,
  // $FlowIssue https://github.com/facebook/flow/issues/4528
  Cache: CacheMap<ArgT, ResultT, SideChannel>,
>(
  cache: Cache,
  config: CacheConfigurator<SideChannel>,
  arg: ArgT,
  value: ResultT,
) {
  if (!config.configured()) config.forever();

  let cachedValue: CacheEntry<ResultT, SideChannel> | void = cache.get(arg);

  config.deactivate();

  switch (config.mode()) {
    case "forever":
      cachedValue = [{ value, valid: genTrue }];
      cache.set(arg, cachedValue);
      break;
    case "invalidate":
      cachedValue = [{ value, valid: config.validator() }];
      cache.set(arg, cachedValue);
      break;
    case "valid":
      if (cachedValue) {
        cachedValue.push({ value, valid: config.validator() });
      } else {
        cachedValue = [{ value, valid: config.validator() }];
        cache.set(arg, cachedValue);
      }
  }
}

class CacheConfigurator<SideChannel = void> {
  _active: boolean = true;
  _never: boolean = false;
  _forever: boolean = false;
  _invalidate: boolean = false;

  _configured: boolean = false;

  _pairs: Array<[mixed, (SideChannel) => Handler<mixed>]> = [];

  _data: SideChannel;

  constructor(data: SideChannel) {
    this._data = data;
  }

  simple() {
    return makeSimpleConfigurator(this);
  }

  mode() {
    if (this._never) return "never";
    if (this._forever) return "forever";
    if (this._invalidate) return "invalidate";
    return "valid";
  }

  forever() {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }
    if (this._never) {
      throw new Error("Caching has already been configured with .never()");
    }
    this._forever = true;
    this._configured = true;
  }

  never() {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }
    if (this._forever) {
      throw new Error("Caching has already been configured with .forever()");
    }
    this._never = true;
    this._configured = true;
  }

  using<T>(handler: SideChannel => T): T {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }
    if (this._never || this._forever) {
      throw new Error(
        "Caching has already been configured with .never or .forever()",
      );
    }
    this._configured = true;

    const key = handler(this._data);

    const fn = maybeAsync(
      handler,
      `You appear to be using an async cache handler, but Babel has been called synchronously`,
    );

    if (isThenable(key)) {
      return key.then(key => {
        this._pairs.push([key, fn]);
        return key;
      });
    }

    this._pairs.push([key, fn]);
    return key;
  }

  invalidate<T>(handler: SideChannel => T): T {
    this._invalidate = true;
    return this.using(handler);
  }

  validator(): SideChannel => Handler<boolean> {
    const pairs = this._pairs;
    return function*(data: SideChannel) {
      for (const [key, fn] of pairs) {
        if (key !== (yield* fn(data))) return false;
      }
      return true;
    };
  }

  deactivate() {
    this._active = false;
  }

  configured() {
    return this._configured;
  }
}

function makeSimpleConfigurator(
  cache: CacheConfigurator<any>,
): SimpleCacheConfigurator {
  function cacheFn(val) {
    if (typeof val === "boolean") {
      if (val) cache.forever();
      else cache.never();
      return;
    }

    return cache.using(() => assertSimpleType(val()));
  }
  cacheFn.forever = () => cache.forever();
  cacheFn.never = () => cache.never();
  cacheFn.using = cb => cache.using(() => assertSimpleType(cb()));
  cacheFn.invalidate = cb => cache.invalidate(() => assertSimpleType(cb()));

  return (cacheFn: any);
}

// Types are limited here so that in the future these values can be used
// as part of Babel's caching logic.
type SimpleType = string | boolean | number | null | void | Promise<SimpleType>;
export function assertSimpleType(value: mixed): SimpleType {
  if (isThenable(value)) {
    throw new Error(
      `You appear to be using an async cache handler, ` +
        `which your current version of Babel does not support. ` +
        `We may add support for this in the future, ` +
        `but if you're on the most recent version of @babel/core and still ` +
        `seeing this error, then you'll need to synchronously handle your caching logic.`,
    );
  }

  if (
    value != null &&
    typeof value !== "string" &&
    typeof value !== "boolean" &&
    typeof value !== "number"
  ) {
    throw new Error(
      "Cache keys must be either string, boolean, number, null, or undefined.",
    );
  }
  return value;
}

class Lock<T> {
  released: boolean = false;
  promise: Promise<T>;
  _resolve: (value: T) => void;

  constructor() {
    this.promise = new Promise(resolve => {
      this._resolve = resolve;
    });
  }

  release(value: T) {
    this.released = true;
    this._resolve(value);
  }
}
