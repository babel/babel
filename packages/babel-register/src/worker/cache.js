"use strict";

// This function needs to be exported before requiring ./babel-core, because
// there is a circular dependency between these two files.
exports.initializeCacheFilename = () => {};

const babel = require("./babel-core");
const findCacheDir = require("find-cache-dir");
const LRU = require("lru-cache");

const path = require("path");
const fs = require("fs");
const os = require("os");
const crypto = require("crypto");
const zlib = require("zlib");

const CACHE_FILE_SUFFIX = process.env.BABEL_8_BREAKING ? ".v2.gz" : ".v1.gz";
const MAX_PACKED_CACHE_SIZE = 1024 * 1024 * 128; // 128MB
const SMALL_FILE_SIZE = 1024 * 32; // 32KB

class Cache {
  constructor() {
    this.BABEL_DISABLE_CACHE = process.env.BABEL_DISABLE_CACHE;
    this.cacheDisabled = false;
    this.cacheDir = process.env.BABEL_CACHE_PATH;
    this.packedCachePath = undefined;
    this.hasListener = false;
    this.cacheDirty = false;

    this.cacheDir ||= path.join(
      findCacheDir({ name: "@babel/register" }) || os.tmpdir() || os.homedir(),
      `.babel-register-cache`,
    );

    this.packedCachePath = path.join(
      this.cacheDir,
      "packed-cache" + CACHE_FILE_SUFFIX,
    );

    try {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    } catch (error) {
      console.warn(error);
      this.cacheDisabled = true;
    }

    const sizeCalculation = data => data._cacheSize;
    this.lruCache = process.env.BABEL_8_BREAKING
      ? new LRU({
          maxSize: MAX_PACKED_CACHE_SIZE,
          sizeCalculation: sizeCalculation,
        })
      : new LRU({
          max: MAX_PACKED_CACHE_SIZE,
          length: sizeCalculation,
        });
  }

  isCacheDisabled() {
    return this.BABEL_DISABLE_CACHE || this.cacheDisabled;
  }

  /**
   *
   * @returns return null when error
   */
  readCache(p) {
    let value;
    try {
      value = fs.readFileSync(p);
    } catch (e) {
      switch (e.code) {
        // check EACCES only as fs.readFileSync will never throw EPERM on Windows
        // https://github.com/libuv/libuv/blob/076df64dbbda4320f93375913a728efc40e12d37/src/win/fs.c#L735
        case "EACCES":
          console.warn(
            `Babel could not read cache file: ${p}
due to a permission issue. Cache is disabled.`,
          );
          this.cacheDisabled = true;
      }
      return;
    }
    try {
      value = JSON.parse(zlib.unzipSync(value));
      return value;
    } catch (error) {
      return null;
    }
  }

  writeCache(p, value) {
    value = zlib.gzipSync(JSON.stringify(value));
    try {
      fs.writeFileSync(p, value);
    } catch (e) {
      switch (e.code) {
        case "EACCES":
        case "EPERM":
          console.warn(
            `Babel could not write cache to file: ${p}
  due to a permission issue. Cache is disabled.`,
          );
          this.BABEL_DISABLE_CACHE = true;
          break;
        case "EROFS":
          console.warn(
            `Babel could not write cache to file: ${p}
  because it resides in a readonly filesystem. Cache is disabled.`,
          );
          this.BABEL_DISABLE_CACHE = true;
          break;
        default:
          console.error(e);
      }
    }
  }

  save = () => {
    if (this.isCacheDisabled() || !this.cacheDirty) return;

    this.writeCache(this.packedCachePath, { data: this.lruCache.dump() });
    this.cacheDirty = false;
  };

  enable() {
    if (this.BABEL_DISABLE_CACHE) {
      return;
    }

    if (!this.hasListener) {
      process.on("exit", this.save);
      this.hasListener = true;
    }
    process.nextTick(this.save);

    const packedCache = this.readCache(this.packedCachePath);

    if (packedCache === null) {
      try {
        fs.rmSync(this.packedCachePath);
      } catch (error) {}
    }

    if (packedCache) {
      this.lruCache.load(packedCache.data);
    } else if (process.env.BABEL_8_BREAKING) {
      this.lruCache.clear();
    } else {
      this.lruCache.reset();
    }

    this.cacheDirty = false;
  }

  disable() {
    this.cacheDisabled = true;
  }

  get(opts, filePath) {
    const id = v => v;

    if (this.isCacheDisabled()) return { cached: null, store: id };

    let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;
    const env = babel.getEnv();
    if (env) cacheKey += `:${env}`;
    cacheKey = crypto.createHash("sha1").update(cacheKey).digest("hex");

    let cachePath;
    let cached = this.lruCache.get(cacheKey);
    if (!cached) {
      cachePath = path.join(this.cacheDir, cacheKey + CACHE_FILE_SUFFIX);
      cached = this.readCache(cachePath);
    }

    const fileMtime = +fs.statSync(filePath).mtime;

    if (cached && cached.mtime === fileMtime) {
      return { cached: cached.value, store: id };
    }

    if (process.env.BABEL_8_BREAKING) {
      this.lruCache.delete(cacheKey);
    } else {
      this.lruCache.del(cacheKey);
    }

    return {
      cached: null,
      store: value => {
        const data = {
          _cacheSize: JSON.stringify(value).length,
          value,
          mtime: fileMtime,
        };

        if (data._cacheSize > SMALL_FILE_SIZE) {
          this.writeCache(cachePath, data);
        } else {
          this.lruCache.set(cacheKey, data);
          this.cacheDirty = true;
        }

        return value;
      },
    };
  }
}

exports.Cache = Cache;

const defaultCache = new Cache();

exports.enable = () => {
  defaultCache.enable();
};

exports.disable = function () {
  defaultCache.disable();
};

exports.get = function (opts, filePath) {
  return defaultCache.get(opts, filePath);
};
