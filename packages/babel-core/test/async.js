import path from "path";
import * as babel from "..";

const nodeGte8 = (...args) => {
  // "minNodeVersion": "8.0.0" <-- For Ctrl+F when dropping node 6
  const testFn = process.version.slice(0, 3) === "v6." ? it.skip : it;
  testFn(...args);
};

describe("asynchronicity", () => {
  const base = path.join(__dirname, "fixtures", "async");
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
  });

  describe("plugin", () => {
    describe("factory function", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown: You appear to be using an async plugin/preset, but Babel has been` +
            ` called synchronously (While processing: "${__dirname}/fixtures/async/plugin/plugin.js")`,
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
          `"unknown: You appear to be using an plugin with an async .pre, which your current version` +
            ` of Babel does not support. If you're using a published plugin, you may need to upgrade your` +
            ` @babel/core version."`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-pre");

        await expect(
          babel.transformAsync(""),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"unknown: You appear to be using an plugin with an async .pre, which your current version` +
            ` of Babel does not support. If you're using a published plugin, you may need to upgrade your` +
            ` @babel/core version."`,
        );
      });
    });

    describe(".post", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin-post");

        expect(() =>
          babel.transformSync(""),
        ).toThrowErrorMatchingInlineSnapshot(
          `"unknown: You appear to be using an plugin with an async .post, which your current version` +
            ` of Babel does not support. If you're using a published plugin, you may need to upgrade your` +
            ` @babel/core version."`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-post");

        await expect(
          babel.transformAsync(""),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          `"unknown: You appear to be using an plugin with an async .post, which your current version` +
            ` of Babel does not support. If you're using a published plugin, you may need to upgrade your` +
            ` @babel/core version."`,
        );
      });
    });

    describe("inherits", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("plugin-inherits");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown: You appear to be using an async plugin/preset, but Babel has been` +
            ` called synchronously (While processing: ` +
            `"${__dirname}/fixtures/async/plugin-inherits/plugin.js$inherits")`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("plugin-inherits");

        await expect(babel.transformAsync("")).resolves.toMatchObject({
          code: `"success 2"\n"success"`,
        });
      });
    });

    describe(".mjs files", () => {
      if (process.env.IS_PUBLISH) {
        0;
      } else {
        nodeGte8("called synchronously", () => {
          process.chdir("plugin-mjs");

          expect(() => babel.transformSync("")).toThrow(
            `[BABEL]: You appear to be using a native ECMAScript module plugin, which is` +
              ` only supported when running Babel asynchronously. (While processing: ` +
              `${__dirname}/fixtures/async/plugin-mjs/plugin.mjs)`,
          );
        });

        nodeGte8("called asynchronously", async () => {
          process.chdir("plugin-mjs");

          await expect(babel.transformAsync("")).resolves.toMatchObject({
            code: `"success"`,
          });
        });
      }
    });
  });

  describe("preset", () => {
    describe("factory function", () => {
      nodeGte8("called synchronously", () => {
        process.chdir("preset");

        expect(() => babel.transformSync("")).toThrow(
          `[BABEL] unknown: You appear to be using an async plugin/preset, but Babel has been` +
            ` called synchronously (While processing: "${__dirname}/fixtures/async/preset/preset.js")`,
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
          `[BABEL] unknown: You appear to be using a promise as a plugin, which your current version` +
            ` of Babel does not support. If you're using a published plugin, you may need to upgrade` +
            ` your @babel/core version. As an alternative, you can prefix the promise with "await". ` +
            `(While processing: "${__dirname}/fixtures/async/preset-plugin-promise/preset.js$0")`,
        );
      });

      nodeGte8("called asynchronously", async () => {
        process.chdir("preset-plugin-promise");

        await expect(babel.transformAsync("")).rejects.toThrow(
          `[BABEL] unknown: You appear to be using a promise as a plugin, which your current version` +
            ` of Babel does not support. If you're using a published plugin, you may need to upgrade` +
            ` your @babel/core version. As an alternative, you can prefix the promise with "await". ` +
            `(While processing: "${__dirname}/fixtures/async/preset-plugin-promise/preset.js$0")`,
        );
      });
    });

    describe(".mjs files", () => {
      if (process.env.IS_PUBLISH) {
        0;
      } else {
        nodeGte8("called synchronously", () => {
          process.chdir("preset-mjs");

          expect(() => babel.transformSync("")).toThrow(
            `[BABEL]: You appear to be using a native ECMAScript module preset, which is` +
              ` only supported when running Babel asynchronously. (While processing: ` +
              `${__dirname}/fixtures/async/preset-mjs/preset.mjs)`,
          );
        });

        nodeGte8("called asynchronously", async () => {
          process.chdir("preset-mjs");

          await expect(babel.transformAsync("")).resolves.toMatchObject({
            code: `"success"`,
          });
        });

        nodeGte8("must use the 'default' export", async () => {
          process.chdir("preset-mjs-named-exports");

          await expect(
            babel.transformAsync(""),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"Unexpected falsy value: undefined"`,
          );
        });
      }
    });
  });
});
