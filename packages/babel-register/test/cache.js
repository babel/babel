import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire, Module } from "module";
import rimraf from "rimraf";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const OLD_JEST_MOCKS = !!jest.doMock;

describe("@babel/register - caching", () => {
  describe("cache", () => {
    beforeAll(() => {
      global.TEST_USE_NEW_CACHE = true;
    });

    afterAll(() => {
      delete global.TEST_USE_NEW_CACHE;
      delete process.env.BABEL_CACHE_PATH;
    });

    const tmpPath = path.join(__dirname, "tmp");
    let cache;

    beforeEach(() => {
      rimraf.sync(tmpPath);
      fs.mkdirSync(tmpPath, { recursive: true });
    });

    afterEach(() => {
      cache && cache.disable();
      rimraf.sync(tmpPath);
    });

    it("should cache data", async () => {
      const Cache = require("../lib/cache.js").Cache;

      if (process.env.USE_ESM) {
        // We must wait for the @babel/core used by @babel/register to be loaded
        // eslint-disable-next-line no-unused-vars
        await new Promise(resolve =>
          eval("import('@babel/core').then(resolve)"),
        );
      }

      cache = new Cache();
      cache.enable();

      const file1 = path.join(tmpPath, "1.txt");
      fs.writeFileSync(file1, "");
      const file2 = path.join(tmpPath, "2.txt");
      fs.writeFileSync(file2, "");

      const result1 = cache.get({ id: 1 }, file1);
      result1.store("1");
      const result2 = cache.get({ id: 2 }, file1);
      result2.store("2");
      const result3 = cache.get({ id: 3 }, file2);
      result3.store("3");

      expect(cache.get({ id: 1 }, file1).cached).toBe("1");
      expect(cache.get({ id: 2 }, file1).cached).toBe("2");
      expect(cache.get({ id: 3 }, file2).cached).toBe("3");
      expect(cache.get({ id: 4 }, file2).cached).toBeNull();

      cache.save();
      cache.disable();

      cache = new Cache();

      expect(cache.get({ id: 1 }, file1).cached).toBeNull();
      expect(cache.get({ id: 2 }, file1).cached).toBeNull();
      expect(cache.get({ id: 3 }, file2).cached).toBeNull();
      expect(cache.get({ id: 4 }, file2).cached).toBeNull();

      cache.enable();

      expect(cache.get({ id: 1 }, file1).cached).toBe("1");
      expect(cache.get({ id: 2 }, file1).cached).toBe("2");
      expect(cache.get({ id: 3 }, file2).cached).toBe("3");
      expect(cache.get({ id: 4 }, file2).cached).toBeNull();

      fs.writeFileSync(file1, "");

      expect(cache.get({ id: 1 }, file1).cached).toBeNull();
      expect(cache.get({ id: 2 }, file1).cached).toBeNull();
      expect(cache.get({ id: 3 }, file2).cached).toBe("3");
      expect(cache.get({ id: 4 }, file2).cached).toBeNull();
    });

    it("should work with broken data", async () => {
      const Cache = require("../lib/cache.js").Cache;

      if (process.env.USE_ESM) {
        // We must wait for the @babel/core used by @babel/register to be loaded
        // eslint-disable-next-line no-unused-vars
        await new Promise(resolve =>
          eval("import('@babel/core').then(resolve)"),
        );
      }

      process.env.BABEL_CACHE_PATH = path.join(
        __dirname,
        ".babel-register-cache",
      );

      cache = new Cache();
      cache.enable();

      const file1 = path.join(tmpPath, "1.txt");
      fs.writeFileSync(file1, "");

      let result1 = cache.get({ id: 1 }, file1);
      result1.store("1");

      expect(cache.get({ id: 1 }, file1).cached).toBe("1");

      cache.save();
      cache.disable();

      fs.writeFileSync(
        path.join(
          process.env.BABEL_CACHE_PATH,
          "packed-cache" + (process.env.BABEL_8_BREAKING ? ".v2.gz" : ".v1.gz"),
        ),
        "123",
      );

      cache = new Cache();
      cache.enable();

      result1 = cache.get({ id: 1 }, file1);

      expect(result1.cached).toBeNull();

      result1.store("1");

      cache.save();
      cache.disable();

      cache = new Cache();
      cache.enable();

      expect(cache.get({ id: 1 }, file1).cached).toBe("1");

      rimraf.sync(process.env.BABEL_CACHE_PATH);
    });
  });

  !process.env.BABEL_8_BREAKING &&
    describe("cache-legacy", () => {
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

      const testCacheFilename = path.join(__dirname, ".cache.babel");
      const oldBabelDisableCacheValue = process.env.BABEL_DISABLE_CACHE;

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

      beforeAll(() => {
        global.TEST_USE_NEW_CACHE = false;
        process.env.BABEL_CACHE_PATH = testCacheFilename;
        delete process.env.BABEL_DISABLE_CACHE;
      });

      afterAll(() => {
        delete global.TEST_USE_NEW_CACHE;
        delete process.env.BABEL_CACHE_PATH;
        process.env.BABEL_DISABLE_CACHE = oldBabelDisableCacheValue;
      });

      beforeEach(() => {
        // Since lib/cache is a singleton we need to fully reload it
        if (OLD_JEST_MOCKS) {
          jest.resetModules();
        } else {
          Module._cache = {};
        }
        const cache = require("../lib/cache.js");

        load = cache.load;
        get = cache.get;
        setDirty = cache.setDirty;
        save = cache.save;

        consoleWarnSpy = jest
          .spyOn(console, "warn")
          .mockImplementation(() => {});
      });

      afterEach(() => {
        cleanCache();
        consoleWarnSpy.mockRestore();
      });

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
