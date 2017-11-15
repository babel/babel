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

type CacheEntry<ResultT> = Array<[ResultT, () => boolean]>;

/**
 * Given a function with a single argument, cache its results based on its argument and how it
 * configures its caching behavior. Cached values are stored strongly.
 */
export function makeStrongCache<ArgT, ResultT>(
  handler: (ArgT, CacheConfigurator) => ResultT,
  autoPermacache?: boolean,
): ArgT => ResultT {
  return makeCachedFunction(new Map(), handler, autoPermacache);
}

/**
 * Given a function with a single argument, cache its results based on its argument and how it
 * configures its caching behavior. Cached values are stored weakly and the function argument must be
 * an object type.
 */
export function makeWeakCache<ArgT: {} | Array<*> | $ReadOnlyArray<*>, ResultT>(
  handler: (ArgT, CacheConfigurator) => ResultT,
  autoPermacache?: boolean,
): ArgT => ResultT {
  return makeCachedFunction(new WeakMap(), handler, autoPermacache);
}

type CacheMap<ArgT, ResultT> =
  | Map<ArgT, CacheEntry<ResultT>>
  | WeakMap<ArgT, CacheEntry<ResultT>>;

function makeCachedFunction<ArgT, ResultT, Cache: CacheMap<ArgT, ResultT>>(
  callCache: Cache,
  handler: (ArgT, CacheConfigurator) => ResultT,
  autoPermacache: boolean = true,
): ArgT => ResultT {
  return function cachedFunction(arg) {
    let cachedValue: CacheEntry<ResultT> | void = callCache.get(arg);

    if (cachedValue) {
      for (const [value, valid] of cachedValue) {
        if (valid()) return value;
      }
    }

    const cache = new CacheConfigurator();

    const value = handler(arg, cache);

    if (autoPermacache && !cache.configured()) cache.forever();

    cache.deactivate();

    cache.assertConfigured();

    switch (cache.mode()) {
      case "forever":
        cachedValue = [[value, () => true]];
        callCache.set(arg, cachedValue);
        break;
      case "invalidate":
        cachedValue = [[value, cache.validator()]];
        callCache.set(arg, cachedValue);
        break;
      case "valid":
        if (cachedValue) {
          cachedValue.push([value, cache.validator()]);
        } else {
          cachedValue = [[value, cache.validator()]];
          callCache.set(arg, cachedValue);
        }
    }

    return value;
  };
}

class CacheConfigurator {
  _active: boolean = true;
  _never: boolean = false;
  _forever: boolean = false;
  _invalidate: boolean = false;

  _configured: boolean = false;

  _pairs: Array<[mixed, () => mixed]> = [];

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

  using<T>(handler: () => T): T {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }
    if (this._never || this._forever) {
      throw new Error(
        "Caching has already been configured with .never or .forever()",
      );
    }
    this._configured = true;

    const key = handler();
    this._pairs.push([key, handler]);
    return key;
  }

  invalidate<T>(handler: () => T): T {
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

    const key = handler();
    this._pairs.push([key, handler]);
    return key;
  }

  validator(): () => boolean {
    const pairs = this._pairs;
    return () => pairs.every(([key, fn]) => key === fn());
  }

  deactivate() {
    this._active = false;
  }

  configured() {
    return this._configured;
  }

  assertConfigured() {
    if (this.configured()) return;

    // eslint-disable-next-line max-len
    throw new Error(
      [
        "Caching was left unconfigured. Babel's plugins, presets, and .babelrc.js files can be configured",
        "for various types of caching, using the first param of their handler functions:",
        "",
        "module.exports = function(api) {",
        "  // The API exposes the following:",
        "",
        "  // Cache the returned value forever and don't call this function again.",
        "  api.cache(true);",
        "",
        "  // Don't cache at all. Not recommended because it will be very slow.",
        "  api.cache(false);",
        "",
        "  // Cached based on the value of some function. If this function returns a value different from",
        "  // a previously-encountered value, the plugins will re-evaluate.",
        "  var env = api.cache(() => process.env.NODE_ENV);",
        "",
        "  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for",
        "  // any possible NODE_ENV value that might come up during plugin execution.",
        '  var isProd = api.cache(() => process.env.NODE_ENV === "production");',
        "",
        "  // .cache(fn) will perform a linear search though instances to find the matching plugin based",
        "  // based on previous instantiated plugins. If you want to recreate the plugin and discard the",
        "  // previous instance whenever something changes, you may use:",
        '  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production");',
        "",
        "  // Note, we also expose the following more-verbose versions of the above examples:",
        "  api.cache.forever(); // api.cache(true)",
        "  api.cache.never();   // api.cache(false)",
        "  api.cache.using(fn); // api.cache(fn)",
        "",
        "  // Return the value that will be cached.",
        "  return { };",
        "};",
      ].join("\n"),
    );
  }
}

function makeSimpleConfigurator(
  cache: CacheConfigurator,
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
  cacheFn.using = cb => cache.using(cb);
  cacheFn.invalidate = cb => cache.invalidate(cb);

  return (cacheFn: any);
}
