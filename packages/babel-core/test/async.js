import path from "path";
import { fileURLToPath } from "url";
import * as babel from "../lib/index.js";

import {
  spawnTransformAsync,
  spawnTransformAsyncParallel,
  spawnTransformSync,
  supportsESM,
} from "./helpers/esm.js";

import { itGte, itESM, itLt } from "$repo-utils";

// "minNodeVersion": "8.0.0" <-- For Ctrl+F when dropping node 6
const nodeGte8 = itGte("8.0.0");
const nodeGte14 = itGte("14.8.0");

// "minNodeVersion": "22.0.0" <-- For Ctrl+F when dropping node 20
const nodeGte22_12 = itGte("22.12.0");
const nodeLt22_12 = itLt("22.12.0");

describe("asynchronicity", () => {
  const base = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "fixtures",
    "async",
  );
  let cwd;

  beforeEach(function () {
    cwd = process.cwd();
    process.chdir(base);
  });

  afterEach(function () {
    process.chdir(cwd);
  });

  describe("config file", () => {
    describe("async function", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("config-file-async-function");

        expect(() =>
          babel.transformSync(""),
        ).toThrowErrorMatchingInlineSnapshot(
          `"You appear to be using an async configuration, which your current version of Babel does` +
            ` not support. We may add support for this in the future, but if you're on the most recent` +
            ` version of @babel/core and still seeing this error, then you'll need to synchronously` +
            ` return your config."`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("config-file-async-function");

        await expect(
          babel.transformAsync(""),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"You appear to be using an async configuration, which your current version of Babel does` +
            ` not support. We may add support for this in the future, but if you're on the most recent` +
            ` version of @babel/core and still seeing this error, then you'll need to synchronously` +
            ` return your config."`,
        );
      });
    });

    describe("promise", () => {
      it("called synchronously", () => {
        process.chdir("config-file-promise");

        expect(() =>
          babel.transformSync(""),
        ).toThrowErrorMatchingInlineSnapshot(
          `"You appear to be using an async configuration, which your current version of Babel does` +
            ` not support. We may add support for this in the future, but if you're on the most recent` +
            ` version of @babel/core and still seeing this error, then you'll need to synchronously` +
            ` return your config."`,
        );
      });

      it("called asynchronously", async () => {
        process.chdir("config-file-promise");

        await expect(
          babel.transformAsync(""),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"You appear to be using an async configuration, which your current version of Babel does` +
            ` not support. We may add support for this in the future, but if you're on the most recent` +
            ` version of @babel/core and still seeing this error, then you'll need to synchronously` +
            ` return your config."`,
        );
      });
    });

    describe("cache.using", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("config-cache");

        expect(() =>
          babel.transformSync(""),
        ).toThrowErrorMatchingInlineSnapshot(
          `"You appear to be using an async cache handler, which your current version of Babel does` +
            ` not support. We may add support for this in the future, but if you're on the most recent` +
            ` version of @babel/core and still seeing this error, then you'll need to synchronously` +
            ` handle your caching logic."`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("config-cache");

        await expect(
          babel.transformAsync(""),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"You appear to be using an async cache handler, which your current version of Babel does` +
            ` not support. We may add support for this in the future, but if you're on the most recent` +
            ` version of @babel/core and still seeing this error, then you'll need to synchronously` +
            ` handle your caching logic."`,
        );
      });
    });

    itESM("mjs configuring cache", async () => {
      process.chdir("config-file-mjs-cache");

      const { code } = await babel.transformAsync("");

      expect(code).toBe(`"success"`);
    });
  });

  describe("plugin", () => {
    describe("factory function", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown file: You appear to be using an async plugin/preset, but Babel` +
            ` has been called synchronously`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"success"`,
        });
      });
    });

    describe(".pre", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin-pre");

        expect(() =>
          babel.transformSync(""),
        ).toThrowErrorMatchingInlineSnapshot(
          `"unknown file: You appear to be using an async plugin/preset, but Babel has been called synchronously"`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-pre");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      nodeGte8("should await inherited .pre", async () => {
        process.chdir("plugin-pre-chaining");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"pluginC,pluginB,pluginA"`,
        });
      });
    });

    describe(".post", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin-post");

        expect(() =>
          babel.transformSync(""),
        ).toThrowErrorMatchingInlineSnapshot(
          `"unknown file: You appear to be using an async plugin/preset, but Babel has been called synchronously"`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-post");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      nodeGte8("should await inherited .post", async () => {
        process.chdir("plugin-post-chaining");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"pluginC,pluginB,pluginA"`,
        });
      });
    });

    describe("PluginPass.isAsync", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin-pass-is-async");

        expect(babel.transformSync("")).toMatchObject({
          code: `"sync"`,
        });
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-pass-is-async");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"async"`,
        });
      });

      nodeGte8("should await inherited .pre", async () => {
        process.chdir("plugin-pre-chaining");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"pluginC,pluginB,pluginA"`,
        });
      });
    });

    describe("inherits", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin-inherits");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown file: You appear to be using an async plugin/preset, but Babel has been` +
            ` called synchronously`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-inherits");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"success 2"\n"success"`,
        });
      });
    });

    (supportsESM ? describe : describe.skip)(".mjs files", () => {
      nodeLt22_12("called synchronously", async () => {
        process.chdir("plugin-mjs-native");

        await expect(spawnTransformSync()).rejects.toThrow(
          `[BABEL]: You appear to be using a native ECMAScript module plugin, which is` +
            ` only supported when running Babel asynchronously`,
        );
      });

      nodeGte22_12("called asynchronously", async () => {
        process.chdir("plugin-mjs-native");

        await expect(spawnTransformSync()).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      it("called asynchronously", async () => {
        process.chdir("plugin-mjs-native");

        await expect(spawnTransformAsync()).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      nodeGte14("called asynchronously when contain TLA", async () => {
        process.chdir("plugin-mjs-tla-native");

        await expect(spawnTransformAsync()).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      nodeGte14(
        "called asynchronously twice in parallel when contain TLA",
        async () => {
          process.chdir("config-mjs-tla-native");

          await expect(spawnTransformAsyncParallel()).resolves.toMatchObject([
            { code: `"success"` },
            { code: `"success"` },
          ]);
        },
      );
    });
  });

  describe("preset", () => {
    describe("factory function", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("preset");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown file: You appear to be using an async plugin/preset, ` +
            `but Babel has been called synchronously`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("preset");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"success"`,
        });
      });
    });

    describe("plugins", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("preset-plugin-promise");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown file: You appear to be using a promise as a plugin, which your` +
            ` current version of Babel does not support. If you're using a published` +
            ` plugin, you may need to upgrade your @babel/core version. As an` +
            ` alternative, you can prefix the promise with "await".`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("preset-plugin-promise");

        await expect(babel.transformAsync("")).rejects.toThrow(
          `[BABEL] unknown file: You appear to be using a promise as a plugin, which your` +
            ` current version of Babel does not support. If you're using a published` +
            ` plugin, you may need to upgrade your @babel/core version. As an` +
            ` alternative, you can prefix the promise with "await".`,
        );
      });
    });

    (supportsESM ? describe : describe.skip)(".mjs files", () => {
      nodeLt22_12("called synchronously", async () => {
        process.chdir("preset-mjs-native");

        await expect(spawnTransformSync()).rejects.toThrow(
          `[BABEL]: You appear to be using a native ECMAScript module preset, which is` +
            ` only supported when running Babel asynchronously`,
        );
      });

      nodeGte22_12("called synchronously", async () => {
        process.chdir("preset-mjs-native");

        await expect(spawnTransformSync()).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      it("called asynchronously", async () => {
        process.chdir("preset-mjs-native");

        await expect(spawnTransformAsync()).resolves.toMatchObject({
          code: `"success"`,
        });
      });

      it("must use the 'default' export", async () => {
        process.chdir("preset-mjs-named-exports-native");

        await expect(spawnTransformAsync()).rejects.toThrow(
          `Unexpected falsy value: undefined`,
        );
      });
    });
  });

  describe("misc", () => {
    it("unknown preset in config file does not trigger unhandledRejection if caught", async () => {
      process.chdir("unknown-preset");
      const handler = jest.fn();

      process.addListener("unhandledRejection", handler);

      await babel.loadPartialConfigAsync().catch(() => {});

      // unhandledRejection is triggered at the end of the current microtask
      // queue. Wait for the event loop to spin to make sure that, if it were to
      // be triggered, it would have already happened.
      await new Promise(r => setTimeout(r, 0));

      process.removeListener("unhandledRejection", handler);

      expect(handler).not.toHaveBeenCalled();
    });
  });
});
