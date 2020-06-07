import fs from "fs";
import path from "path";
import child from "child_process";

let currentHook;
let currentOptions;
let sourceMapSupport = false;

const registerFile = require.resolve("../lib/node");
const testFile = require.resolve("./fixtures/babelrc/es2015");
const testFileContent = fs.readFileSync(testFile);
const sourceMapTestFile = require.resolve("./fixtures/source-map/index");
const sourceMapNestedTestFile = require.resolve(
  "./fixtures/source-map/foo/bar",
);

jest.mock("pirates", () => {
  return {
    addHook(hook, opts) {
      currentHook = hook;
      currentOptions = opts;

      return () => {
        currentHook = null;
        currentOptions = null;
      };
    },
  };
});

jest.mock("source-map-support", () => {
  return {
    install() {
      sourceMapSupport = true;
    },
  };
});

const defaultOptions = {
  exts: [".js", ".jsx", ".es6", ".es", ".mjs"],
  ignoreNodeModules: false,
};

describe("@babel/register", function () {
  let babelRegister;

  function setupRegister(config = { babelrc: false }) {
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
  }

  afterEach(() => {
    revertRegister();
    currentHook = null;
    currentOptions = null;
    sourceMapSupport = false;
    jest.resetModules();
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

  it("returns concatenatable sourceRoot and sources", callback => {
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

    const args = ["-r", registerFile, sourceMapTestFile];
    const spawn = child.spawn(process.execPath, args, { cwd: __dirname });

    let output = "";

    for (const stream of [spawn.stderr, spawn.stdout]) {
      stream.on("data", chunk => {
        output += chunk;
      });
    }

    spawn.on("close", function () {
      let err;

      try {
        const sourceMap = JSON.parse(output);
        expect(sourceMap.map.sourceRoot + sourceMap.map.sources[0]).toBe(
          sourceMapNestedTestFile,
        );
      } catch (e) {
        err = e;
      }

      callback(err);
    });
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
});
