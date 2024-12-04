import { Module } from "module";
import path from "path";
import fs from "fs";
import child from "child_process";
import { USE_ESM, commonJS, describeGte } from "$repo-utils";

const { __dirname, require } = commonJS(import.meta.url);

const testCacheFilename = path.join(__dirname, ".index.babel");
const testFile = require.resolve("./fixtures/babelrc/es2015");
const testFileLog = require.resolve("./fixtures/babelrc/log");
const testFileMjs = require.resolve("./fixtures/mjs-babelrc/es2015");
const testFileContent = fs.readFileSync(testFile, "utf-8");
const testFileMjsContent = fs.readFileSync(testFileMjs, "utf-8");

const piratesPath = require.resolve("pirates");
const smsPath = require.resolve("source-map-support");
const sms2Path = require.resolve("@cspotcode/source-map-support");

const defaultOptions = {
  exts: [".js", ".jsx", ".es6", ".es", ".mjs", ".cjs"],
  ignoreNodeModules: false,
};

function cleanCache() {
  try {
    fs.unlinkSync(testCacheFilename);
  } catch (e) {
    // It is convenient to always try to clear
  }
}

function resetCache() {
  process.env.BABEL_CACHE_PATH = null;
}

const OLD_JEST_MOCKS = !!jest.doMock;

describe("@babel/register", function () {
  let currentHook, currentOptions, sourceMapSupport;

  const mocks = {
    ["pirates"]: {
      addHook(hook, opts) {
        currentHook = hook;
        currentOptions = opts;

        return () => {
          currentHook = null;
          currentOptions = null;
        };
      },
    },

    ["source-map-support"]: {
      install() {
        sourceMapSupport = true;
      },
    },
  };

  beforeEach(() => {
    currentHook = null;
    currentOptions = null;
    sourceMapSupport = false;
  });

  let originalRequireCacheDescriptor;
  if (OLD_JEST_MOCKS) {
    jest.doMock("pirates", () => mocks["pirates"]);
    jest.doMock("source-map-support", () => mocks["source-map-support"]);
    jest.doMock(
      "@cspotcode/source-map-support",
      () => mocks["source-map-support"],
    );

    afterEach(() => {
      jest.resetModules();
    });
  } else {
    beforeAll(() => {
      originalRequireCacheDescriptor = Object.getOwnPropertyDescriptor(
        Module,
        "_cache",
      );
    });

    afterAll(() => {
      Object.defineProperty(Module, "_cache", originalRequireCacheDescriptor);
    });
  }

  if (!USE_ESM && !process.env.BABEL_8_BREAKING) {
    describe("babel 7", () => {
      if (!OLD_JEST_MOCKS) {
        beforeEach(() => {
          const isEmptyObj = obj =>
            Object.getPrototypeOf(obj) === null &&
            Object.keys(obj).length === 0;

          // This setter intercepts the Module._cache assignment in
          // packages/babel-register/src/nodeWrapper.js to install in the
          // internal isolated cache.
          const emptyInitialCache = {};
          Object.defineProperty(Module, "_cache", {
            get: () => emptyInitialCache,
            set(value) {
              // eslint-disable-next-line jest/no-standalone-expect
              expect(isEmptyObj(value)).toBe(true);

              Object.defineProperty(Module, "_cache", {
                value,
                enumerable: originalRequireCacheDescriptor.enumerable,
                configurable: originalRequireCacheDescriptor.configurable,
                writable: originalRequireCacheDescriptor.writable,
              });
              value[piratesPath] = { exports: mocks["pirates"] };
              value[smsPath] = { exports: mocks["source-map-support"] };
            },
            enumerable: originalRequireCacheDescriptor.enumerable,
            configurable: originalRequireCacheDescriptor.configurable,
          });
        });
      }

      const { setupRegister } = buildTests(require.resolve(".."));

      it("does not mutate options", () => {
        const proxyHandler = {
          defineProperty: jest.fn(Reflect.defineProperty),
          deleteProperty: jest.fn(Reflect.deleteProperty),
          set: jest.fn(Reflect.set),
        };

        setupRegister(
          new Proxy(
            {
              babelrc: true,
              sourceMaps: false,
              cwd: path.dirname(testFileMjs),
              extensions: [".js"],
            },
            proxyHandler,
          ),
        );

        currentHook(testFileContent, testFile);

        expect(proxyHandler.defineProperty).not.toHaveBeenCalled();
        expect(proxyHandler.deleteProperty).not.toHaveBeenCalled();
        expect(proxyHandler.set).not.toHaveBeenCalled();
      });
    });
  }

  describeGte("12.0.0")("worker", () => {
    if (!OLD_JEST_MOCKS) {
      beforeEach(() => {
        Object.defineProperty(Module, "_cache", {
          ...originalRequireCacheDescriptor,
          value: {
            [piratesPath]: { exports: mocks["pirates"] },
            [smsPath]: { exports: mocks["source-map-support"] },
            [sms2Path]: {
              exports: mocks["source-map-support"],
            },
          },
        });
      });
    }

    const { setupRegister } = buildTests(
      require.resolve("../experimental-worker"),
    );

    it("works with mjs config files", () => {
      setupRegister({
        babelrc: true,
        sourceMaps: false,
        cwd: path.dirname(testFileMjs),
      });

      const result = currentHook(testFileMjsContent, testFileMjs);

      expect(result).toBe('"use strict";\n\nrequire("assert");');
    });
  });

  function buildTests(registerFile) {
    let babelRegister;

    function setupRegister(config = { babelrc: false }) {
      process.env.BABEL_CACHE_PATH = testCacheFilename;
      config = {
        cwd: path.dirname(testFile),
        ...config,
      };

      babelRegister = require(registerFile);
      babelRegister.default(config);
    }

    function revertRegister() {
      if (babelRegister) {
        babelRegister.revert();
        delete require.cache[registerFile];
        babelRegister = null;
      }
      cleanCache();
    }

    afterEach(async () => {
      // @babel/register saves the cache on process.nextTick.
      // We need to wait for at least one tick so that when jest
      // tears down the testing environment @babel/register has
      // already finished.
      await new Promise(setImmediate);

      revertRegister();
    });

    afterAll(() => {
      resetCache();
    });

    test("registers hook correctly", () => {
      setupRegister();

      expect(typeof currentHook).toBe("function");
      expect(currentOptions).toEqual(defaultOptions);
    });

    test("unregisters hook correctly", () => {
      setupRegister();
      revertRegister();

      expect(currentHook).toBeNull();
      expect(currentOptions).toBeNull();
    });

    test("installs source map support by default", () => {
      setupRegister();

      currentHook("const a = 1;", testFile);

      expect(sourceMapSupport).toBe(true);
    });

    test("installs source map support when requested", () => {
      setupRegister({
        babelrc: false,
        sourceMaps: true,
      });

      currentHook("const a = 1;", testFile);

      expect(sourceMapSupport).toBe(true);
    });

    test("does not install source map support if asked not to", () => {
      setupRegister({
        babelrc: false,
        sourceMaps: false,
      });

      currentHook("const a = 1;", testFile);

      expect(sourceMapSupport).toBe(false);
    });

    describe("node auto-require", () => {
      it("works with the -r flag", async () => {
        const output = await spawnNodeAsync(
          ["-r", registerFile, testFileLog],
          path.dirname(testFileLog),
        );

        expect(output.trim()).toMatchInlineSnapshot(
          `"It worked! function () {}"`,
        );
      });

      it("works with the --require flag", async () => {
        const output = await spawnNodeAsync(
          ["--require", registerFile, testFileLog],
          path.dirname(testFileLog),
        );

        expect(output.trim()).toMatchInlineSnapshot(
          `"It worked! function () {}"`,
        );
      });

      it("works with the -r flag in NODE_OPTIONS", async () => {
        const output = await spawnNodeAsync(
          [testFileLog],
          path.dirname(testFileLog),
          {
            ...process.env,
            NODE_OPTIONS:
              `-r ${registerFile} ` + (process.env.NODE_OPTIONS || ""),
          },
        );

        expect(output.trim()).toMatchInlineSnapshot(
          `"It worked! function () {}"`,
        );
      });

      it("works with the --require flag in NODE_OPTIONS", async () => {
        const output = await spawnNodeAsync(
          [testFileLog],
          path.dirname(testFileLog),
          {
            ...process.env,
            NODE_OPTIONS:
              `--require ${registerFile} ` + (process.env.NODE_OPTIONS || ""),
          },
        );

        expect(output.trim()).toMatchInlineSnapshot(
          `"It worked! function () {}"`,
        );
      });
    });

    it("returns concatenatable sourceRoot and sources", async () => {
      // The Source Maps R3 standard https://sourcemaps.info/spec.html states
      // that `sourceRoot` is “prepended to the individual entries in the
      // ‘source’ field.” If `sources` contains file names, and `sourceRoot`
      // is intended to refer to a directory but doesn’t end with a trailing
      // slash, any consumers of the source map are in for a bad day.
      //
      // The underlying problem seems to only get triggered if one file
      // requires() another with @babel/register active, and I couldn’t get
      // that working inside a test, possibly because of jest’s mocking
      // hooks, so we spawn a separate process.
      const output = await spawnNodeAsync([
        "-r",
        registerFile,
        require.resolve("./fixtures/source-map/index"),
      ]);
      const sourceMap = JSON.parse(output);
      expect(sourceMap.map.sourceRoot + sourceMap.map.sources[0]).toBe(
        require.resolve("./fixtures/source-map/foo/bar"),
      );
    });

    test("hook transpiles with config", () => {
      setupRegister({
        babelrc: false,
        sourceMaps: false,
        plugins: ["@babel/transform-modules-commonjs"],
      });

      const result = currentHook(testFileContent, testFile);

      expect(result).toBe('"use strict";\n\nrequire("assert");');
    });

    test("hook transpiles with babelrc", () => {
      setupRegister({
        babelrc: true,
        sourceMaps: false,
      });

      const result = currentHook(testFileContent, testFile);

      expect(result).toBe('"use strict";\n\nrequire("assert");');
    });

    test("transforms modules used within register", async () => {
      // Need a clean environment without `convert-source-map`
      // already in the require cache, so we spawn a separate process

      const output = await spawnNodeAsync([
        require.resolve("./fixtures/internal-modules/index.js"),
      ]);
      const { convertSourceMap } = JSON.parse(output);
      expect(convertSourceMap).toMatch("/* transformed */");
    });

    test("does not mutate options", () => {
      const proxyHandler = {
        defineProperty: jest.fn(Reflect.defineProperty),
        deleteProperty: jest.fn(Reflect.deleteProperty),
        set: jest.fn(Reflect.set),
      };

      setupRegister(
        new Proxy(
          {
            babelrc: true,
            sourceMaps: false,
            cwd: path.dirname(testFileMjs),
            extensions: [".js"],
          },
          proxyHandler,
        ),
      );

      currentHook(testFileContent, testFile);

      expect(proxyHandler.defineProperty).not.toHaveBeenCalled();
      expect(proxyHandler.deleteProperty).not.toHaveBeenCalled();
      expect(proxyHandler.set).not.toHaveBeenCalled();
    });

    return { setupRegister, revertRegister };
  }
});

function spawnNodeAsync(args, cwd = __dirname, env = process.env) {
  const spawn = child.spawn(process.execPath, args, {
    cwd,
    env: {
      ...env,
      ...(parseInt(process.versions.node) >= 22 && {
        NODE_OPTIONS:
          "--disable-warning=ExperimentalWarning " + (env.NODE_OPTIONS || ""),
      }),
    },
  });

  let output = "";
  let callback;

  for (const stream of [spawn.stderr, spawn.stdout]) {
    stream.on("data", chunk => {
      output += chunk;
    });
  }

  spawn.on("close", function () {
    callback(output);
  });

  return new Promise(resolve => {
    callback = resolve;
  });
}
