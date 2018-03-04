import fs from "fs";

let currentHook;
let currentOptions;
let sourceMapSupport = false;

const registerFile = require.resolve("../lib/node");
const testFile = require.resolve("./__data__/es2015");
const testFileContent = fs.readFileSync(testFile);

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

describe("@babel/register", function() {
  let babelRegister;

  function setupRegister(config = { babelrc: false }) {
    babelRegister = require(registerFile);
    babelRegister.default(config);
  }

  function revertRegister() {
    if (babelRegister) {
      babelRegister.revert();
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

  test("hook transpiles with config", () => {
    setupRegister({
      sourceType: "module",
      babelrc: false,
      sourceMaps: false,
      plugins: ["@babel/transform-modules-commonjs"],
    });

    const result = currentHook(testFileContent, testFile);

    expect(result).toBe('"use strict";\n\nrequire("assert");');
  });

  test("hook transpiles with babelrc", () => {
    setupRegister({
      sourceType: "module",
      babelrc: true,
      sourceMaps: false,
    });

    const result = currentHook(testFileContent, testFile);

    expect(result).toBe('"use strict";\n\nrequire("assert");');
  });
});
