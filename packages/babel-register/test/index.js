import { expect } from "chai";
import fs from "fs";
import path from "path";
import decache from "decache";

const testCacheFilename = path.join(__dirname, ".babel");
const oldBabelDisableCacheValue = process.env.BABEL_DISABLE_CACHE;

process.env.BABEL_CACHE_PATH = testCacheFilename;
delete process.env.BABEL_DISABLE_CACHE;

function writeCache(data) {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }

  fs.writeFileSync(testCacheFilename, data);
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

describe("babel register", () => {

  describe("cache", () => {
    let key, load, get, save, set;

    beforeEach(() => {
      // Since lib/cache is a singleton we need to fully reload it
      decache("../lib/cache");
      const cache = require("../lib/cache");

      key = cache.key;
      load = cache.load;
      get = cache.get;
      save = cache.save;
      set = cache.set;
    });

    afterEach(cleanCache);
    after(resetCache);

    it("should load and get cached data", () => {
      writeCache({ [key("foo")]: "bar" });

      load();

      expect(get("foo")).to.be.a("string");
      expect(get("foo")).to.equal("bar");
    });

    it("should set and get data", () => {
      set("foo", "bar");
      expect(get("foo")).to.be.equal("bar");
    });

    it("should load and get with no cached data", () => {
      load();

      expect(get("foo")).to.be.undefined;
    });

    it("should load and get with invalid cached data", () => {
      writeCache("foobar");

      load();

      expect(get("foo")).to.be.undefined;
    });

    it("should create the cache on save", () => {
      save();

      expect(fs.existsSync(testCacheFilename)).to.be.true;
    });
  });
});
