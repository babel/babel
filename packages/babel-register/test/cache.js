import fs from "node:fs";
import path from "node:path";

import { commonJS } from "$repo-utils";
const { __filename, __dirname } = commonJS(import.meta.url);

describe("@babel/register - caching", () => {
  let Cache;
  beforeAll(async () => {
    Cache = (await import("../lib/worker/cache.mjs")).default;

    jest.useFakeTimers({
      doNotFake: ["nextTick", "setImmediate", "queueMicrotask", "setTimeout"],
    });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const defaultCachePath = path.join(
    __dirname,
    "../../../node_modules/.cache/@babel/register",
  );
  let consoleWarnSpy;

  beforeEach(() => {
    fs.rmSync(defaultCachePath, { recursive: true, force: true });

    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    fs.rmSync(defaultCachePath, { recursive: true, force: true });

    delete process.env.BABEL_CACHE_PATH;

    consoleWarnSpy.mockRestore();
  });

  it("basic", async () => {
    const key = Date.now() + "";

    const cache1 = new Cache();
    await cache1.enable();
    expect(cache1.enabled).toBe(true);
    await cache1.set(key, "test");
    expect(await cache1.get(key)).toEqual("test");
    await cache1.disable();

    const cache2 = new Cache();
    await cache2.enable();
    expect(cache2.enabled).toBe(true);
    expect(await cache2.get(key)).toEqual("test");
    await cache2.disable();
  });

  it("should disable when CACHE_PATH is a file", async () => {
    process.env.BABEL_CACHE_PATH = __filename;

    const cache = new Cache();
    await cache.enable();

    expect(cache.enabled).toBe(false);
    expect(consoleWarnSpy.mock.calls[0][0]).toContain(
      "is a file, not a directory.",
    );
  });

  it("should clean after 30 days", async () => {
    const cache1 = new Cache();
    await cache1.enable();

    const key = Date.now() + "";
    await cache1.set(key, "test");
    expect(await cache1.get(key)).toEqual("test");
    await cache1.disable();

    jest.setSystemTime(Date.now() + 1000 * 60 * 60 * 24 * 30 + 1);

    const cache2 = new Cache();

    await cache2.enable();

    jest.setSystemTime();

    expect(await cache2.get(key)).toEqual(undefined);

    await cache2.disable();
  });

  it("should batch write cache", async () => {
    const cache = new Cache();
    await cache.enable();
    await cache.set("a", "a".repeat(1024 * 512));
    await cache.set("b", "b".repeat(1024 * 512));
    await cache.set("c", "c".repeat(1024));
    await cache.set("d", "d".repeat(1024));
    await cache.set("e", "e".repeat(1024 * 512));
    await cache.set("f", "f".repeat(1024 * 1024 * 5));
    await cache.disable();

    cache.index.clear();
    cache.cache.clear();

    await cache.enable();
    await cache.disable();

    const caches = new Set();
    for (const hash of cache.index.values()) {
      caches.add(hash);
    }
    expect(caches.size).toBe(3);
  });
});
