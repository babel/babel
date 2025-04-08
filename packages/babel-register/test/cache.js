import fs from "node:fs";
import path from "node:path";
import { Module } from "node:module";
import _Cache from "../lib/worker/cache.mjs";
const Cache = _Cache.default || _Cache;

import { describeBabel7, describeBabel8, commonJS } from "$repo-utils";
const { require, __filename, __dirname } = commonJS(import.meta.url);

jest.useFakeTimers();

describeBabel8("@babel/register - caching", () => {
  const defaultCachePath = path.join(
    __dirname,
    "../../../node_modules/.cache/@babel/register/cache.lmdb",
  );
  let consoleWarnSpy;

  beforeEach(() => {
    fs.rmSync(defaultCachePath, { force: true });

    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    fs.rmSync(defaultCachePath, { force: true });

    delete process.env.BABEL_CACHE_PATH;

    consoleWarnSpy.mockRestore();
  });

  it("basic", async () => {
    const key = Date.now() + "";

    const cache1 = new Cache();
    cache1.enable();
    expect(cache1.enabled).toBe(true);
    cache1.set(key, "test");
    expect(cache1.get(key)).toEqual("test");
    cache1.disable();
    await cache1.close();

    const cache2 = new Cache();
    cache2.enable();
    expect(cache2.enabled).toBe(true);
    expect(cache2.get(key)).toEqual("test");
    cache2.disable();
    await cache2.close();
  });

  it("should disable when CACHE_PATH is a dir", () => {
    process.env.BABEL_CACHE_PATH = __filename;

    const cache = new Cache();
    cache.enable();

    expect(cache.enabled).toBe(false);
    expect(consoleWarnSpy.mock.calls[0][0]).toContain(
      "is a file, not a directory.",
    );
  });

  it("should clean after 30 days", async () => {
    const cache = new Cache();
    cache.enable();

    const key = Date.now() + "";
    cache.set(key, "test");
    expect(cache.get(key)).toEqual("test");

    cache.disable();
    await cache.close();

    jest.setSystemTime(Date.now() + 1000 * 60 * 60 * 24 * 30 + 1);

    cache.enable();

    jest.setSystemTime();

    expect(cache.get(key)).toEqual(undefined);

    cache.disable();
    await cache.close();
  });
});

describeBabel7("@babel/register - caching", () => {
  const testCacheFilename = path.join(__dirname, ".cache.babel");
  const oldBabelDisableCacheValue = process.env.BABEL_DISABLE_CACHE;

  process.env.BABEL_CACHE_PATH = testCacheFilename;
  delete process.env.BABEL_DISABLE_CACHE;

  function writeCache(data, mode = 0o666) {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }

    fs.writeFileSync(testCacheFilename, data, { mode });
  }

  function cleanCache() {
    try {
      fs.unlinkSync(testCacheFilename);
    } catch (e) {
      // It is convenient to always try to clear
    }
  }

  function resetCache() {
    process.env.BABEL_CACHE_PATH = null;
    process.env.BABEL_DISABLE_CACHE = oldBabelDisableCacheValue;
  }

  const OLD_JEST_MOCKS = !!jest.doMock;

  describe("cache", () => {
    let load, get, setDirty, save;
    let consoleWarnSpy;

    if (!OLD_JEST_MOCKS) {
      let oldModuleCache;
      beforeAll(() => {
        oldModuleCache = Module._cache;
      });
      afterAll(() => {
        Module._cache = oldModuleCache;
      });
    }

    beforeEach(() => {
      // Since lib/cache is a singleton we need to fully reload it
      if (OLD_JEST_MOCKS) {
        jest.resetModules();
      } else {
        Module._cache = {};
      }
      const cache = require("../lib/cache.cjs");

      load = cache.load;
      get = cache.get;
      setDirty = cache.setDirty;
      save = cache.save;

      consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      cleanCache();
      consoleWarnSpy.mockRestore();
    });
    afterAll(resetCache);

    it("should load and get cached data", () => {
      writeCache({ foo: "bar" });

      load();

      expect(get()).toEqual({ foo: "bar" });
    });

    it("should load and get an object with no cached data", () => {
      load();

      expect(get()).toEqual({});
    });

    it("should load and get an object with invalid cached data", () => {
      writeCache("foobar");

      load();

      expect(get()).toEqual({});
    });

    it("should not create the cache if not dirty", () => {
      save();

      expect(fs.existsSync(testCacheFilename)).toBe(false);
      expect(get()).toEqual({});
    });

    it("should create the cache on save if dirty", () => {
      setDirty();
      save();

      expect(fs.existsSync(testCacheFilename)).toBe(true);
      expect(get()).toEqual({});
    });

    it("should create the cache after dirty", () => {
      load();
      setDirty();
      return new Promise(resolve => {
        process.nextTick(() => {
          expect(fs.existsSync(testCacheFilename)).toBe(true);
          expect(get()).toEqual({});
          resolve();
        });
      });
    });

    // Only write mode is effective on Windows
    if (process.platform !== "win32") {
      it("should be disabled when CACHE_PATH is not allowed to read", () => {
        writeCache({ foo: "bar" }, 0o266);
        load();

        expect(get()).toEqual({});
        expect(consoleWarnSpy.mock.calls[0][0]).toContain(
          "Babel could not read cache file",
        );
      });
    }

    it("should be disabled when CACHE_PATH is not allowed to write", () => {
      writeCache({ foo: "bar" }, 0o466);

      load();
      setDirty();

      expect(get()).toEqual({ foo: "bar" });
      return new Promise(resolve => {
        process.nextTick(() => {
          load();
          expect(get()).toEqual({});
          expect(consoleWarnSpy.mock.calls[0][0]).toContain(
            "Babel could not write cache to file",
          );
          resolve();
        });
      });
    });
  });
});
