import path from "node:path";
import fs from "node:fs";
import os from "node:os";
// @ts-expect-error no types
import findCacheDir from "find-cache-dir";
// @ts-expect-error no types
import * as lmdb from "lmdb";

let globalDisableCache = false;

export default class Cache {
  enabled = false;
  cacheDir =
    process.env.BABEL_CACHE_PATH ||
    findCacheDir({ name: "@babel/register" }) ||
    path.join(os.tmpdir() || os.homedir(), `.babel-register`);
  db: lmdb.Database = null;
  cache: Map<string, unknown> = null;

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

  enable() {
    if (globalDisableCache) return;
    this.cache = new Map();
    this.enabled = true;

    if (!this.db) {
      this.db = lmdb.open({
        path: path.join(this.cacheDir, "cache.lmdb"),
        compression: true,
        noSync: true,
      });

      let createdAt = this.db.get("created_at");
      // If the cache is older than 30 days, clear it
      if (
        createdAt != null &&
        Date.now() > createdAt + 1000 * 60 * 60 * 24 * 30
      ) {
        this.db.clearSync();
        createdAt = null;
      }
      if (createdAt == null) {
        this.db.putSync("created_at", Date.now());
      }
    }
  }

  disable() {
    if (!this.enabled) return;
    this.enabled = false;
  }

  async close() {
    if (!this.db) return;
    await this.db.close();
    this.db = null;
  }

  get(key: string) {
    let data = this.cache.get(key);
    if (!data && !globalDisableCache) {
      data = this.db.get(key);
      if (data) {
        this.cache.set(key, data);
      }
    }

    return data;
  }

  set(key: string, data: unknown) {
    this.cache.set(key, data);
    this.db.putSync(key, data);
  }
}
