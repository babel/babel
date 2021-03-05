import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const testCacheFilename = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  ".babel",
);
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

describe("@babel/register - caching", () => {
  describe("cache", () => {
    let load, get, setDirty, save;
    let consoleWarnSpy;

    beforeEach(() => {
      // Since lib/cache is a singleton we need to fully reload it
      jest.resetModules();
      const cache = require("../lib/cache");

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

    it("should create the cache after dirty", cb => {
      load();
      setDirty();

      process.nextTick(() => {
        expect(fs.existsSync(testCacheFilename)).toBe(true);
        expect(get()).toEqual({});
        cb();
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

    it("should be disabled when CACHE_PATH is not allowed to write", cb => {
      writeCache({ foo: "bar" }, 0o466);

      load();
      setDirty();

      expect(get()).toEqual({ foo: "bar" });
      process.nextTick(() => {
        load();
        expect(get()).toEqual({});
        expect(consoleWarnSpy.mock.calls[0][0]).toContain(
          "Babel could not write cache to file",
        );
        cb();
      });
    });
  });
});
