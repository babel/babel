import gensync from "gensync";
import type { Handler } from "gensync";
import {
  maybeAsync,
  isAsync,
  onFirstPause,
  waitFor,
  isThenable,
} from "../gensync-utils/async";
import { isIterableIterator } from "./util";

export type { CacheConfigurator };

export type SimpleCacheConfigurator = {
  (forever: boolean): void;
  <T>(handler: () => T): T;

  forever: () => void;
  never: () => void;
  using: <T>(handler: () => T) => T;
  invalidate: <T>(handler: () => T) => T;
};

export type CacheEntry<ResultT, SideChannel> = Array<{
  value: ResultT;
  valid: (channel: SideChannel) => Handler<boolean>;
}>;

const synchronize = <ArgsT extends unknown[], ResultT>(
  gen: (...args: ArgsT) => Handler<ResultT>,
): ((...args: ArgsT) => ResultT) => {
  return gensync(gen).sync;
};

// eslint-disable-next-line require-yield
function* genTrue() {
  return true;
}

export function makeWeakCache<ArgT extends object, ResultT, SideChannel>(
  handler: (
    arg: ArgT,
    cache: CacheConfigurator<SideChannel>,
  ) => Handler<ResultT> | ResultT,
): (arg: ArgT, data: SideChannel) => Handler<ResultT> {
  return makeCachedFunction<ArgT, ResultT, SideChannel>(WeakMap, handler);
}

export function makeWeakCacheSync<ArgT extends object, ResultT, SideChannel>(
  handler: (arg: ArgT, cache?: CacheConfigurator<SideChannel>) => ResultT,
): (arg: ArgT, data?: SideChannel) => ResultT {
  return synchronize<[ArgT, SideChannel], ResultT>(
    makeWeakCache<ArgT, ResultT, SideChannel>(handler),
  );
}

export function makeStrongCache<ArgT, ResultT, SideChannel>(
  handler: (
    arg: ArgT,
    cache: CacheConfigurator<SideChannel>,
  ) => Handler<ResultT> | ResultT,
): (arg: ArgT, data: SideChannel) => Handler<ResultT> {
  return makeCachedFunction<ArgT, ResultT, SideChannel>(Map, handler);
}

export function makeStrongCacheSync<ArgT, ResultT, SideChannel>(
  handler: (arg: ArgT, cache?: CacheConfigurator<SideChannel>) => ResultT,
): (arg: ArgT, data?: SideChannel) => ResultT {
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
function makeCachedFunction<ArgT, ResultT, SideChannel>(
  CallCache: new <Cached>() => CacheMap<ArgT, Cached, SideChannel>,
  handler: (
    arg: ArgT,
    cache: CacheConfigurator<SideChannel>,
  ) => Handler<ResultT> | ResultT,
): (arg: ArgT, data: SideChannel) => Handler<ResultT> {
  const callCacheSync = new CallCache<ResultT>();
  const callCacheAsync = new CallCache<ResultT>();
  const futureCache = new CallCache<Lock<ResultT>>();

  return function* cachedFunction(arg: ArgT, data: SideChannel) {
    const asyncContext = yield* isAsync();
    const callCache = asyncContext ? callCacheAsync : callCacheSync;

    const cached = yield* getCachedValueOrWait<ArgT, ResultT, SideChannel>(
      asyncContext,
      callCache,
      futureCache,
      arg,
      data,
    );
    if (cached.valid) return cached.value;

    const cache = new CacheConfigurator(data);

    const handlerResult: Handler<ResultT> | ResultT = handler(arg, cache);

    let finishLock: Lock<ResultT>;
    let value: ResultT;

    if (isIterableIterator(handlerResult)) {
      value = yield* onFirstPause(handlerResult, () => {
        finishLock = setupAsyncLocks(cache, futureCache, arg);
      });
    } else {
      value = handlerResult;
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
  // @ts-expect-error todo(flow->ts): add `extends object` constraint to ArgT
  | WeakMap<ArgT, CacheEntry<ResultT, SideChannel>>;

function* getCachedValue<ArgT, ResultT, SideChannel>(
  cache: CacheMap<ArgT, ResultT, SideChannel>,
  arg: ArgT,
  data: SideChannel,
): Handler<{ valid: true; value: ResultT } | { valid: false; value: null }> {
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
): Handler<{ valid: true; value: ResultT } | { valid: false; value: null }> {
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
  Cache extends CacheMap<ArgT, ResultT, SideChannel>,
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

  _pairs: Array<
    [cachedValue: unknown, handler: (data: SideChannel) => Handler<unknown>]
  > = [];

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

  using<T>(handler: (data: SideChannel) => T): T {
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
      // @ts-expect-error todo(flow->ts): improve function return type annotation
      return key.then((key: unknown) => {
        this._pairs.push([key, fn]);
        return key;
      });
    }

    this._pairs.push([key, fn]);
    return key;
  }

  invalidate<T>(handler: (data: SideChannel) => T): T {
    this._invalidate = true;
    return this.using(handler);
  }

  validator(): (data: SideChannel) => Handler<boolean> {
    const pairs = this._pairs;
    return function* (data: SideChannel) {
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
  function cacheFn(val: any) {
    if (typeof val === "boolean") {
      if (val) cache.forever();
      else cache.never();
      return;
    }

    return cache.using(() => assertSimpleType(val()));
  }
  cacheFn.forever = () => cache.forever();
  cacheFn.never = () => cache.never();
  cacheFn.using = (cb: { (): SimpleType }) =>
    cache.using(() => assertSimpleType(cb()));
  cacheFn.invalidate = (cb: { (): SimpleType }) =>
    cache.invalidate(() => assertSimpleType(cb()));

  return cacheFn as any;
}

// Types are limited here so that in the future these values can be used
// as part of Babel's caching logic.
export type SimpleType =
  | string
  | boolean
  | number
  | null
  | void
  | Promise<SimpleType>;
export function assertSimpleType(value: unknown): SimpleType {
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
  // @ts-expect-error Type 'unknown' is not assignable to type 'SimpleType'. This can be removed
  // when strictNullCheck is enabled
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
