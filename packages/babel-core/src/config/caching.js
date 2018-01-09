// @flow

type SimpleCacheConfigurator = SimpleCacheConfiguratorFn &
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

type CacheEntry<ResultT, SideChannel> = Array<{
  value: ResultT,
  valid: SideChannel => boolean,
}>;

export type { CacheConfigurator };

/**
 * Given a function with a single argument, cache its results based on its argument and how it
 * configures its caching behavior. Cached values are stored strongly.
 */
export function makeStrongCache<ArgT, ResultT, SideChannel>(
  handler: (ArgT, CacheConfigurator<SideChannel>) => ResultT,
): (ArgT, SideChannel) => ResultT {
  return makeCachedFunction(new Map(), handler);
}

/**
 * Given a function with a single argument, cache its results based on its argument and how it
 * configures its caching behavior. Cached values are stored weakly and the function argument must be
 * an object type.
 */
export function makeWeakCache<
  ArgT: {} | Array<*> | $ReadOnlyArray<*>,
  ResultT,
  SideChannel,
>(
  handler: (ArgT, CacheConfigurator<SideChannel>) => ResultT,
): (ArgT, SideChannel) => ResultT {
  return makeCachedFunction(new WeakMap(), handler);
}

type CacheMap<ArgT, ResultT, SideChannel> =
  | Map<ArgT, CacheEntry<ResultT, SideChannel>>
  | WeakMap<ArgT, CacheEntry<ResultT, SideChannel>>;

function makeCachedFunction<
  ArgT,
  ResultT,
  SideChannel,
  Cache: CacheMap<ArgT, ResultT, SideChannel>,
>(
  callCache: Cache,
  handler: (ArgT, CacheConfigurator<SideChannel>) => ResultT,
): (ArgT, SideChannel) => ResultT {
  return function cachedFunction(arg, data) {
    let cachedValue: CacheEntry<ResultT, SideChannel> | void = callCache.get(
      arg,
    );

    if (cachedValue) {
      for (const { value, valid } of cachedValue) {
        if (valid(data)) return value;
      }
    }

    const cache = new CacheConfigurator(data);

    const value = handler(arg, cache);

    if (!cache.configured()) cache.forever();

    cache.deactivate();

    switch (cache.mode()) {
      case "forever":
        cachedValue = [{ value, valid: () => true }];
        callCache.set(arg, cachedValue);
        break;
      case "invalidate":
        cachedValue = [{ value, valid: cache.validator() }];
        callCache.set(arg, cachedValue);
        break;
      case "valid":
        if (cachedValue) {
          cachedValue.push({ value, valid: cache.validator() });
        } else {
          cachedValue = [{ value, valid: cache.validator() }];
          callCache.set(arg, cachedValue);
        }
    }

    return value;
  };
}

class CacheConfigurator<SideChannel = void> {
  _active: boolean = true;
  _never: boolean = false;
  _forever: boolean = false;
  _invalidate: boolean = false;

  _configured: boolean = false;

  _pairs: Array<[mixed, (SideChannel) => mixed]> = [];

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
    this._pairs.push([key, handler]);
    return key;
  }

  invalidate<T>(handler: SideChannel => T): T {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }
    if (this._never || this._forever) {
      throw new Error(
        "Caching has already been configured with .never or .forever()",
      );
    }
    this._invalidate = true;
    this._configured = true;

    const key = handler(this._data);
    this._pairs.push([key, handler]);
    return key;
  }

  validator(): SideChannel => boolean {
    const pairs = this._pairs;
    return (data: SideChannel) => pairs.every(([key, fn]) => key === fn(data));
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

    return cache.using(val);
  }
  cacheFn.forever = () => cache.forever();
  cacheFn.never = () => cache.never();
  cacheFn.using = cb => cache.using(() => cb());
  cacheFn.invalidate = cb => cache.invalidate(() => cb());

  return (cacheFn: any);
}
