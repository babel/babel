import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import findCacheDirectory from "find-cache-directory";
import cacache from "cacache";
import { gzipSync, unzipSync } from "node:zlib";

let globalDisableCache = false;

export default class Cache {
  enabled = false;
  cacheDir =
    process.env.BABEL_CACHE_PATH ||
    findCacheDirectory({ name: "@babel/register" }) ||
    path.join(os.tmpdir() || os.homedir(), `.babel-register`);
  batched: { key: string; data: unknown }[] = [];
  batchedSize = 0;
  cache = new Map<string, unknown>();
  index = new Map<string, string>();

  constructor() {
    globalDisableCache = !!process.env.BABEL_DISABLE_CACHE;

    if (fs.existsSync(this.cacheDir)) {
      if (fs.statSync(this.cacheDir).isFile()) {
        console.warn(
          `Cache directory ${this.cacheDir} is a file, not a directory.`,
        );
        globalDisableCache = true;
      }
      return;
    }
    try {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    } catch (_) {
      console.warn(`Failed to create cache directory ${this.cacheDir}`);
      globalDisableCache = true;
      return;
    }
    try {
      fs.accessSync(this.cacheDir, fs.constants.W_OK | fs.constants.R_OK);
    } catch (_) {
      console.warn(
        `Cache directory ${this.cacheDir} is not writable or readable.`,
      );
      globalDisableCache = true;
    }
  }

  async enable() {
    if (globalDisableCache) return;
    this.enabled = true;

    const entries = await cacache.ls(this.cacheDir);
    for (const [key, cache] of Object.entries(entries)) {
      const now = Date.now();
      if (now - cache.time > 1000 * 60 * 60 * 24) {
        await cacache.rm.content(this.cacheDir, cache.integrity);
        await cacache.rm.entry(this.cacheDir, key);
        continue;
      }
      key.split("|").forEach(k => {
        this.index.set(k, cache.integrity);
      });
    }
  }

  async get(key: string) {
    if (!this.enabled) return;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const integrity = this.index.get(key);
    if (!integrity) return;

    try {
      let cache = (await cacache.get.byDigest(this.cacheDir, integrity, {
        memoize: false,
      })) as unknown as Buffer;
      cache = unzipSync(cache);
      const items = JSON.parse(cache.toString("utf8"));
      for (const item of items) {
        this.cache.set(item.key, item.data);
      }
      return this.cache.get(key);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  async disable() {
    await this.flush();
    this.enabled = false;
  }

  async set(key: string, data: unknown) {
    if (!this.enabled) return;

    this.cache.set(key, data);

    this.batched.push({ key, data });
    this.batchedSize += JSON.stringify(data).length;

    // 1MB
    if (this.batchedSize >= 1024 * 1024) {
      await this.flush();
    }
  }

  async flush() {
    if (!this.enabled) return;

    const key = this.batched.map(item => item.key).join("|");
    const buf = Buffer.from(JSON.stringify(this.batched));

    await cacache.put(this.cacheDir, key, gzipSync(buf), {
      algorithms: ["sha1"],
    });

    this.batched = [];
    this.batchedSize = 0;
  }
}
